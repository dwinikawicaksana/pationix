"use client";
import { motion } from "framer-motion";
import { FeatureData } from "@/types/landing";
import { AnimateIn } from "./AnimateIn";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";
import { useEffect, useState } from "react";

const uiText = {
  serviceLabel: { id: "Layanan Kami", en: "Our Services" },
  heading: {
    id: "Semua yang Anda butuhkan. Tidak kurang, tidak lebih.",
    en: "Everything you need. Nothing extra.",
  },
};

const accents = [
  {
    bar: "from-sky-400 to-cyan-500",
    icon: "bg-sky-50 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400 border border-sky-100 dark:border-sky-500/20",
  },
  {
    bar: "from-emerald-400 to-teal-500",
    icon: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20",
  },
  {
    bar: "from-indigo-400 to-violet-500",
    icon: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20",
  },
  {
    bar: "from-violet-400 to-purple-500",
    icon: "bg-violet-50 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400 border border-violet-100 dark:border-violet-500/20",
  },
  {
    bar: "from-rose-400 to-pink-500",
    icon: "bg-rose-50 text-rose-600 dark:bg-rose-500/15 dark:text-rose-400 border border-rose-100 dark:border-rose-500/20",
  },
  {
    bar: "from-amber-400 to-orange-500",
    icon: "bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400 border border-amber-100 dark:border-amber-500/20",
  },
];

// Wide cards (lg:col-span-2) alternate for bento rhythm: 0, 3, 5
const WIDE_INDICES = new Set([0, 3, 5]);

function FeatureCard({
  feature,
  index,
}: {
  feature: FeatureData;
  index: number;
}) {
  const { language } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const isHighlight = feature.highlight;
  const isWide = WIDE_INDICES.has(index);
  const accent = accents[index % 6];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
      whileHover={isMobile ? {} : { y: -4, transition: { duration: 0.25 } }}
      className={`group relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 cursor-default h-full ${
        isHighlight
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 border-slate-700/60 shadow-xl hover:shadow-2xl hover:border-slate-600/60"
          : "bg-white dark:bg-slate-900/70 border-slate-100 dark:border-slate-800/60 shadow-sm hover:shadow-xl hover:shadow-slate-100/60 dark:hover:shadow-slate-950/30 hover:border-slate-200 dark:hover:border-slate-700/80"
      } ${isWide ? "lg:col-span-2" : ""}`}
    >
      {/* Top accent bar */}
      <div
        className={`h-[3px] w-full bg-gradient-to-r ${accent.bar} flex-shrink-0`}
      />

      <div
        className={`flex flex-col flex-1 gap-5 p-6 sm:p-7 ${isWide ? "lg:flex-row lg:items-start lg:gap-8 lg:p-8" : ""}`}
      >
        {/* Icon badge */}
        <div
          className={`flex-shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-xl text-lg ${
            isHighlight ? "bg-white/10 text-white" : accent.icon
          }`}
        >
          {feature.icon}
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <h3
            className={`font-semibold tracking-tight leading-snug ${isWide ? "text-base lg:text-[17px]" : "text-[15px]"} ${
              isHighlight ? "text-white" : "text-slate-900 dark:text-white"
            }`}
          >
            {localize(feature.title, language)}
          </h3>
          <p
            className={`text-[13px] leading-relaxed ${
              isHighlight
                ? "text-slate-400"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            {localize(feature.description, language)}
          </p>
        </div>
      </div>

      {/* Index watermark */}
      <span
        className={`absolute bottom-4 right-5 text-[40px] font-black leading-none select-none pointer-events-none ${
          isHighlight
            ? "text-white/5"
            : "text-slate-950/[0.04] dark:text-white/[0.04]"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </motion.div>
  );
}

export default function FeatureReveal({
  features,
}: {
  features: FeatureData[];
}) {
  const { language } = useLanguage();

  return (
    <section
      id="features"
      className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-white via-slate-50/40 to-white dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950 relative overflow-hidden"
    >
      {/* Static background decor - desktop only */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        <div className="absolute top-20 left-10 w-80 h-80 opacity-100 dark:opacity-0 bg-sky-400/8 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 opacity-100 dark:opacity-0 bg-indigo-400/8 rounded-full blur-3xl" />
        <div className="absolute top-20 left-10 w-80 h-80 opacity-0 dark:opacity-100 bg-sky-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 opacity-0 dark:opacity-100 bg-purple-500/6 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <AnimateIn className="text-center mb-12 sm:mb-14 lg:mb-16">
          <span className="inline-block text-[9px] sm:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.22em] uppercase text-sky-500 dark:text-cyan-400 mb-3 sm:mb-4">
            {localize(uiText.serviceLabel, language)}
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-black tracking-tighter bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-white dark:via-cyan-400 dark:to-sky-500 bg-clip-text text-transparent max-w-3xl mx-auto leading-[1.1] sm:leading-[1.15]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {localize(uiText.heading, language)}
          </h2>
        </AnimateIn>

        {/* Alternating bento grid: wide at 0, 3, 5 — fills 3 rows of 3 cols perfectly */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          {features.map((f, i) => (
            <FeatureCard key={f.id} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
