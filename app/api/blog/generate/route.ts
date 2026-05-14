import {
  generateBlogArticle,
  generateMultipleArticles,
} from "@/lib/blogGenerator";
import { saveBlogArticle } from "@/lib/blogService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const {
      action,
      topics,
      language = "en",
      style = "business",
      includeImages = false,
    } = await request.json();

    if (action === "generate-single") {
      if (!topics || topics.length === 0) {
        return NextResponse.json(
          { error: "Topic is required" },
          { status: 400 },
        );
      }

      const article = await generateBlogArticle({
        topic: topics[0],
        language: language as "id" | "en",
        style: style as "technical" | "business" | "casual",
        includeImages,
      });

      const saved = await saveBlogArticle(article);
      return NextResponse.json(saved);
    }

    if (action === "generate-multiple") {
      if (!topics || topics.length === 0) {
        return NextResponse.json(
          { error: "Topics array is required" },
          { status: 400 },
        );
      }

      const articles = await generateMultipleArticles(topics, {
        language: language as "id" | "en",
        style: style as "technical" | "business" | "casual",
        includeImages,
      });

      const saved = [];
      for (const article of articles) {
        const result = await saveBlogArticle(article);
        saved.push(result);
      }

      return NextResponse.json({
        count: saved.length,
        articles: saved,
      });
    }

    return NextResponse.json(
      { error: "Invalid action. Use 'generate-single' or 'generate-multiple'" },
      { status: 400 },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to generate blog";
    console.error("[Blog Generation Error]", errorMessage);

    // Check if it's a retryable error
    const isRetryableError =
      errorMessage.includes("503") ||
      errorMessage.includes("429") ||
      errorMessage.includes("Service Unavailable") ||
      errorMessage.includes("Too Many Requests");

    const statusCode = isRetryableError ? 503 : 500;

    return NextResponse.json(
      {
        error: errorMessage,
        retryable: isRetryableError,
        details:
          process.env.NODE_ENV === "development"
            ? String(error)
            : isRetryableError
              ? "Service temporarily unavailable. Please try again in a moment."
              : "An error occurred while generating the blog",
      },
      { status: statusCode },
    );
  }
}
