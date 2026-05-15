"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { getCategoryOptions } from "@/lib/blogCategories";

interface Article {
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
  images?: Array<{ url: string; alt: string; source: string }>;
}

const uiText = {
  title: { id: "Dashboard Blog", en: "Blog Dashboard" },
  generate: { id: "Buat Artikel", en: "Generate Article" },
  generateBulk: { id: "Buat Bulk", en: "Generate Bulk" },
  topic: { id: "Topik", en: "Topic" },
  enterTopic: { id: "Masukkan topik artikel...", en: "Enter article topic..." },
  bulkTopics: {
    id: "Topik Bulk (satu per baris)",
    en: "Bulk Topics (one per line)",
  },
  style: { id: "Gaya", en: "Style" },
  technical: { id: "Teknis", en: "Technical" },
  business: { id: "Bisnis", en: "Business" },
  casual: { id: "Santai", en: "Casual" },
  includeImages: {
    id: "Sertakan gambar dari Unsplash",
    en: "Include images from Unsplash",
  },
  generating: { id: "Membuat...", en: "Generating..." },
  articles: { id: "Artikel", en: "Articles" },
  draft: { id: "Draft", en: "Draft" },
  published: { id: "Dipublikasikan", en: "Published" },
  publish: { id: "Publikasikan", en: "Publish" },
  readTime: { id: "menit baca", en: "min read" },
  loading: { id: "Memuat...", en: "Loading..." },
  enterTopicError: { id: "Masukkan topik", en: "Enter a topic" },
  enterBulkError: {
    id: "Masukkan minimal satu topik",
    en: "Enter at least one topic",
  },
  generatedSuccess: {
    id: "Artikel berhasil dibuat",
    en: "Article generated successfully",
  },
  generatedBulkSuccess: {
    id: "artikel berhasil dibuat",
    en: "articles generated successfully",
  },
  category: { id: "Kategori", en: "Category" },
  allCategories: { id: "Semua kategori", en: "All categories" },
};

