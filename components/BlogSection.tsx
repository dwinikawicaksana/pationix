"use client";

import { motion } from "framer-motion";
import { BlogData } from "@/types/landing";
import { AnimateIn } from "./AnimateIn";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";
import { useState, useEffect } from "react";

const uiText = {
  label: { id: "Insights Kami", en: "Our Insights" },
  heading: {
    id: "Artikel & Update Terbaru",
    en: "Latest Articles & Updates",
  },
  viewMore: { id: "Baca Selengkapnya", en: "Read More" },
};

const categoryColors: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  Design: {
    bg: "bg-purple-500/10",
    text: "text-purple-300",
    border: "border-purple-400/30",
  },
  Backend: {
    bg: "bg-blue-500/10",
    text: "text-blue-300",
    border: "border-blue-400/30",
  },
  "AI/UX": {
    bg: "bg-cyan-500/10",
    text: "text-cyan-300",
    border: "border-cyan-400/30",
  },
  Performance: {
    bg: "bg-orange-500/10",
    text: "text-orange-300",
    border: "border-orange-400/30",
  },
  Mobile: {
    bg: "bg-green-500/10",
    text: "text-green-300",
    border: "border-green-400/30",
  },
  Workflow: {
    bg: "bg-pink-500/10",
    text: "text-pink-300",
    border: "border-pink-400/30",
  },
};

const categoryColorsId: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  Design: {
    bg: "bg-purple-500/10",
    text: "text-purple-300",
    border: "border-purple-400/30",
  },
  Backend: {
    bg: "bg-blue-500/10",
    text: "text-blue-300",
    border: "border-blue-400/30",
  },
  "AI/UX": {
    bg: "bg-cyan-500/10",
    text: "text-cyan-300",
    border: "border-cyan-400/30",
  },
  Performance: {
    bg: "bg-orange-500/10",
    text: "text-orange-300",
    border: "border-orange-400/30",
  },
  Mobile: {
    bg: "bg-green-500/10",
    text: "text-green-300",
    border: "border-green-400/30",
  },
  Workflow: {
    bg: "bg-pink-500/10",
    text: "text-pink-300",
    border: "border-pink-400/30",
  },
};

export default function BlogSection({ blogs }: { blogs: BlogData[] }) {
  const { language } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getColors = (category: string) => {
    const colorMap = categoryColors[category] || categoryColors["Design"];
    return colorMap;
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    return new Intl.DateTimeFormat(language === "id" ? "id-ID" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(d);
  };

  return (
    <section
      id="blog"
      className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-white via-slate-50/30 to-white dark:from-slate-950 dark:via-slate-900/20 dark:to-slate-950 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-sky-400/20 to-cyan-300/10 blur-3xl opacity-40 dark:opacity-20"
          animate={{
            y: [0, 40, 0],
            x: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-400/20 to-pink-300/10 blur-3xl opacity-40 dark:opacity-20"
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimateIn>
          <div className="mb-12 sm:mb-16 lg:mb-20 text-center">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-sky-600 dark:text-cyan-400 mb-3 sm:mb-4">
              {localize(uiText.label, language)}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 text-slate-900 dark:text-white">
              {localize(uiText.heading, language)}
            </h2>
          </div>
        </AnimateIn>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {blogs.map((blog, index) => {
            const colors = getColors(localize(blog.category, language));

            return (
              <motion.a
                key={blog.id}
                href={`#blog/${blog.slug}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={isMobile ? {} : { y: -8 }}
                className="group cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-slate-900/50"
              >
                {/* Thumbnail Container */}
                <div className="relative h-60 sm:h-72 overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900">
                  <motion.img
                    src={blog.thumbnail}
                    alt={localize(blog.title, language)}
                    className="w-full h-full object-cover"
                    whileHover={isMobile ? {} : { scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  {/* Category Badge */}
                  <div className="mb-3 sm:mb-4 flex items-center justify-between gap-2">
                    <span
                      className={`text-xs sm:text-xs font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border transition-all duration-300 ${colors.bg} ${colors.text} ${colors.border}`}
                    >
                      {localize(blog.category, language)}
                    </span>
                    <time className="text-xs text-slate-500 dark:text-slate-400">
                      {formatDate(blog.date)}
                    </time>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold mb-2.5 sm:mb-3 line-clamp-2 text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-cyan-400 transition-colors">
                    {localize(blog.title, language)}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-4 sm:mb-5 leading-relaxed">
                    {localize(blog.excerpt, language)}
                  </p>

                  {/* Read More Button */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-sky-600 dark:text-cyan-400 group-hover:gap-3 transition-all duration-300">
                    <span>{localize(uiText.viewMore, language)}</span>
                    <motion.svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </motion.svg>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Call to action */}
        <AnimateIn>
          <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-4 sm:mb-6">
              {language === "id"
                ? "Ingin membaca lebih banyak insights kami?"
                : "Want to read more of our insights?"}
            </p>
            <motion.a
              href="/blog"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-semibold shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {language === "id" ? "Jelajahi Blog" : "Explore Blog"}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </motion.a>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
