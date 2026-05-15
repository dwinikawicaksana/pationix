"use client";
import { motion } from "framer-motion";
import { CaseStudyData } from "@/types/landing";
import { AnimateIn } from "./AnimateIn";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";
import { useMotionPreferences } from "@/hooks/useMotionPreferences";

function AnimatedCounter({ value }: { value: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {value}
    </motion.span>
  );
}

function CaseStudyCard({ cs, index }: { cs: CaseStudyData; index: number }) {
  const { language } = useLanguage();
  const { shouldReduceMotion } = useMotionPreferences();
  const accentThemes = [
    {
      glow: "bg-cyan-400/12 dark:bg-cyan-400/16",
      line: "from-cyan-400 via-sky-500 to-transparent",
      badge:
        "text-cyan-700 bg-cyan-100/80 border-cyan-200 dark:text-cyan-200 dark:bg-cyan-500/10 dark:border-cyan-400/15",
      panel:
        "from-cyan-500/12 to-sky-500/8 dark:from-cyan-400/14 dark:to-sky-500/10",
    },
    {
      glow: "bg-blue-400/12 dark:bg-blue-400/16",
      line: "from-blue-400 via-indigo-500 to-transparent",
      badge:
        "text-blue-700 bg-blue-100/80 border-blue-200 dark:text-blue-200 dark:bg-blue-500/10 dark:border-blue-400/15",
      panel:
        "from-blue-500/12 to-indigo-500/8 dark:from-blue-400/14 dark:to-indigo-500/10",
    },
    {
      glow: "bg-violet-400/12 dark:bg-violet-400/16",
      line: "from-violet-400 via-fuchsia-500 to-transparent",
      badge:
        "text-violet-700 bg-violet-100/80 border-violet-200 dark:text-violet-200 dark:bg-violet-500/10 dark:border-violet-400/15",
      panel:
        "from-violet-500/12 to-fuchsia-500/8 dark:from-violet-400/14 dark:to-fuchsia-500/10",
    },
  ];
  const theme = accentThemes[index % accentThemes.length];
  const detailLabels = [
    localize({ id: "Dampak", en: "Impact" }, language),
    localize({ id: "Ruang lingkup", en: "Scope" }, language),
    localize({ id: "Hasil utama", en: "Key result" }, language),
  ];

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.6,
        delay: shouldReduceMotion ? 0 : index * 0.12,
        ease: "easeOut",
      }}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              y: -6,
              transition: { duration: 0.3 },
              boxShadow: "0 28px 70px -32px rgba(15, 23, 42, 0.38)",
            }
      }
      className="group relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/92 shadow-[0_22px_60px_rgba(148,163,184,0.16)] transition-all duration-300 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/82 dark:shadow-[0_28px_80px_rgba(2,6,23,0.45)]"
    >
      <div
        className={`absolute left-8 top-8 h-28 w-28 rounded-full blur-3xl ${theme.glow}`}
      />

      <div className="relative h-64 overflow-hidden bg-slate-100 dark:bg-slate-900">
        <motion.img
          src={cs.image}
          alt={localize(cs.title, language)}
          className="h-full w-full object-cover"
          loading="lazy"
          initial={{ scale: 1 }}
          whileHover={shouldReduceMotion ? {} : { scale: 1.06 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.55,
            ease: "easeOut",
          }}
        />
        <div
          className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${theme.line}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/96 via-slate-950/52 to-transparent dark:from-slate-950/90 dark:via-slate-950/48 dark:to-transparent" />

        <div className="absolute inset-x-5 bottom-5 z-10 flex items-end justify-between gap-4">
          <div className="max-w-[68%]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/72">
              {cs.client}
            </p>
            <h3
              className="mt-3 text-2xl font-black leading-tight tracking-[-0.03em] text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {localize(cs.title, language)}
            </h3>
          </div>

          <div className="rounded-[1.4rem] border border-white/10 bg-white/10 px-4 py-3 text-right backdrop-blur-md">
            <div
              className="text-[2.35rem] font-black leading-none tracking-[-0.05em] text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <AnimatedCounter value={cs.metric} />
            </div>
            <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/68">
              {localize(cs.metricLabel, language)}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 grid gap-5 p-6 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.p
          className="text-sm leading-7 text-slate-600 transition-colors group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.12 + 0.2 }}
        >
          {localize(cs.result, language)}
        </motion.p>

        <motion.div
          className={`rounded-[1.6rem] border border-slate-200/80 bg-gradient-to-br ${theme.panel} p-4 dark:border-slate-800`}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.12 + 0.25 }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
            {detailLabels[index % detailLabels.length]}
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {cs.tags.map((tag) => (
              <motion.span
                key={localize(tag, language)}
                className={`rounded-full border px-3 py-1.5 text-[11px] font-medium ${theme.badge}`}
                whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -1 }}
                transition={{ type: "spring", stiffness: 420, damping: 18 }}
                initial={{ opacity: 0, y: 4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {localize(tag, language)}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}

const uiText = {
  sectionLabel: { id: "Karya Terbaik Kami", en: "Our Portfolio" },
  sectionHeading: {
    id: "Hasil yang menggerakkan bisnis.",
    en: "Results that move business forward.",
  },
  sectionDescription: {
    id: "Dari konsep hingga skala — kami telah membantu brand terkemuka mentransformasi operasi dengan teknologi yang dibangun dengan benar.",
    en: "From concept to scale, we've helped leading brands transform operations with technology built to last.",
  },
};

export default function CaseStudy({
  caseStudies,
}: {
  caseStudies: CaseStudyData[];
}) {
  const { language } = useLanguage();
  const { shouldReduceMotion } = useMotionPreferences();
  const spotlightText = localize(
    {
      id: "Tampilan yang lebih editorial untuk menunjukkan kualitas kerja, bukan sekadar kartu galeri.",
      en: "A more editorial layout to signal quality of work, not just a gallery of cards.",
    },
    language,
  );

  return (
    <section
      id="case-studies"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.12),_transparent_24%),linear-gradient(180deg,_#f8fbff_0%,_#eef4fb_42%,_#ffffff_100%)] py-24 dark:bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.12),_transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.12),_transparent_22%),linear-gradient(180deg,_#030712_0%,_#0f172a_48%,_#030712_100%)] lg:py-32"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.46)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.46)_1px,transparent_1px)] bg-[size:84px_84px] opacity-30 dark:bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] dark:opacity-100" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-[-8rem] top-16 h-80 w-80 rounded-full bg-sky-300/25 blur-3xl dark:bg-cyan-400/12"
          animate={
            shouldReduceMotion
              ? { opacity: 0.2 }
              : { y: [0, 28, 0], x: [0, 20, 0] }
          }
          transition={{
            duration: 12,
            repeat: shouldReduceMotion ? 0 : Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute right-[-5rem] top-1/4 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-500/10"
          animate={
            shouldReduceMotion
              ? { opacity: 0.16 }
              : { y: [0, -22, 0], x: [0, -18, 0] }
          }
          transition={{
            duration: 14,
            repeat: shouldReduceMotion ? 0 : Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <AnimateIn className="mb-16 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <motion.span
              className="mb-4 inline-flex rounded-full border border-sky-200/70 bg-white/70 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-sky-700 shadow-sm backdrop-blur-xl dark:border-cyan-400/15 dark:bg-slate-950/60 dark:text-cyan-200"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {localize(uiText.sectionLabel, language)}
            </motion.span>
            <motion.h2
              className="max-w-2xl text-4xl font-black leading-[1.02] tracking-[-0.05em] text-slate-950 dark:text-white md:text-5xl lg:text-[3.75rem]"
              style={{ fontFamily: "'Playfair Display', serif" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {localize(uiText.sectionHeading, language)}
            </motion.h2>
          </div>

          <motion.div
            className="rounded-[1.8rem] border border-white/70 bg-white/75 p-6 shadow-[0_24px_60px_rgba(148,163,184,0.14)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/65 dark:shadow-[0_28px_80px_rgba(2,6,23,0.35)]"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
              {localize(uiText.sectionDescription, language)}
            </p>
            <div className="mt-6 rounded-[1.4rem] bg-slate-950 px-4 py-4 text-white dark:bg-[linear-gradient(180deg,rgba(8,15,32,0.98),rgba(4,10,20,0.94))]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/50 dark:text-cyan-100/55">
                {localize({ id: "Sudut pandang", en: "Perspective" }, language)}
              </p>
              <p className="mt-2 text-sm leading-6 text-white/88 dark:text-slate-100/92">
                {spotlightText}
              </p>
            </div>
          </motion.div>
        </AnimateIn>

        <motion.div
          className="grid grid-cols-1 gap-6 lg:grid-cols-3"
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
