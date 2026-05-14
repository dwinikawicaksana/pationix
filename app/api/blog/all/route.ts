import { NextRequest, NextResponse } from "next/server";
import { getAllArticles } from "@/lib/blogService";

export const dynamic = "force-dynamic";

/**
 * Get all articles (published and drafts) for admin dashboard
 * Requires admin authentication in production
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const language = searchParams.get("language") as "id" | "en" | null;

    // First try to get articles in the requested language
    let allArticles = getAllArticles(language ?? undefined);

    // If no articles in the requested language, fallback to all articles
    if (allArticles.length === 0 && language) {
      allArticles = getAllArticles();
    }

    return NextResponse.json(allArticles);
  } catch (error) {
    console.error("[Get All Articles Error]", error);
    return NextResponse.json(
      { error: "Failed to get articles" },
      { status: 500 },
    );
  }
}
