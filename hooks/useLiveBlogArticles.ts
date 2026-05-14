"use client";

import { useEffect, useRef, useState } from "react";

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

export function useLiveBlogArticles({
  language,
  limit,
}: UseLiveBlogArticlesOptions) {
  const [articles, setArticles] = useState<LiveBlogArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchedKeyRef = useRef<string | null>(null);

  useEffect(() => {
    // Single fetch per language change. No polling, no focus refetch.
    // (Polling was burning Hostinger entry-process quota → 503 throttling.)
    const key = `${language}:${limit ?? "all"}`;
    if (fetchedKeyRef.current === key) return;
    fetchedKeyRef.current = key;

    let cancelled = false;

    (async () => {
      try {
        const response = await fetch(
          `/api/blog/articles?language=${language}`,
          { cache: "force-cache" },
        );
        if (!response.ok) return;

        const data = (await response.json()) as LiveBlogArticle[];
        if (cancelled || !Array.isArray(data)) return;

        setArticles(typeof limit === "number" ? data.slice(0, limit) : data);
      } catch (error) {
        if (!cancelled) console.error("Failed to load articles:", error);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [language, limit]);

  return { articles, isLoading };
}
