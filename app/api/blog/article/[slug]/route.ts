/**
 * Get a single article by slug
 */

import { NextRequest, NextResponse } from "next/server";
import { getArticleBySlug } from "@/lib/blogService";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    const slug = params.slug;

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const article = getArticleBySlug(slug);

    if (!article) {
      console.error(`[Get Article] Article with slug "${slug}" not found`);
      return NextResponse.json(
        { error: `Article with slug "${slug}" not found` },
        { status: 404 },
      );
    }

    if (!article.published) {
      console.error(
        `[Get Article] Article with slug "${slug}" is not published`,
      );
      return NextResponse.json(
        { error: "Article not published" },
        { status: 403 },
      );
    }

    console.log(`[Get Article] Found published article: ${article.title}`);

    return NextResponse.json(article);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to get article";

    console.error("[Get Article Error]", errorMessage, error);

    return NextResponse.json(
      {
        error: errorMessage,
        details:
          process.env.NODE_ENV === "development"
            ? String(error)
            : "An error occurred",
      },
      { status: 500 },
    );
  }
}
