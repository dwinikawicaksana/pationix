/**
 * Blog Publish Endpoint
 * Handles publishing articles from draft to published status
 */

import { NextRequest, NextResponse } from "next/server";
import { publishArticle } from "@/lib/blogService";

export async function POST(request: NextRequest) {
  try {
    const { articleId } = await request.json();

    if (!articleId) {
      return NextResponse.json(
        { error: "Article ID is required" },
        { status: 400 },
      );
    }

    console.log(`[Publish] Publishing article with ID: ${articleId}`);

    const result = await publishArticle(articleId);

    if (!result) {
      console.error(`[Publish] Article with ID ${articleId} not found`);
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    console.log(`[Publish] Successfully published article: ${result.title}`);

    return NextResponse.json({
      success: true,
      article: result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to publish article";

    console.error("[Blog Publish Error]", errorMessage, error);

    return NextResponse.json(
      {
        error: errorMessage,
        details:
          process.env.NODE_ENV === "development"
            ? String(error)
            : "An error occurred while publishing",
      },
      { status: 500 },
    );
  }
}
