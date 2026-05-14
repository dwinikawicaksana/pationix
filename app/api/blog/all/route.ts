import { NextRequest, NextResponse } from "next/server";
import { getAllArticles } from "@/lib/blogService";

/**
 * Get all articles (published and drafts) for admin dashboard
 * Requires admin authentication in production
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get("language") as "id" | "en" | null;

    const allArticles = getAllArticles(language ?? undefined);

    return NextResponse.json(allArticles);
  } catch (error) {
    console.error("[Get All Articles Error]", error);
    return NextResponse.json(
      { error: "Failed to get articles" },
      { status: 500 },
    );
  }
}
