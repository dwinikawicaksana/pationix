/**
 * Image Upload Endpoint
 * Handles image uploads for blog articles
 * Can be extended to support Cloudinary, S3, Firebase Storage, etc.
 */

import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";

const UPLOAD_DIR = join(process.cwd(), "public/uploads/articles");

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const articleSlug = formData.get("articleSlug") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!articleSlug) {
      return NextResponse.json(
        { error: "Article slug required" },
        { status: 400 },
      );
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, PNG, WebP, and GIF allowed" },
        { status: 400 },
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Maximum 5MB allowed" },
        { status: 400 },
      );
    }

    // Create directory if it doesn't exist
    try {
      await mkdir(UPLOAD_DIR, { recursive: true });
    } catch (error) {
      console.error("Failed to create upload directory:", error);
    }

    // Save file with timestamp to avoid conflicts
    const timestamp = Date.now();
    const filename = `${articleSlug}-${timestamp}-${file.name.replace(/\s+/g, "-")}`;
    const filepath = join(UPLOAD_DIR, filename);

    const bytes = await file.arrayBuffer();
    await writeFile(filepath, Buffer.from(bytes));

    const url = `/uploads/articles/${filename}`;

    return NextResponse.json(
      {
        success: true,
        url,
        filename,
        size: file.size,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        error: "Failed to upload image",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
