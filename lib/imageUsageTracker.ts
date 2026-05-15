import * as fs from "fs";
import * as path from "path";

interface ImageUsageRecord {
  id: string;
  url: string;
  prompt: string;
  articleSlug: string;
  usedAt: string;
  source: "unsplash" | "ai" | "external" | "upload";
}

const USAGE_FILE = path.join(process.cwd(), ".blog-images-usage.json");

function readImageUsage(): Map<string, ImageUsageRecord> {
  try {
    if (fs.existsSync(USAGE_FILE)) {
      const raw = fs.readFileSync(USAGE_FILE, "utf-8");
      const data = JSON.parse(raw) as Record<string, ImageUsageRecord>;
      return new Map(Object.entries(data));
    }
  } catch (error) {
    console.error("[imageUsageTracker] Failed to read usage file:", error);
  }
  return new Map();
}

function writeImageUsage(usage: Map<string, ImageUsageRecord>): void {
  try {
    const data = Object.fromEntries(usage);
    fs.writeFileSync(USAGE_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("[imageUsageTracker] Failed to write usage file:", error);
  }
}

/**
 * Record that an image has been used for an article
 */
export function recordImageUsage(
  url: string,
  prompt: string,
  articleSlug: string,
  source: "unsplash" | "ai" | "external" | "upload" = "unsplash",
): void {
  const usage = readImageUsage();
  const id = `${articleSlug}-${Date.now()}`;

  usage.set(id, {
    id,
    url,
    prompt,
    articleSlug,
    usedAt: new Date().toISOString(),
    source,
  });

  writeImageUsage(usage);
}

/**
 * Get all images used for a specific article
 */
export function getArticleImages(articleSlug: string): ImageUsageRecord[] {
  const usage = Array.from(readImageUsage().values());
  return usage.filter((record) => record.articleSlug === articleSlug);
}

/**
 * Get all images used with a specific prompt
 */
export function getImagesForPrompt(prompt: string): ImageUsageRecord[] {
  const usage = Array.from(readImageUsage().values());
  return usage.filter((record) => record.prompt === prompt);
}

/**
 * Get recently used images to avoid using same images repeatedly
 * Returns image URLs used in the last N days
 */
export function getRecentlyUsedImages(daysBack: number = 7): Set<string> {
  const usage = Array.from(readImageUsage().values());
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysBack);

  return new Set(
    usage
      .filter((record) => new Date(record.usedAt) > cutoffDate)
      .map((record) => record.url),
  );
}

/**
 * Clear old image usage records (older than N days)
 */
export function cleanupOldRecords(daysToKeep: number = 30): number {
  const usage = readImageUsage();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

  let removed = 0;
  for (const [id, record] of usage.entries()) {
    if (new Date(record.usedAt) < cutoffDate) {
      usage.delete(id);
      removed++;
    }
  }

  if (removed > 0) {
    writeImageUsage(usage);
    console.log(`[imageUsageTracker] Cleaned up ${removed} old records`);
  }

  return removed;
}

/**
 * Get statistics about image usage
 */
export function getImageStats(): {
  totalImages: number;
  totalUsages: number;
  bySource: Record<string, number>;
  mostUsedImageUrl: string | null;
  averageImagesPerArticle: number;
} {
  const usage = Array.from(readImageUsage().values());
  const bySource: Record<string, number> = {
    unsplash: 0,
    ai: 0,
    external: 0,
  };

  const urlCounts: Record<string, number> = {};

  for (const record of usage) {
    bySource[record.source]++;
    urlCounts[record.url] = (urlCounts[record.url] || 0) + 1;
  }

  const articles = new Set(usage.map((r) => r.articleSlug)).size;

  return {
    totalImages: Object.keys(urlCounts).length,
    totalUsages: usage.length,
    bySource,
    mostUsedImageUrl:
      Object.entries(urlCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || null,
    averageImagesPerArticle: articles > 0 ? usage.length / articles : 0,
  };
}
