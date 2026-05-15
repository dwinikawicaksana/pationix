import { NextResponse } from "next/server";
import { getAllArticles } from "@/lib/blogService";

export const dynamic = "force-dynamic";

/**
 * GET /api/blog/tags
 * Returns aggregated hashtags across all published articles with usage counts.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const language =
    (searchParams.get("language") as "id" | "en" | null) || undefined;

  const articles = getAllArticles(language, undefined, true);
  const counts = new Map<string, number>();

  for (const article of articles) {
    const tags: string[] = Array.isArray((article as any).tags)
      ? ((article as any).tags as string[])
      : [];
    for (const raw of tags) {
      const tag = String(raw).trim();
      if (!tag) continue;
      counts.set(tag, (counts.get(tag) || 0) + 1);
    }
  }

  const sorted = Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }));

  return NextResponse.json({ count: sorted.length, tags: sorted });
}