export default function AdminBlogPage() {
  const { language } = useLanguage();
  const categoryOptions = getCategoryOptions(language);
  const [topics, setTopics] = useState<string>("");
  const [bulkTopics, setBulkTopics] = useState<string>("");
  const [style, setStyle] = useState<"technical" | "business" | "casual">(
    "business",
  );
  const [includeImages, setIncludeImages] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Technology");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Load all articles on component mount
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const query =
          categoryFilter === "all"
            ? ""
            : `?category=${encodeURIComponent(categoryFilter)}`;
        const response = await fetch(`/api/blog/all${query}`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setArticles(data);
          }
        }
      } catch (err) {
        console.error("Failed to load articles:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [categoryFilter]);

  // Scroll to top when articles are updated
  useEffect(() => {
    if (articles.length > 0 && !isLoading) {
      window.scrollTo(0, 0);
    }
  }, [articles, isLoading]);

  const handleGenerateSingle = async () => {
    if (!topics.trim()) {
      setError(uiText.enterTopicError[language]);
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/blog/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "generate-single",
          topics: [topics],
          language,
          style,
          includeImages,
          category: selectedCategory,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || errorData.details || "Failed to generate",
        );
      }

      const article = await response.json();
      setArticles([
        {
          ...article,
          published: article.published ?? false,
          createdAt: article.createdAt ?? new Date().toISOString(),
        },
        ...articles,
      ]);
      setTopics("");
      setSuccess(uiText.generatedSuccess[language]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate article",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateBulk = async () => {
    const topicList = bulkTopics
      .split("\n")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (topicList.length === 0) {
      setError(uiText.enterBulkError[language]);
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/blog/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "generate-multiple",
          topics: topicList,
          language,
          style,
          includeImages,
          category: selectedCategory,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || errorData.details || "Failed to generate",
        );
      }

      const { articles: newArticles } = await response.json();
      const withMeta = newArticles.map((a: any) => ({
        ...a,
        published: a.published ?? false,
        createdAt: a.createdAt ?? new Date().toISOString(),
      }));
      setArticles([...withMeta, ...articles]);
      setBulkTopics("");
      setSuccess(
        `${newArticles.length} ${uiText.generatedBulkSuccess[language]}`,
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate articles",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async (articleId: string) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/blog/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to publish");
      }

      // Update article status locally
      setArticles(
        articles.map((a) =>
          a.id === articleId ? { ...a, published: true } : a,
        ),
      );
      setSuccess(
        language === "id"
          ? "Artikel dipublikasikan"
          : "Article published successfully",
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to publish article",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-12">
          {language === "id" ? "Admin - Blog AI" : "Admin - AI Blog"}
        </h1>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Generator Panel */}
          <div className="lg:col-span-2 space-y-8">
            {/* Single Article */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-slate-900 rounded-2xl p-8 border border-slate-700"
            >
              <h2 className="text-2xl font-bold mb-6">
                {language === "id"
                  ? "Buat Artikel Tunggal"
                  : "Generate Single Article"}
              </h2>

              <div className="space-y-4">
                <input
                  type="text"
                  value={topics}
                  onChange={(e) => setTopics(e.target.value)}
                  placeholder={
                    language === "id"
                      ? "Contoh: Tren Web Development 2026"
                      : "Example: Web Development Trends 2026"
                  }
                  className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none"
                />

                <div className="flex gap-4 flex-wrap items-center">
                  <select
                    value={style}
                    onChange={(e) =>
                      setStyle(
                        e.target.value as "technical" | "business" | "casual",
                      )
                    }
                    className="px-4 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white"
                  >
                    <option value="business">
                      {language === "id" ? "Bisnis" : "Business"}
                    </option>
                    <option value="technical">
                      {language === "id" ? "Teknis" : "Technical"}
                    </option>
                    <option value="casual">
                      {language === "id" ? "Santai" : "Casual"}
                    </option>
                  </select>

                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white"
                  >
                    {categoryOptions.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-950 border border-slate-700 cursor-pointer hover:border-sky-500 transition">
                    <input
                      type="checkbox"
                      checked={includeImages}
                      onChange={(e) => setIncludeImages(e.target.checked)}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <span className="text-white">
                      {language === "id" ? "Dengan Gambar" : "Include Images"}
                    </span>
                  </label>

                  <button
                    onClick={handleGenerateSingle}
                    disabled={isLoading}
                    className="flex-1 px-6 py-2 bg-sky-500 hover:bg-sky-600 rounded-lg font-semibold disabled:opacity-50 transition"
                  >
                    {isLoading
                      ? language === "id"
                        ? "Membuat..."
                        : "Generating..."
                      : language === "id"
                        ? "Buat"
                        : "Generate"}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Bulk Articles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-slate-900 rounded-2xl p-8 border border-slate-700"
            >
              <h2 className="text-2xl font-bold mb-6">
                {language === "id"
                  ? "Buat Banyak Artikel"
                  : "Generate Bulk Articles"}
              </h2>

              <div className="space-y-4">
                <textarea
                  value={bulkTopics}
                  onChange={(e) => setBulkTopics(e.target.value)}
                  placeholder={
                    language === "id"
                      ? "Satu topik per baris\nTopik 1\nTopik 2\nTopik 3"
                      : "One topic per line\nTopic 1\nTopic 2\nTopic 3"
                  }
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none"
                />

                <button
                  onClick={handleGenerateBulk}
                  disabled={isLoading}
                  className="w-full px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-semibold disabled:opacity-50 transition"
                >
                  {isLoading
                    ? language === "id"
                      ? "Membuat..."
                      : "Generating..."
                    : language === "id"
                      ? "Buat Semua"
                      : "Generate All"}
                </button>
              </div>
            </motion.div>

            {/* Messages */}
            {error && (
              <div className="p-4 rounded-lg bg-red-500/20 border border-red-500 text-red-200">
                {error}
              </div>
            )}
            {success && (
              <div className="p-4 rounded-lg bg-green-500/20 border border-green-500 text-green-200">
                {success}
              </div>
            )}
          </div>

          {/* Stats Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-slate-900 rounded-2xl p-8 border border-slate-700 h-fit"
          >
            <h2 className="text-2xl font-bold mb-6">
              {language === "id" ? "Statistik" : "Statistics"}
            </h2>

            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm text-slate-400">
                  {uiText.category[language]}
                </p>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-white"
                >
                  <option value="all">{uiText.allCategories[language]}</option>
                  {categoryOptions.map((option) => (
                    <option key={option.id} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p className="text-slate-400 text-sm">
                  {language === "id" ? "Total Artikel" : "Total Articles"}
                </p>
                <p className="text-4xl font-bold text-sky-400">
                  {articles.length}
                </p>
              </div>

              <div>
                <p className="text-slate-400 text-sm">
                  {language === "id" ? "Dipublikasikan" : "Published"}
                </p>
                <p className="text-4xl font-bold text-green-400">
                  {articles.filter((a) => a.published).length}
                </p>
              </div>

              <div>
                <p className="text-slate-400 text-sm">
                  {language === "id" ? "Draf" : "Drafts"}
                </p>
                <p className="text-4xl font-bold text-amber-400">
                  {articles.filter((a) => !a.published).length}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-700">
                <p className="text-slate-400 text-sm">
                  {language === "id" ? "Bahasa Aktif" : "Active Language"}
                </p>
                <p className="text-lg font-semibold">
                  {language === "id" ? "🇮🇩 ID" : "🇬🇧 EN"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Articles List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold mb-6">
            {language === "id" ? "Artikel Terbaru" : "Recent Articles"}
          </h2>

          <div className="space-y-4">
            {articles.length === 0 ? (
              <p className="text-slate-400">
                {language === "id" ? "Tidak ada artikel" : "No articles yet"}
              </p>
            ) : (
              articles.slice(0, 10).map((article) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="bg-slate-900 rounded-xl p-4 border border-slate-700 flex items-center justify-between overflow-hidden"
                >
                  {article.featuredImage && (
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-24 h-24 object-cover rounded-lg mr-4 flex-shrink-0"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-1">
                      {article.title}
                    </h3>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
                      {article.category}
                    </p>
                    <p className="text-sm text-slate-400">
                      {article.excerpt.substring(0, 100)}...
                    </p>
                  </div>
                  <div className="flex items-center gap-3 ml-4 flex-wrap justify-end">
                    <span className="text-sm text-slate-400">
                      {article.readTime} min
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                        article.published
                          ? "bg-green-500/20 text-green-300"
                          : "bg-amber-500/20 text-amber-300"
                      }`}
                    >
                      {article.published
                        ? language === "id"
                          ? "Dipublikasikan"
                          : "Published"
                        : language === "id"
                          ? "Draf"
                          : "Draft"}
                    </span>
                    {!article.published && (
                      <button
                        onClick={() => handlePublish(article.id)}
                        disabled={isLoading}
                        className="px-4 py-1 rounded-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium disabled:opacity-50 transition whitespace-nowrap"
                      >
                        {language === "id" ? "Publikasikan" : "Publish"}
                      </button>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
