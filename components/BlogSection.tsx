"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo } from "react";
import { BlogData } from "@/types/landing";
import { AnimateIn } from "./AnimateIn";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";
import { useLiveBlogArticles } from "@/hooks/useLiveBlogArticles";
import { useMotionPreferences } from "@/hooks/useMotionPreferences";
import { ScrollableContainer } from "./ScrollableContainer";

const uiText = {
  label: { id: "Insights Kami", en: "Our Insights" },
  heading: {
    id: "Artikel & Update Terbaru",
    en: "Latest Articles & Updates",
  },
  description: {
    id: "Editorial singkat tentang digital product, AI, dan sistem yang dibangun untuk bergerak cepat.",
    en: "A concise editorial stream on digital product, AI, and systems built to move fast.",
  },
  viewMore: { id: "Baca Selengkapnya", en: "Read More" },
  browseAll: { id: "Lihat Semua Artikel", en: "Browse All Articles" },
  featured: { id: "Sorotan", en: "Featured" },
  live: { id: "Live updates", en: "Live updates" },
  empty: {
    id: "Artikel terbaru akan muncul otomatis di sini.",
    en: "Latest articles will appear here automatically.",
  },
};

const categoryColors: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  Design: {
    bg: "bg-purple-500/10",
    text: "text-purple-700 dark:text-purple-300",
    border: "border-purple-400/30",
  },
  Backend: {
    bg: "bg-blue-500/10",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-400/30",
  },
  "AI/UX": {
    bg: "bg-cyan-500/10",
    text: "text-cyan-700 dark:text-cyan-300",
    border: "border-cyan-400/30",
  },
  Performance: {
    bg: "bg-orange-500/10",
    text: "text-orange-700 dark:text-orange-300",
    border: "border-orange-400/30",
  },
  Mobile: {
    bg: "bg-green-500/10",
    text: "text-green-700 dark:text-green-300",
    border: "border-green-400/30",
  },
  Workflow: {
    bg: "bg-pink-500/10",
    text: "text-pink-700 dark:text-pink-300",
    border: "border-pink-400/30",
  },
  Technology: {
    bg: "bg-slate-900/8 dark:bg-white/10",
    text: "text-slate-700 dark:text-slate-200",
    border: "border-slate-900/10 dark:border-white/15",
  },
  Business: {
    bg: "bg-amber-500/10",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-400/30",
  },
  Development: {
    bg: "bg-indigo-500/10",
    text: "text-indigo-700 dark:text-indigo-300",
    border: "border-indigo-400/30",
  },
  "AI & Automation": {
    bg: "bg-cyan-500/10",
    text: "text-cyan-700 dark:text-cyan-300",
    border: "border-cyan-400/30",
  },
  "Product Strategy": {
    bg: "bg-amber-500/10",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-400/30",
  },
  Marketing: {
    bg: "bg-rose-500/10",
    text: "text-rose-700 dark:text-rose-300",
    border: "border-rose-400/30",
  },
  "Mobile Apps": {
    bg: "bg-green-500/10",
    text: "text-green-700 dark:text-green-300",
    border: "border-green-400/30",
  },
  "E-Commerce": {
    bg: "bg-emerald-500/10",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-400/30",
  },
  SaaS: {
    bg: "bg-violet-500/10",
    text: "text-violet-700 dark:text-violet-300",
    border: "border-violet-400/30",
  },
  Branding: {
    bg: "bg-fuchsia-500/10",
    text: "text-fuchsia-700 dark:text-fuchsia-300",
    border: "border-fuchsia-400/30",
  },
  "UI/UX": {
    bg: "bg-sky-500/10",
    text: "text-sky-700 dark:text-sky-300",
    border: "border-sky-400/30",
  },
  "Data & Analytics": {
    bg: "bg-blue-500/10",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-400/30",
  },
  Cybersecurity: {
    bg: "bg-red-500/10",
    text: "text-red-700 dark:text-red-300",
    border: "border-red-400/30",
  },
  Operations: {
    bg: "bg-slate-500/10",
    text: "text-slate-700 dark:text-slate-300",
    border: "border-slate-400/30",
  },
};

