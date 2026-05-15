"use client";

import { useEffect, useState } from "react";

export interface LiveBlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: number;
  language: string;
  published: boolean;
  createdAt: string;
  featuredImage?: string;
}

interface UseLiveBlogArticlesOptions {
  language: string;
  intervalMs?: number;
  limit?: number;
}

// In-memory cache (survives client-side route transitions, so going from
// /blog/[slug] back to / shows the latest list instantly while a fresh
// fetch revalidates in the background).
const cache = new Map<string, LiveBlogArticle[]>();

export function useLiveBlogArticles({
  language,
  limit,
}: UseLiveBlogArticlesOptions) {
  const key = `${language}:${limit ?? "all"}`;
  const [articles, setArticles] = useState<LiveBlogArticle[]>(
    () => cache.get(key) ?? [],
  );
  const [isLoading, setIsLoading] = useState(() => !cache.has(key));

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch(
          `/api/blog/articles?language=${language}`,
          { cache: "no-store" },
        );
        if (!response.ok) return;
        const data = (await response.json()) as LiveBlogArticle[];
        if (cancelled || !Array.isArray(data)) return;
        const next = typeof limit === "number" ? data.slice(0, limit) : data;
        cache.set(key, next);
        setArticles(next);
      } catch (error) {
        if (!cancelled) console.error("Failed to load articles:", error);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    // Show cached immediately, revalidate in background.
    if (cache.has(key)) {
      setArticles(cache.get(key)!);
      setIsLoading(false);
    }
    void load();

    // Refetch when tab regains focus (cheap; only when user looks).
    const onVisible = () => {
      if (document.visibilityState === "visible") void load();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [key, language, limit]);

  return { articles, isLoading };
}
