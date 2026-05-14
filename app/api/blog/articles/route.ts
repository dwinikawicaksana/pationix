import { NextRequest, NextResponse } from "next/server";
import { getAllArticles } from "@/lib/blogService";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const language = searchParams.get("language") as "id" | "en" | null;

    // First try to get articles in the requested language
    let allArticles = getAllArticles(language ?? undefined);
    let publishedArticles = allArticles.filter((a) => a.published);

    // If no articles in the requested language, fallback to all published articles
    if (publishedArticles.length === 0 && language) {
      allArticles = getAllArticles();
      publishedArticles = allArticles.filter((a) => a.published);
    }

    return NextResponse.json(publishedArticles);
  } catch (error) {
    console.error("[Get Articles Error]", error);
    return NextResponse.json(
      { error: "Failed to get articles" },
      { status: 500 },
    );
  }
}