export default function BlogSection({
  blogs: initialBlogs,
}: {
  blogs: BlogData[];
}) {
  const { language } = useLanguage();
  const { shouldReduceMotion } = useMotionPreferences();
  const { articles, isLoading } = useLiveBlogArticles({
    language,
    intervalMs: 60000,
    limit: 3,
  });

  const blogs = useMemo<BlogData[]>(() => {
    if (articles.length > 0) {
      return articles.map((article) => ({
        id: article.id,
        title: { id: article.title, en: article.title },
        slug: article.slug,
        excerpt: { id: article.excerpt, en: article.excerpt },
        category: {
          id: article.category || "Technology",
          en: article.category || "Technology",
        },
        thumbnail:
          article.featuredImage ||
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80",
        date: article.createdAt,
      }));
    }

    return initialBlogs || [];
  }, [articles, initialBlogs]);

  const getColors = (category: string) => {
    return categoryColors[category] || categoryColors["Technology"];
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    return new Intl.DateTimeFormat(language === "id" ? "id-ID" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(d);
  };

  const BlogArticleCard = ({
    blog,
    index,
  }: {
    blog: BlogData;
    index: number;
  }) => {
    const colors = getColors(localize(blog.category, language));

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.5,
          delay: shouldReduceMotion ? 0 : index * 0.05,
        }}
        className="h-full"
      >
        <Link
          href={`/blog/${blog.slug}`}
          className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-black/10 bg-white/90 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-black/25 hover:shadow-[0_24px_50px_rgba(17,17,17,0.10)] dark:border-white/12 dark:bg-slate-900/60 dark:shadow-[0_18px_50px_rgba(2,6,23,0.45)] dark:hover:border-cyan-300/40 dark:hover:shadow-[0_30px_70px_rgba(34,211,238,0.18)]"
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900">
            <motion.img
              src={blog.thumbnail}
              alt={localize(blog.title, language)}
              className="h-full w-full object-cover"
              whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
              transition={{ duration: 0.45 }}
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute left-4 top-4">
              <span
                className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] backdrop-blur-md ${colors.bg} ${colors.text} ${colors.border}`}
              >
                {localize(blog.category, language)}
              </span>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
            <time className="text-[11px] font-medium uppercase tracking-[0.18em] text-black/55 dark:text-slate-400">
              {formatDate(blog.date)}
            </time>
            <h3 className="line-clamp-2 text-xl font-black leading-tight tracking-[-0.03em] text-[#111111] transition-colors group-hover:text-black/70 dark:text-white dark:group-hover:text-cyan-200 sm:text-2xl">
              {localize(blog.title, language)}
            </h3>
            <p className="line-clamp-3 flex-1 text-sm leading-6 text-black/65 dark:text-slate-300">
              {localize(blog.excerpt, language)}
            </p>
            <div className="mt-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#111111] dark:text-white">
              <span>{localize(uiText.viewMore, language)}</span>
              <motion.span
                animate={shouldReduceMotion ? undefined : { x: [0, 4, 0] }}
                transition={{
                  duration: 1.8,
                  repeat: shouldReduceMotion ? 0 : Infinity,
                }}
              >
                →
              </motion.span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  };

  return (
    <section
      id="blog"
      className="relative overflow-hidden bg-[#f5f5f5] py-16 text-[#111111] dark:bg-slate-950 dark:text-white sm:py-20 md:py-24 lg:py-28"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute right-[-6rem] top-[-6rem] h-72 w-72 rounded-full bg-white/70 blur-3xl dark:bg-slate-900/40"
          animate={
            shouldReduceMotion
              ? { opacity: 0.22 }
              : { y: [0, 24, 0], x: [0, -18, 0] }
          }
          transition={{
            duration: 10,
            repeat: shouldReduceMotion ? 0 : Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-[-8rem] left-[-8rem] h-80 w-80 rounded-full bg-black/5 blur-3xl dark:bg-white/5"
          animate={
            shouldReduceMotion
              ? { opacity: 0.16 }
              : { y: [0, -24, 0], x: [0, 16, 0] }
          }
          transition={{
            duration: 12,
            repeat: shouldReduceMotion ? 0 : Infinity,
            ease: "easeInOut",
            delay: shouldReduceMotion ? 0 : 1,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateIn>
          <div className="mb-8 grid gap-6 border-b border-black/10 pb-6 dark:border-white/10 sm:mb-14 sm:pb-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:pb-10">
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-black/55 dark:text-white/55">
                {localize(uiText.label, language)}
              </p>
              <h2 className="max-w-3xl text-3xl font-black leading-tight tracking-[-0.06em] text-[#111111] dark:text-white sm:text-5xl lg:text-[4.25rem]">
                {localize(uiText.heading, language)}
              </h2>
            </div>

            <div className="flex flex-col gap-4 lg:items-end">
              <p className="max-w-md text-sm leading-7 text-black/65 dark:text-white/65 sm:text-base">
                {localize(uiText.description, language)}
              </p>
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black/70 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                <span className="inline-flex h-2 w-2 rounded-full bg-[#111111] dark:bg-white" />
                {localize(uiText.live, language)}
              </div>
            </div>
          </div>
        </AnimateIn>

        {isLoading && blogs.length === 0 ? (
          <div className="rounded-[2rem] border border-black/10 bg-white/60 px-6 py-12 text-center text-sm text-black/55 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-white/55">
            {localize(uiText.empty, language)}
          </div>
        ) : blogs.length > 0 ? (
          <ScrollableContainer showIndicators={true}>
            {blogs.map((blog, index) => (
              <div
                key={blog.id}
                className="snap-start flex-shrink-0 w-[85vw] sm:w-[420px] lg:w-[460px] xl:w-[480px]"
              >
                <BlogArticleCard blog={blog} index={index} />
              </div>
            ))}
          </ScrollableContainer>
        ) : (
          <div className="rounded-[2rem] border border-black/10 bg-white/60 px-6 py-12 text-center text-sm text-black/55 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-white/55">
            {localize(uiText.empty, language)}
          </div>
        )}

        <AnimateIn>
          <div className="mt-10 flex justify-start border-t border-black/10 pt-6 dark:border-white/10 sm:mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#111111] transition hover:text-black/65 dark:text-white dark:hover:text-white/70"
            >
              <span>{localize(uiText.browseAll, language)}</span>
              <span>→</span>
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
