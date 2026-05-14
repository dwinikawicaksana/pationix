"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface PreviewData {
  title: string;
  image: string | null;
  description: string | null;
  url: string;
}

export default function WebPreview({
  url = "https://paitonix.com",
}: {
  url?: string;
}) {
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPreview = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/preview?url=${encodeURIComponent(url)}`,
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to fetch preview");
        }

        const data = await response.json();
        setPreview(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching the preview",
        );
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchPreview();
    }
  }, [url]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-32 w-full rounded bg-slate-200 dark:bg-slate-700" />
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200"
      >
        <p className="font-semibold">Preview Error</p>
        <p className="mt-1">{error}</p>
      </motion.div>
    );
  }

  if (!preview) {
    return null;
  }

  return (
    <motion.a
      href={preview.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group block overflow-hidden rounded-lg border border-slate-200 bg-white transition hover:border-slate-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
    >
      <div className="flex gap-4 p-4">
        <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded bg-slate-200 dark:bg-slate-800">
          <img
            src="/assets/images/logo-long.png"
            alt={preview.title}
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        </div>
        <div className="flex-1 overflow-hidden">
          <h3 className="font-semibold text-slate-900 line-clamp-2 dark:text-white">
            {preview.title}
          </h3>
          {preview.description && (
            <p className="mt-1 text-sm text-slate-600 line-clamp-2 dark:text-slate-400">
              {preview.description}
            </p>
          )}
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
            {new URL(preview.url).hostname}
          </p>
        </div>
      </div>
    </motion.a>
  );
}
