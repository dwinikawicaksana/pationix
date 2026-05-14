import { generateBlogArticle } from "@/lib/blogGenerator";
import { NextRequest, NextResponse } from "next/server";

/**
 * Quick test endpoint to verify blog generation works
 *
 * Usage:
 * curl http://localhost:3000/api/blog/test
 */
export async function GET(request: NextRequest) {
  try {
    // Generate a test article in English
    const article = await generateBlogArticle({
      topic: "How to Build a Successful Digital Product",
      language: "en",
      style: "business",
    });

    return NextResponse.json({
      success: true,
      message: "Test article generated successfully",
      article,
      nextSteps: {
        viewAdminPanel: "http://localhost:3000/admin/blog",
        generateMore: "POST /api/blog/generate with your topics",
        documentation: "/docs/BLOG_GENERATOR_INTEGRATION.md",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        hint: "Make sure NEXT_PUBLIC_GOOGLE_API_KEY is set in .env.local",
      },
      { status: 500 },
    );
  }
}
