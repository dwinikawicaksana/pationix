import { NextRequest, NextResponse } from "next/server";
import { getAllArticles } from "@/lib/blogService";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get("language") as "id" | "en" | null;

    const allArticles = getAllArticles(language ?? undefined);
    const publishedArticles = allArticles.filter((a) => a.published);

    return NextResponse.json(publishedArticles);
  } catch (error) {
    console.error("[Get Articles Error]", error);
    return NextResponse.json(
      { error: "Failed to get articles" },
      { status: 500 },
    );
  }
}
