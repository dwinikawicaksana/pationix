"use client";
import { motion } from "framer-motion";
import { HeroData } from "@/types/landing";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";

export default function Hero({ data }: { data: HeroData }) {
  const { language } = useLanguage();
  const titleText = localize(data.title, language);
  const titleLines = titleText.split("\n");
  const ctaText = localize(data.cta, language);
  const subtitleText = localize(data.subtitle, language);
  const badgeText = data.badge ? localize(data.badge, language) : undefined;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-950 text-slate-950 dark:text-white">
      {/* Strong overlay for light mode text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/50 to-white/30 dark:from-slate-950/60 dark:via-transparent dark:to-slate-950/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/30 to-transparent dark:from-slate-950/50 dark:via-transparent dark:to-transparent" />

      {/* Animated background orbs and gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Hero background video with animation */}
        <motion.div
          className="absolute inset-0 opacity-60 dark:opacity-100"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <video
            className="w-full h-full object-cover brightness-110 contrast-110 saturate-120 dark:brightness-110 dark:contrast-100 dark:saturate-110"
            src="/assets/videos/electrical.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </motion.div>

        {/* Light mode orbs */}
        {/* Top-left soft blue orb */}
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 opacity-0 dark:opacity-100 bg-sky-500/20 rounded-full blur-3xl"
          animate={{
            y: [0, 40, 0],
            x: [0, 20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Light mode: soft pink orb top-left */}
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 opacity-100 dark:opacity-0 bg-pink-300/15 rounded-full blur-3xl"
          animate={{
            y: [0, 40, 0],
            x: [0, 20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Top-right cyan orb */}
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 opacity-0 dark:opacity-100 bg-cyan-500/15 rounded-full blur-3xl"
          animate={{
            y: [0, -30, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Light mode: soft indigo orb top-right */}
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 opacity-100 dark:opacity-0 bg-indigo-300/12 rounded-full blur-3xl"
          animate={{
            y: [0, -30, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Middle purple orb */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-72 h-72 opacity-0 dark:opacity-100 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            y: [0, 50, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Light mode: soft blue orb middle */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-72 h-72 opacity-100 dark:opacity-0 bg-blue-300/10 rounded-full blur-3xl"
          animate={{
            y: [0, 50, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Bottom-left accent */}
        <motion.div
          className="absolute -bottom-40 -left-60 w-96 h-96 opacity-0 dark:opacity-100 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 30, 0],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Light mode: soft purple bottom-left */}
        <motion.div
          className="absolute -bottom-40 -left-60 w-96 h-96 opacity-100 dark:opacity-0 bg-purple-300/10 rounded-full blur-3xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 30, 0],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Animated grid pattern overlay - dark mode only */}
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

      <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-sky-500/5 via-transparent to-transparent" />
      <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-4 rounded-full bg-white/80 dark:bg-white/10 border border-white/60 dark:border-white/10 px-4 py-2 shadow-lg shadow-slate-950/10 backdrop-blur-xl">
              <img
                src="/assets/images/logo-2.png"
                alt="Paitonix"
                className="h-14 w-14 rounded-3xl object-cover shadow-xl shadow-slate-950/40"
              />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-600 dark:text-sky-300">
                  {badgeText}
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-200">
                  {localize(
                    {
                      id: "Platform landing page, web app, dan AI chatbot dalam satu pengalaman.",
                      en: "Landing page platform, web app, and AI chatbot in one experience.",
                    },
                    language,
                  )}
                </p>
              </div>
            </div>

            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 dark:text-white leading-[0.96]">
                {titleLines.map((line, i) => (
                  <motion.span
                    key={i}
                    className="block"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.2 + i * 0.1 }}
                  >
                    {i === 1 ? (
                      <span className="text-slate-700 dark:text-slate-200">
                        {line}
                      </span>
                    ) : (
                      line
                    )}
                  </motion.span>
                ))}
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-2xl text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed font-medium"
            >
              {subtitleText}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.55 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <a
                href="#cta"
                className="relative inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-extrabold transition-all duration-300 hover:-translate-y-1
                  bg-sky-400/20 dark:bg-sky-400/15
                  border border-sky-400/70 dark:border-sky-300/40
                  text-sky-700 dark:text-sky-200
                  backdrop-blur-xl
                  shadow-[0_0_22px_rgba(14,165,233,0.45),0_4px_14px_rgba(14,165,233,0.2),inset_0_1px_0_rgba(255,255,255,0.5)]
                  dark:shadow-[0_0_26px_rgba(56,189,248,0.45),0_4px_14px_rgba(56,189,248,0.2),inset_0_1px_0_rgba(255,255,255,0.12)]
                  hover:bg-sky-400/30 dark:hover:bg-sky-400/25
                  hover:shadow-[0_0_36px_rgba(14,165,233,0.6),0_8px_24px_rgba(14,165,233,0.3),inset_0_1px_0_rgba(255,255,255,0.6)]
                  dark:hover:shadow-[0_0_44px_rgba(56,189,248,0.6),0_8px_24px_rgba(56,189,248,0.3),inset_0_1px_0_rgba(255,255,255,0.18)]"
              >
                {ctaText}
                <span className="ml-3">→</span>
              </a>
              <a
                href="#preview"
                className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white transition"
              >
                {localize(
                  { id: "Lihat preview slide ↓", en: "View preview slides ↓" },
                  language,
                )}
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-2xl"
          >
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-br from-sky-500/20 via-transparent to-transparent blur-3xl" />
            <div className="relative rounded-[2rem] border border-sky-200/80 dark:border-slate-700/50 bg-white/90 dark:bg-slate-800/50 shadow-[0_40px_80px_rgba(15,23,42,0.12),0_0_0_1px_rgba(14,165,233,0.08)] dark:shadow-[0_40px_80px_rgba(0,0,0,0.3)] overflow-hidden backdrop-blur-md">
              {/* Card header */}
              <div className="bg-gradient-to-br from-sky-600 via-sky-700 to-slate-800 dark:from-slate-900 dark:to-slate-950 px-6 py-6 text-slate-50">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-sky-200 dark:text-cyan-300">
                      App preview
                    </p>
                    <p className="mt-2 text-sm text-sky-100 dark:text-slate-300">
                      Tampilan startup modern
                    </p>
                  </div>
                  <div className="inline-flex items-center rounded-full bg-amber-300 dark:bg-sky-500 px-3 py-1 text-[11px] font-semibold text-slate-950 dark:text-white">
                    Aplikasi LIVE
                  </div>
                </div>

                {/* Inner cards */}
                <div className="mt-8 grid gap-4 rounded-[1.75rem] bg-white/10 dark:bg-slate-800/60 p-5 ring-1 ring-white/20 dark:ring-cyan-500/20 shadow-inner">
                  {/* Insight bar */}
                  <div className="rounded-3xl bg-white/15 dark:bg-slate-700/50 p-4">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-sky-100 dark:text-slate-300">
                      <span>Insight</span>
                      <span>Realtime</span>
                    </div>
                    <div className="mt-4 grid gap-3">
                      <div className="h-2.5 rounded-full bg-white/40 dark:bg-cyan-500/40" />
                      <div className="h-2.5 rounded-full bg-white/40 dark:bg-cyan-500/40 w-5/6" />
                      <div className="h-2.5 rounded-full bg-white/40 dark:bg-cyan-500/40 w-3/4" />
                    </div>
                  </div>
                  {/* AI chat */}
                  <div className="rounded-3xl bg-white/95 dark:bg-slate-700/60 p-4 text-slate-950 dark:text-white">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Paitonix AI
                    </p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Chat dengan asisten produk untuk menyiapkan roadmap dan
                      desain fitur Anda.
                    </p>
                  </div>
                  {/* Startup launch */}
                  <div className="flex items-center justify-between rounded-3xl bg-white/15 dark:bg-slate-700/50 px-4 py-3 text-sm">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-amber-200 dark:text-cyan-400">
                        Startup launch
                      </p>
                      <p className="mt-1 text-sm text-white dark:text-slate-200 font-medium">
                        1.2K pengguna baru
                      </p>
                    </div>
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-300 dark:bg-sky-500 text-slate-950 dark:text-white font-bold text-xs">
                      +23%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
