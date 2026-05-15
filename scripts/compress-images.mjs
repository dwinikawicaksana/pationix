// One-shot image compressor for /public/assets/images.
// Reads every PNG/JPEG > 150 KB, backs the original up to _originals/,
// resizes to a sensible max dimension, and re-encodes in place with strong
// palette compression for PNG (keeps transparency) or mozjpeg for JPEG.
//
// Run with: node scripts/compress-images.mjs
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve("public/assets/images");
const BACKUP = path.join(ROOT, "_originals");
const MIN_BYTES = 150 * 1024;
const MAX_DIM = 1600; // logos/photos rarely need to ship > 1600px source

// Files we never want to touch (e.g. tracked design references).
const SKIP = new Set([]);

async function walk(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (entry.name === "_originals") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

async function processFile(file) {
  const rel = path.relative(ROOT, file);
  if (SKIP.has(rel)) return null;
  const ext = path.extname(file).toLowerCase();
  if (![".png", ".jpg", ".jpeg"].includes(ext)) return null;
  const stat = await fs.stat(file);
  if (stat.size < MIN_BYTES) return null;

  const backup = path.join(BACKUP, rel);
  await fs.mkdir(path.dirname(backup), { recursive: true });
  // Only back up the first time; never overwrite a backup.
  try {
    await fs.access(backup);
  } catch {
    await fs.copyFile(file, backup);
  }

  const before = stat.size;
  const input = sharp(backup, { sequentialRead: true }).rotate();
  const meta = await input.metadata();
  const resized = input.resize({
    width: Math.min(meta.width || MAX_DIM, MAX_DIM),
    withoutEnlargement: true,
    fit: "inside",
  });

  let buffer;
  if (ext === ".png") {
    buffer = await resized
      .png({
        compressionLevel: 9,
        palette: true,
        quality: 70,
        effort: 10,
      })
      .toBuffer();
  } else {
    buffer = await resized
      .jpeg({ quality: 78, mozjpeg: true, progressive: true })
      .toBuffer();
  }

  // Safety: only overwrite if the new file is actually smaller.
  if (buffer.length < before) {
    await fs.writeFile(file, buffer);
  }
  return {
    file: rel,
    before,
    after: Math.min(buffer.length, before),
    saved: before - Math.min(buffer.length, before),
  };
}

const files = await walk(ROOT);
const results = [];
for (const file of files) {
  const r = await processFile(file);
  if (r) results.push(r);
}

const fmt = (n) =>
  n > 1024 * 1024
    ? (n / 1024 / 1024).toFixed(2) + " MB"
    : (n / 1024).toFixed(0) + " KB";

let totalBefore = 0;
let totalAfter = 0;
for (const r of results.sort((a, b) => b.saved - a.saved)) {
  totalBefore += r.before;
  totalAfter += r.after;
  const pct = ((r.saved / r.before) * 100).toFixed(0);
  console.log(
    `${r.file.padEnd(48)} ${fmt(r.before).padStart(10)} → ${fmt(r.after).padStart(10)}  (-${pct}%)`,
  );
}
console.log("-".repeat(80));
console.log(
  `TOTAL ${results.length} files: ${fmt(totalBefore)} → ${fmt(totalAfter)}  saved ${fmt(totalBefore - totalAfter)}`,
);
