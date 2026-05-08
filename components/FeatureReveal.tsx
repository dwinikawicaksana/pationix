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

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const neonColors = [
    "from-sky-500 via-cyan-400 to-blue-500",
    "from-cyan-400 via-emerald-400 to-teal-500",
    "from-blue-500 via-indigo-500 to-purple-600",
    "from-purple-500 via-pink-500 to-rose-500",
    "from-pink-500 via-red-400 to-orange-500",
    "from-emerald-500 via-teal-400 to-cyan-500",
  ];

  const lightBgColors = [
    "from-sky-100 to-cyan-100",
    "from-emerald-100 to-teal-100",
    "from-blue-100 to-indigo-100",
    "from-purple-100 to-pink-100",
    "from-pink-100 to-rose-100",
    "from-emerald-100 to-cyan-100",
  ];

  const borderColors = [
    "border-sky-200 hover:border-sky-300",
    "border-emerald-200 hover:border-emerald-300",
    "border-blue-200 hover:border-blue-300",
    "border-purple-200 hover:border-purple-300",
    "border-pink-200 hover:border-pink-300",
    "border-emerald-200 hover:border-emerald-300",
  ];

  const bgGlows = [
    "dark:shadow-sky-500/25",
    "dark:shadow-emerald-500/25",
    "dark:shadow-blue-500/25",
    "dark:shadow-purple-500/25",
    "dark:shadow-pink-500/25",
    "dark:shadow-emerald-500/25",
  ];

  const iconColors = [
    "text-sky-600 dark:text-sky-400",
    "text-emerald-600 dark:text-emerald-400",
    "text-blue-600 dark:text-blue-400",
    "text-purple-600 dark:text-purple-400",
    "text-pink-600 dark:text-pink-400",
    "text-emerald-600 dark:text-emerald-400",
  ];

  const titleColors = [
    "text-sky-950 dark:text-cyan-50",
    "text-emerald-950 dark:text-emerald-50",
    "text-blue-950 dark:text-indigo-50",
    "text-purple-950 dark:text-purple-50",
    "text-pink-950 dark:text-pink-50",
    "text-emerald-950 dark:text-teal-50",
  ];

  const descriptionColors = [
    "text-sky-700 dark:text-slate-300",
    "text-emerald-700 dark:text-slate-300",
    "text-blue-700 dark:text-slate-300",
    "text-purple-700 dark:text-slate-300",
    "text-pink-700 dark:text-slate-300",
    "text-emerald-700 dark:text-slate-300",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
      whileHover={
        isMobile
          ? {}
          : {
              y: -8,
              transition: { duration: 0.3 },
            }
      }
      className={`relative p-5 sm:p-6 lg:p-7 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 group overflow-hidden cursor-default backdrop-blur-lg h-full ${
        isHighlight
          ? "bg-gradient-to-br from-zinc-900 to-zinc-950 dark:from-zinc-800 dark:to-zinc-900 border-zinc-700 dark:border-zinc-700 shadow-lg sm:shadow-2xl hover:shadow-xl sm:hover:shadow-2xl"
          : `bg-gradient-to-br ${lightBgColors[index % 6]} dark:bg-gradient-to-br dark:from-slate-900/80 dark:to-slate-950/60 ${borderColors[index % 6]} dark:border-slate-700/50 dark:hover:border-cyan-400/40 hover:shadow-md sm:hover:shadow-lg dark:hover:shadow-cyan-500/15 shadow-sm sm:shadow-md shadow-slate-200/40 dark:shadow-slate-950/50`
      }`}
    >
      {/* Continuous animated background glow effect */}
      {!isHighlight && (
        <>
          <div
            className={`absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-2xl bg-gradient-to-br ${neonColors[index % 6]} pointer-events-none`}
          />
          <div
            className={`absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-10 bg-gradient-to-br ${neonColors[index % 6]} pointer-events-none`}
          />
        </>
      )}

      <div className="relative z-10 flex flex-col h-full">
        <motion.div
          className={`text-xl sm:text-2xl mb-3 sm:mb-5 ${isHighlight ? "text-zinc-400 dark:text-zinc-300" : iconColors[index % 6]}`}
          whileHover={isMobile ? {} : { rotate: 20, scale: 1.2 }}
          transition={{
            rotate: { type: "spring", stiffness: 300 },
            duration: 0.25,
          }}
        >
          {feature.icon}
        </motion.div>

        <h3
          className={`text-base sm:text-lg font-bold mb-2 sm:mb-3 tracking-tight transition-colors line-clamp-2 ${
            isHighlight
              ? "text-zinc-50 dark:text-zinc-100"
              : titleColors[index % 6]
          }`}
        >
          {localize(feature.title, language)}
        </h3>

        <p
          className={`text-xs sm:text-sm leading-relaxed transition-colors flex-grow ${
            isHighlight
              ? "text-zinc-400 dark:text-zinc-400"
              : descriptionColors[index % 6]
          }`}
        >
          {localize(feature.description, language)}
        </p>
      </div>

      {/* Animated border glow for dark mode */}
      {!isHighlight && (
        <motion.div
          className={`absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 pointer-events-none dark:opacity-100 dark:group-hover:opacity-50 border-2 border-transparent bg-gradient-to-r ${neonColors[index % 6]} bg-clip-border transition-opacity duration-300`}
          animate={{
            backgroundPosition: ["-200% 0", "200% 0"],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{
            backgroundSize: "200% 100%",
          }}
        />
      )}
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
      className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-white via-zinc-50/50 to-white dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950 relative overflow-hidden"
    >
      {/* Animated background glow elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hidden lg:block">
          {/* Light mode orbs */}
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 opacity-100 dark:opacity-0 bg-sky-400/20 rounded-full blur-3xl"
            animate={{
              y: [0, 30, 0],
              x: [0, 20, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-72 h-72 opacity-100 dark:opacity-0 bg-pink-400/15 rounded-full blur-3xl"
            animate={{
              y: [0, -30, 0],
              x: [0, -20, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 right-1/4 w-96 h-96 opacity-100 dark:opacity-0 bg-indigo-400/12 rounded-full blur-3xl"
            animate={{
              y: [0, -40, 0],
              x: [0, 30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {/* Dark mode orbs */}
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 opacity-0 dark:opacity-100 bg-sky-500/15 rounded-full blur-3xl"
            animate={{
              y: [0, 30, 0],
              x: [0, 20, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-72 h-72 opacity-0 dark:opacity-100 bg-cyan-500/12 rounded-full blur-3xl"
            animate={{
              y: [0, -30, 0],
              x: [0, -20, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 right-1/4 w-96 h-96 opacity-0 dark:opacity-100 bg-purple-500/10 rounded-full blur-3xl"
            animate={{
              y: [0, -40, 0],
              x: [0, 30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {/* Animated grid for dark mode */}
          <motion.div
            className="absolute inset-0 opacity-0 dark:opacity-5"
            style={{
              backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(14, 165, 233, 0.05) 25%, rgba(14, 165, 233, 0.05) 26%, transparent 27%, transparent 74%, rgba(14, 165, 233, 0.05) 75%, rgba(14, 165, 233, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(14, 165, 233, 0.05) 25%, rgba(14, 165, 233, 0.05) 26%, transparent 27%, transparent 74%, rgba(14, 165, 233, 0.05) 75%, rgba(14, 165, 233, 0.05) 76%, transparent 77%, transparent)`,
              backgroundSize: "50px 50px",
            }}
            animate={{
              backgroundPosition: ["0px 0px", "50px 50px"],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <AnimateIn className="text-center mb-12 sm:mb-14 lg:mb-16">
          <motion.span
            className="inline-block text-[9px] sm:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.22em] uppercase text-sky-500 dark:text-cyan-400 mb-3 sm:mb-4"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {localize(uiText.serviceLabel, language)}
          </motion.span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-black tracking-tighter bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-white dark:via-cyan-400 dark:to-sky-500 bg-clip-text text-transparent max-w-3xl mx-auto leading-[1.1] sm:leading-[1.15]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {localize(uiText.heading, language)}
          </h2>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 auto-rows-fr">
          {features.map((f, i) => (
            <FeatureCard key={f.id} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
