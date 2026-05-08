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
    <section
      className="relative overflow-hidden bg-slate-950 text-white"
      style={{
        backgroundImage: "url('/assets/images/hero-background.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[1px]" />
      <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-slate-950/40 via-transparent to-transparent" />
      <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-4 rounded-full bg-white/10 border border-white/10 px-4 py-2 shadow-lg shadow-slate-950/20 backdrop-blur-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-900/95 text-white shadow-xl shadow-slate-950/40">
                <span className="text-2xl font-black">P</span>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-300">
                  {badgeText}
                </p>
                <p className="mt-1 text-sm text-slate-200">
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
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[0.96]">
                {titleLines.map((line, i) => (
                  <motion.span
                    key={i}
                    className="block"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.2 + i * 0.1 }}
                  >
                    {i === 1 ? (
                      <span className="text-slate-200">{line}</span>
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
              className="max-w-2xl text-base sm:text-lg text-slate-200 leading-relaxed"
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
                className="inline-flex items-center justify-center rounded-full bg-sky-500 px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-xl shadow-sky-500/20 transition hover:-translate-y-0.5 hover:bg-sky-400"
              >
                {ctaText}
                <span className="ml-3">→</span>
              </a>
              <a
                href="#preview"
                className="text-sm font-medium text-slate-200 hover:text-white transition"
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
            <div className="relative rounded-[2rem] border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 shadow-[0_40px_80px_rgba(15,23,42,0.08)] dark:shadow-[0_40px_80px_rgba(0,0,0,0.3)] overflow-hidden backdrop-blur-sm">
              <div className="bg-gradient-to-br from-slate-950 to-slate-900 dark:from-slate-900 dark:to-slate-950 px-6 py-6 text-slate-50">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-sky-200 dark:text-cyan-300">
                      App preview
                    </p>
                    <p className="mt-2 text-sm text-slate-200 dark:text-slate-300">
                      Tampilan startup modern
                    </p>
                  </div>
                  <div className="inline-flex items-center rounded-full bg-amber-300 dark:bg-sky-500 px-3 py-1 text-[11px] font-semibold text-slate-950 dark:text-white">
                    Aplikasi LIVE
                  </div>
                </div>
                <div className="mt-8 grid gap-4 rounded-[1.75rem] bg-slate-900/95 dark:bg-slate-800/60 p-5 ring-1 ring-white/10 dark:ring-cyan-500/20 shadow-inner">
                  <div className="rounded-3xl bg-slate-800/90 dark:bg-slate-700/50 p-4">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-300">
                      <span>Insight</span>
                      <span>Realtime</span>
                    </div>
                    <div className="mt-4 grid gap-3">
                      <div className="h-2.5 rounded-full bg-slate-700/80 dark:bg-cyan-500/40" />
                      <div className="h-2.5 rounded-full bg-slate-700/80 dark:bg-cyan-500/40 w-5/6" />
                      <div className="h-2.5 rounded-full bg-slate-700/80 dark:bg-cyan-500/40 w-3/4" />
                    </div>
                  </div>
                  <div className="rounded-3xl bg-white/95 dark:bg-slate-700/60 p-4 text-slate-950 dark:text-white">
                    <p className="text-sm font-semibold dark:text-slate-100">
                      Paitonix AI
                    </p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Chat dengan asisten produk untuk menyiapkan roadmap dan
                      desain fitur Anda.
                    </p>
                  </div>
                  <div className="flex items-center justify-between rounded-3xl bg-slate-800/90 dark:bg-slate-700/50 px-4 py-3 text-sm text-slate-300 dark:text-slate-200">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-sky-400 dark:text-cyan-400">
                        Startup launch
                      </p>
                      <p className="mt-1 text-sm text-slate-100 dark:text-slate-200">
                        1.2K pengguna baru
                      </p>
                    </div>
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-300 dark:bg-sky-500 text-slate-950 dark:text-white font-bold">
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
