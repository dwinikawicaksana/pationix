"use client";
import { motion } from "framer-motion";
import { CaseStudyData } from "@/types/landing";
import { AnimateIn } from "./AnimateIn";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";
import { useEffect, useState } from "react";

function AnimatedCounter({ value }: { value: string }) {
  const numValue = parseFloat(value);
  const isPercentage = value.includes("%");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {value}
      </motion.span>
    </motion.div>
  );
}

function CaseStudyCard({ cs, index }: { cs: CaseStudyData; index: number }) {
  const { language } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const neonColors = [
    "from-sky-500 to-cyan-400",
    "from-cyan-400 to-blue-500",
    "from-blue-500 to-purple-500",
  ];
  const colorClass = neonColors[index % 3];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      whileHover={
        isMobile
          ? {}
          : {
              y: -8,
              transition: { duration: 0.3 },
              boxShadow: `0 25px 50px -12px rgba(14, 165, 233, 0.3)`,
            }
      }
      className="group relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800/50 hover:border-sky-400/50 dark:hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl backdrop-blur-lg"
    >
      {/* Animated neon glow border on hover - desktop only */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.2), transparent)`,
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["-200% 0", "200% 0"] }}
        />
      )}

      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900">
        <motion.img
          src={cs.image}
          alt={localize(cs.title, language)}
          className="w-full h-full object-cover"
          loading="lazy"
          initial={{ scale: 1 }}
          whileHover={isMobile ? {} : { scale: 1.08 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Gradient overlay with animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent group-hover:from-black/85"
          transition={{ duration: 0.3 }}
        />

        {/* Neon accent bar */}
        <motion.div
          className={`absolute top-0 left-0 h-1 bg-gradient-to-r ${colorClass}`}
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
        />

        <div className="absolute bottom-4 left-5 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.12 + 0.2 }}
          >
            <div
              className="text-[2.8rem] font-black text-white leading-none tracking-tighter drop-shadow-lg"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <AnimatedCounter value={cs.metric} />
            </div>
            <motion.div
              className="text-[10px] text-white/85 font-semibold tracking-[0.16em] uppercase mt-1 drop-shadow-md"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 + 0.4 }}
            >
              {localize(cs.metricLabel, language)}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="p-6 relative z-10">
        <motion.span
          className="text-[10px] font-bold tracking-[0.18em] uppercase bg-gradient-to-r from-sky-600 to-cyan-600 dark:from-sky-400 dark:to-cyan-400 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.12 + 0.1 }}
        >
          {cs.client}
        </motion.span>

        <motion.h3
          className="mt-3 text-[17px] font-bold bg-gradient-to-r from-zinc-900 to-zinc-800 dark:from-white dark:to-zinc-200 bg-clip-text text-transparent mb-3 tracking-tight leading-snug group-hover:from-sky-600 dark:group-hover:from-cyan-400 transition-all"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.12 + 0.15 }}
        >
          {localize(cs.title, language)}
        </motion.h3>

        <motion.p
          className="text-[13px] text-zinc-600 dark:text-zinc-300 leading-relaxed mb-5 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.12 + 0.2 }}
        >
          {localize(cs.result, language)}
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.12 + 0.25 }}
        >
          {cs.tags.map((tag, tagIndex) => (
            <motion.span
              key={localize(tag, language)}
              className="px-3 py-1.5 text-[11px] font-medium rounded-full bg-gradient-to-r from-sky-500/10 to-cyan-500/10 dark:from-sky-500/20 dark:to-cyan-500/20 text-sky-700 dark:text-cyan-300 border border-sky-200/50 dark:border-cyan-500/30 hover:border-sky-400 dark:hover:border-cyan-400 transition-all cursor-default"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              initial={{ opacity: 0, y: 4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {localize(tag, language)}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

const uiText = {
  sectionLabel: { id: "Bukti Kerja", en: "Proof of Work" },
  sectionHeading: {
    id: "Hasil yang berbicara sendiri.",
    en: "Results that speak for themselves.",
  },
  sectionDescription: {
    id: "Proyek nyata. Angka nyata. Dampak nyata bagi bisnis yang memilih membangun dengan benar.",
    en: "Real projects. Real numbers. Real impact for businesses choosing to build right.",
  },
};

export default function CaseStudy({
  caseStudies,
}: {
  caseStudies: CaseStudyData[];
}) {
  const { language } = useLanguage();

  return (
    <section
      id="case-studies"
      className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-white via-zinc-50/50 to-white dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hidden lg:block">
          {/* Light mode orbs */}
          <motion.div
            className="absolute top-20 right-1/3 w-96 h-96 opacity-100 dark:opacity-0 bg-sky-400/20 rounded-full blur-3xl"
            animate={{
              y: [0, 50, 0],
              x: [0, 30, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 left-1/4 w-96 h-96 opacity-100 dark:opacity-0 bg-pink-400/15 rounded-full blur-3xl"
            animate={{
              y: [0, -50, 0],
              x: [0, -30, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/3 left-20 w-80 h-80 opacity-100 dark:opacity-0 bg-indigo-400/12 rounded-full blur-3xl"
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {/* Dark mode orbs */}
          <motion.div
            className="absolute top-20 right-1/3 w-96 h-96 opacity-0 dark:opacity-100 bg-sky-500/15 rounded-full blur-3xl"
            animate={{
              y: [0, 50, 0],
              x: [0, 30, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 left-1/4 w-96 h-96 opacity-0 dark:opacity-100 bg-cyan-500/12 rounded-full blur-3xl"
            animate={{
              y: [0, -50, 0],
              x: [0, -30, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/3 left-20 w-80 h-80 opacity-0 dark:opacity-100 bg-purple-500/8 rounded-full blur-3xl"
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 12,
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
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <AnimateIn className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <motion.span
              className="inline-block text-[10px] font-bold tracking-[0.22em] uppercase bg-gradient-to-r from-sky-600 to-cyan-600 dark:from-sky-400 dark:to-cyan-400 bg-clip-text text-transparent mb-4 animate-pulse"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {localize(uiText.sectionLabel, language)}
            </motion.span>
            <motion.h2
              className="text-4xl md:text-5xl lg:text-[3.25rem] font-black tracking-tighter bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 dark:from-white dark:via-cyan-200 dark:to-sky-400 bg-clip-text text-transparent leading-[1.1] max-w-lg"
              style={{ fontFamily: "'Playfair Display', serif" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {localize(uiText.sectionHeading, language)}
            </motion.h2>
          </div>
          <motion.p
            className="text-zinc-600 dark:text-zinc-400 max-w-[280px] text-sm leading-relaxed"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {localize(uiText.sectionDescription, language)}
          </motion.p>
        </AnimateIn>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {caseStudies.map((cs, i) => (
            <CaseStudyCard key={cs.id} cs={cs} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
