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
  intervalMs = 60000,
  limit,
}: UseLiveBlogArticlesOptions) {
  const [articles, setArticles] = useState<LiveBlogArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const errorCountRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let cancelled = false;

    const scheduleNext = (delay: number) => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        fetchArticles({ silent: true });
      }, delay);
    };

    const fetchArticles = async ({
      silent = false,
    }: { silent?: boolean } = {}) => {
      if (!silent) setIsLoading(true);

      try {
        const response = await fetch(
          `/api/blog/articles?language=${language}`,
          { cache: "no-store" },
        );

        if (!response.ok) {
          errorCountRef.current += 1;
          // Exponential backoff: double interval up to 5 min on repeated errors
          const backoff = Math.min(
            intervalMs * 2 ** errorCountRef.current,
            300000,
          );
          scheduleNext(backoff);
          return;
        }

        errorCountRef.current = 0;
        scheduleNext(intervalMs);

        const data = (await response.json()) as LiveBlogArticle[];
        if (cancelled || !Array.isArray(data)) return;

        setArticles(typeof limit === "number" ? data.slice(0, limit) : data);
      } catch (error) {
        if (!cancelled) console.error("Failed to load articles:", error);
        errorCountRef.current += 1;
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchArticles();
    scheduleNext(intervalMs);

    const handleFocus = () => fetchArticles({ silent: true });
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible")
        fetchArticles({ silent: true });
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelled = true;
      if (intervalRef.current) clearInterval(intervalRef.current);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [intervalMs, language, limit]);

  return { articles, isLoading };
}
