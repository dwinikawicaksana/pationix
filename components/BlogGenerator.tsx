"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

interface GeneratedArticle {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  keywords: string[];
  category: string;
  readTime: number;
  language: string;
}

export default function BlogGenerator() {
  const { language } = useLanguage();
  const [topics, setTopics] = useState("");
  const [style, setStyle] = useState<"technical" | "business" | "casual">(
    "business",
  );
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState<GeneratedArticle[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSingle = async () => {
    if (!topics.trim()) {
      setError(language === "id" ? "Masukkan topik" : "Enter a topic");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/blog/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "generate-single",
          topics: [topics],
          language,
          style,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate article");
      }

      const article = await response.json();
      setArticles([article, ...articles]);
      setTopics("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate article",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateMultiple = async (topicList: string[]) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/blog/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "generate-multiple",
          topics: topicList,
          language,
          style,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate articles");
      }

      const { articles: newArticles } = await response.json();
      setArticles([...newArticles, ...articles]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate articles",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12">
          {language === "id" ? "Generator Blog AI" : "AI Blog Generator"}
        </h2>

        {/* Generator Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-slate-900 rounded-2xl p-8 mb-12 border border-slate-700"
        >
          <div className="space-y-4 mb-6">
            <input
              type="text"
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              placeholder={
                language === "id"
                  ? "Masukkan topik artikel..."
                  : "Enter article topic..."
              }
              className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none"
            />

            <div className="flex gap-4">
              <select
                value={style}
                onChange={(e) =>
                  setStyle(
                    e.target.value as "technical" | "business" | "casual",
                  )
                }
                className="px-4 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:border-sky-500"
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

              <button
                onClick={handleGenerateSingle}
                disabled={isLoading}
                className="px-6 py-2 bg-sky-500 hover:bg-sky-600 rounded-lg font-semibold disabled:opacity-50 transition"
              >
                {isLoading
                  ? language === "id"
                    ? "Membuat..."
                    : "Generating..."
                  : language === "id"
                    ? "Buat Artikel"
                    : "Generate Article"}
              </button>
            </div>
          </div>

          {error && <div className="text-red-400 mb-4">{error}</div>}

          {/* Quick Templates */}
          <div className="pt-6 border-t border-slate-700">
            <p className="text-sm text-slate-300 mb-3">
              {language === "id" ? "Template cepat:" : "Quick templates:"}
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                language === "id"
                  ? "Web Development Trends"
                  : "Web Development Trends",
                language === "id" ? "AI untuk Bisnis" : "AI for Business",
                language === "id"
                  ? "Future of Super Apps"
                  : "Future of Super Apps",
              ].map((template) => (
                <button
                  key={template}
                  onClick={() => handleGenerateSingle()}
                  className="text-xs px-3 py-2 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 transition"
                >
                  {template}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Generated Articles */}
        <div className="grid gap-6">
          {articles.map((article) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-slate-900 rounded-2xl p-6 border border-slate-700 hover:border-sky-500 transition"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-2">
                  {article.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4">{article.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="text-xs px-2 py-1 rounded bg-sky-500/20 text-sky-300"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-slate-400">
                <div className="flex gap-4">
                  <span>{article.category}</span>
                  <span>{article.readTime} min read</span>
                  <span>{article.language === "id" ? "🇮🇩 ID" : "🇬🇧 EN"}</span>
                </div>
                <button className="px-3 py-1 bg-sky-500 hover:bg-sky-600 text-white rounded text-sm transition">
                  {language === "id" ? "Lihat" : "View"}
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
