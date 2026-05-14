/**
 * Debug endpoint to list all articles in the system
 */

import { NextResponse } from "next/server";
import { getAllArticles } from "@/lib/blogService";

export async function GET() {
  try {
    const allArticles = getAllArticles();
    const publishedArticles = allArticles.filter((a) => a.published);

    return NextResponse.json({
      total: allArticles.length,
      published: publishedArticles.length,
      articles: allArticles.map((a) => ({
        id: a.id,
        title: a.title,
        slug: a.slug,
        published: a.published,
        createdAt: a.createdAt,
      })),
    });
  } catch (error) {
    console.error("[Debug Articles Error]", error);
    return NextResponse.json(
      {
        error: "Failed to get articles",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
