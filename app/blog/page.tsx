"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { localize } from "@/lib/i18n";
import { useEffect } from "react";
import { useLiveBlogArticles } from "@/hooks/useLiveBlogArticles";
import { useMotionPreferences } from "@/hooks/useMotionPreferences";

const uiText = {
  title: { id: "Blog Kami", en: "Our Blog" },
  subtitle: {
    id: "Wawasan dan tips tentang website, teknologi, dan digital marketing.",
    en: "Insights and tips about websites, technology, and digital marketing.",
  },
  emptyTitle: {
    id: "Belum Ada Artikel",
    en: "No Articles Yet",
  },
  emptyDescription: {
    id: "Kami sedang menyiapkan artikel menarik untuk Anda. Kembali lagi nanti!",
    en: "We're preparing interesting articles for you. Come back soon!",
  },
  backHome: { id: "Kembali ke Beranda", en: "Back to Home" },
  readMore: { id: "Baca Selengkapnya", en: "Read More" },
  published: { id: "Dipublikasikan", en: "Published" },
  minutes: { id: "menit baca", en: "min read" },
};

export default function BlogPage() {
  const { language } = useLanguage();
  const { shouldReduceMotion } = useMotionPreferences();
  const { articles, isLoading } = useLiveBlogArticles({
    language,
    intervalMs: 30000,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-slate-700 border-t-sky-500 rounded-full mx-auto"></div>
          <p className="mt-4 text-slate-400">
            {language === "id" ? "Memuat artikel..." : "Loading articles..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 lg:py-32 px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
            className="mb-8 flex justify-center"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition text-sm font-medium"
            >
              ← {localize(uiText.backHome, language)}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6">
              {localize(uiText.title, language)}
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              {localize(uiText.subtitle, language)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles Section */}
      {articles.length === 0 ? (
        // Zero State
        <section className="py-20 sm:py-28 px-6 border-t border-slate-800">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
            >
              {/* Illustration */}
              <div className="mb-8 flex justify-center">
                <div className="w-32 h-32 rounded-full bg-slate-900/50 border border-slate-700 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17c0 5.25 3.75 9.5 10 9.5s10-4.25 10-9.5c0-6.002-4.5-10.747-10-10.747z"
                    />
                  </svg>
                </div>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {localize(uiText.emptyTitle, language)}
              </h2>
              <p className="text-lg text-slate-400 mb-8">
                {localize(uiText.emptyDescription, language)}
              </p>

              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-sky-500 text-white font-semibold hover:bg-sky-600 transition"
              >
                ← {localize(uiText.backHome, language)}
              </Link>
            </motion.div>
          </div>
        </section>
      ) : (
        // Articles Grid
        <section className="py-20 sm:py-28 px-6 border-t border-slate-800">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.5,
                    delay: shouldReduceMotion ? 0 : index * 0.08,
                  }}
                  className="group rounded-2xl border border-slate-700 bg-slate-900/50 overflow-hidden hover:border-slate-500 transition h-full flex flex-col"
                >
                  {/* Featured Image */}
                  {article.featuredImage && (
                    <div className="relative h-48 overflow-hidden bg-slate-800">
                      <img
                        src={article.featuredImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Category Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold">
                        {article.category}
                      </span>
                      <span className="text-xs text-slate-400">
                        {article.readTime} {localize(uiText.minutes, language)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-sky-400 transition line-clamp-2">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-slate-400 mb-4 line-clamp-3 flex-grow">
                      {article.excerpt}
                    </p>

                    {/* Meta & CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                      <span className="text-xs text-slate-500">
                        {new Date(article.createdAt).toLocaleDateString(
                          language === "id" ? "id-ID" : "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </span>
                      <Link
                        href={`/blog/${article.slug}`}
                        className="text-sky-400 hover:text-sky-300 text-sm font-semibold transition"
                      >
                        {localize(uiText.readMore, language)} →
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {articles.length > 0 && (
        <section className="py-20 sm:py-28 px-6 border-t border-slate-800 bg-gradient-to-b from-slate-900/50 to-slate-950">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {language === "id"
                ? "Ingin konsultasi project Anda?"
                : "Want to consult your project?"}
            </h2>
            <p className="text-base text-slate-400 mb-8">
              {language === "id"
                ? "Hubungi kami untuk membahas kebutuhan website dan digital solution Anda."
                : "Contact us to discuss your website and digital solution needs."}
            </p>
            <a
              href="https://api.whatsapp.com/send?phone=6287891541475&text=Halo%20saya%20ingin%20konsultasi%20dalam%20pembuatan%20jasa%20website"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-sky-500 text-white font-semibold hover:bg-sky-600 transition"
            >
              {language === "id" ? "Hubungi Kami" : "Contact Us"}
            </a>
          </motion.div>
        </section>
      )}
    </main>
  );
}
