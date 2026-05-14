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

export function useLiveBlogArticles({
  language,
  intervalMs = 30000,
  limit,
}: UseLiveBlogArticlesOptions) {
  const [articles, setArticles] = useState<LiveBlogArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchArticles = async ({
      silent = false,
    }: { silent?: boolean } = {}) => {
      if (!silent) {
        setIsLoading(true);
      }

      try {
        const response = await fetch(
          `/api/blog/articles?language=${language}`,
          {
            cache: "no-store",
          },
        );

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as LiveBlogArticle[];
        if (cancelled || !Array.isArray(data)) {
          return;
        }

        setArticles(typeof limit === "number" ? data.slice(0, limit) : data);
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to load articles:", error);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchArticles();

    const intervalId = window.setInterval(() => {
      fetchArticles({ silent: true });
    }, intervalMs);

    const handleFocus = () => {
      fetchArticles({ silent: true });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchArticles({ silent: true });
      }
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [intervalMs, language, limit]);

  return { articles, isLoading };
}
