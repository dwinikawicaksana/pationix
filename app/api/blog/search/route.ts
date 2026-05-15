import { NextResponse } from "next/server";
import { getAllArticles } from "@/lib/blogService";

export const dynamic = "force-dynamic";

/**
 * GET /api/blog/search?q=...&language=en|id&category=...&limit=20
 * Simple substring full-text search across title, excerpt, content, keywords, tags.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").trim().toLowerCase();
  const language =
    (searchParams.get("language") as "id" | "en" | null) || undefined;
  const category = searchParams.get("category") || undefined;
  const limit = Math.min(
    100,
    Math.max(1, parseInt(searchParams.get("limit") || "20", 10) || 20),
  );

  if (!q) {
    return NextResponse.json({ count: 0, results: [] });
  }

  const all = getAllArticles(language, category, true);
  const matches = all
    .map((a) => {
      const haystack = [
        a.title,
        a.excerpt,
        a.content,
        a.category,
        (a.keywords || []).join(" "),
        ((a as any).tags || []).join(" "),
      ]
        .join(" \n ")
        .toLowerCase();
      const score = haystack.includes(q) ? 1 : 0;
      return { article: a, score };
    })
    .filter((m) => m.score > 0)
    .slice(0, limit)
    .map(({ article }) => ({
      id: article.id,
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      category: article.category,
      featuredImage: article.featuredImage,
      createdAt: article.createdAt,
    }));

  return NextResponse.json({ count: matches.length, results: matches });
}
