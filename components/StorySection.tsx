"use client";
import { motion, AnimatePresence } from "framer-motion";
import { StoryData } from "@/types/landing";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";
import { useEffect, useState, useCallback } from "react";
import { useMotionPreferences } from "@/hooks/useMotionPreferences";

const AUTOPLAY_MS = 6500;

function StorySlide({
  story,
  language,
  direction,
}: {
  story: StoryData;
  language: "id" | "en";
  direction: number;
}) {
  const { shouldReduceMotion } = useMotionPreferences();
  return (
    <motion.div
      key={story.id}
      className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center"
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, x: direction > 0 ? 80 : -80 }
      }
      animate={{ opacity: 1, x: 0 }}
      exit={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, x: direction > 0 ? -80 : 80 }
      }
      transition={{
        duration: shouldReduceMotion ? 0.2 : 0.55,
        ease: "easeOut",
      }}
    >
      <div className="order-2 lg:order-1">
        <div className="relative rounded-[2rem] bg-white shadow-[0_45px_90px_-60px_rgba(15,23,42,0.35)] border border-slate-200/80 p-8 lg:p-12 backdrop-blur-xl dark:bg-slate-900/85 dark:border-slate-700/70">
          <div className="absolute -left-8 top-1/2 hidden h-16 w-16 rounded-full bg-sky-100/70 blur-3xl lg:block" />
          <div className="absolute -right-8 bottom-8 hidden h-24 w-24 rounded-full bg-indigo-100/70 blur-3xl lg:block" />

          <span className="inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-sky-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-700 shadow-sm shadow-sky-100/70 dark:border-sky-500/40 dark:bg-slate-800/80 dark:text-sky-300">
            {localize(story.tag, language)}
          </span>

          <h2
            className="mt-6 text-3xl md:text-4xl lg:text-[3rem] font-black tracking-tight text-slate-950 dark:text-white leading-[1.05]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {localize(story.title, language)}
          </h2>

          <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
            {localize(story.description, language)}
          </p>
        </div>
      </div>

      <div className="order-1 lg:order-2">
        <div className="group relative overflow-hidden rounded-[2.25rem] border border-slate-200/60 bg-slate-100 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] dark:border-slate-700/60 dark:bg-slate-900">
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-sky-100/20 opacity-100 pointer-events-none dark:from-white/5 dark:via-transparent dark:to-sky-900/20" />
          <img
            src={story.image}
            alt={story.imageAlt}
            className="relative w-full h-[360px] sm:h-[440px] lg:h-[520px] object-cover"
            loading="lazy"
          />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          <div className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-900 shadow-lg shadow-slate-900/10 dark:bg-slate-800/90 dark:text-slate-100 dark:shadow-black/15">
            {localize({ id: "highlight", en: "Highlight" }, language)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function StorySection({ stories }: { stories: StoryData[] }) {
  const { language } = useLanguage();
  const { shouldReduceMotion } = useMotionPreferences();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const total = stories.length;

  const goTo = useCallback(
    (next: number) => {
      if (total === 0) return;
      const wrapped = ((next % total) + total) % total;
      setDirection(
        wrapped > index || (index === total - 1 && wrapped === 0) ? 1 : -1,
      );
      setIndex(wrapped);
    },
    [index, total],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Autoplay
  useEffect(() => {
    if (shouldReduceMotion || isPaused || total <= 1) return;
    const id = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [next, shouldReduceMotion, isPaused, total]);

  const sectionTitle = localize(
    {
      id: "Bagaimana kami menyusun perjalanan proyek Anda.",
      en: "How we shape your project journey.",
    },
    language,
  );
  const sectionText = localize(
    {
      id: "Setiap cerita menampilkan pendekatan praktis, estetika, dan hasil nyata dalam desain produk modern.",
      en: "Each story shows practical approach, aesthetics, and real results in modern product design.",
    },
    language,
  );

  if (total === 0) return null;
  const current = stories[index];

  return (
    <section
      id="story"
      className="scroll-mt-24 relative overflow-hidden bg-slate-50 dark:bg-slate-950 py-24 sm:py-28"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-sky-100/70 blur-3xl mix-blend-color-dodge opacity-80 dark:bg-sky-500/15" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-fuchsia-100/60 blur-3xl opacity-70 mix-blend-screen" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-flex rounded-full border border-slate-200/70 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.30em] text-slate-700 shadow-sm shadow-slate-900/5 dark:border-slate-700/60 dark:bg-slate-900/80 dark:text-slate-200">
            {localize({ id: "Story", en: "Story" }, language)}
          </span>
          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 dark:text-white leading-tight">
            {sectionTitle}
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {sectionText}
          </p>
        </div>

        {/* Slideshow viewport */}
        <div className="relative">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <StorySlide
                key={current.id}
                story={current}
                language={language}
                direction={direction}
              />
            </AnimatePresence>
          </div>

          {/* Controls */}
          {total > 1 && (
            <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Previous story"
                  onClick={prev}
                  className="rounded-full border border-slate-300 bg-white p-3 text-slate-900 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-900 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-white"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Next story"
                  onClick={next}
                  className="rounded-full border border-slate-300 bg-white p-3 text-slate-900 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-900 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-white"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-2">
                {stories.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    aria-label={`Go to story ${i + 1}`}
                    onClick={() => goTo(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === index
                        ? "w-10 bg-slate-900 dark:bg-white"
                        : "w-2 bg-slate-300 hover:bg-slate-500 dark:bg-slate-700 dark:hover:bg-slate-500"
                    }`}
                  />
                ))}
              </div>

              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
