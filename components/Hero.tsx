"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HeroData } from "@/types/landing";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";

export default function Hero({ data }: { data: HeroData }) {
  const { language } = useLanguage();
  const [isDark, setIsDark] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showSayHi, setShowSayHi] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const initialDark = stored ? stored === "dark" : prefersDark;
    setIsDark(initialDark);

    const updateSayHi = () => {
      const audio =
        (window as any).__welcomeAudio ||
        (document.getElementById("welcome-audio") as HTMLAudioElement | null);
      const audioPlaying = audio ? !audio.paused : false;
      setShowSayHi(window.scrollY === 0 || audioPlaying);
    };

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const onScroll = () => updateSayHi();
    window.addEventListener("scroll", onScroll, { passive: true });

    const audio =
      (window as any).__welcomeAudio ||
      (document.getElementById("welcome-audio") as HTMLAudioElement | null);
    if (audio) {
      audio.addEventListener("play", updateSayHi);
      audio.addEventListener("pause", updateSayHi);
    }

    updateSayHi();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (audio) {
        audio.removeEventListener("play", updateSayHi);
        audio.removeEventListener("pause", updateSayHi);
      }
    };
  }, []);

  const titleText = localize(data.title, language);
  const titleLines = titleText.split("\n");
  const ctaText = localize(data.cta, language);
  const startConversationText = localize(
    { id: "Mulai Percakapan", en: "Start Conversation" },
    language,
  );
  const subtitleText = localize(data.subtitle, language);
  const badgeText = data.badge ? localize(data.badge, language) : undefined;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-950 text-slate-950 dark:text-white">
      {/* Strong overlay for light mode text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/85 to-white/70 dark:from-slate-950/60 dark:via-transparent dark:to-slate-950/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent dark:from-slate-950/50 dark:via-transparent dark:to-transparent" />

      {/* Animated background orbs and gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Hero background video with animation */}
        <motion.div
          className="absolute inset-0 opacity-100 dark:opacity-100"
          animate={{ scale: [1, 1.01, 1] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          <video
            className={`w-full h-full object-cover ${
              isDark
                ? "brightness-105 contrast-110 saturate-115"
                : "brightness-95 contrast-105 saturate-110"
            }`}
            src={
              isDark
                ? "/assets/videos/video-section.mp4"
                : "/assets/videos/video-hero-white.mp4"
            }
            preload="auto"
            autoPlay
            muted
            loop
            playsInline
          />
          <div
            className={`absolute inset-0 ${isDark ? "bg-gradient-to-br from-slate-950/45 via-slate-950/25 to-transparent" : "bg-gradient-to-br from-white/80 via-white/55 to-transparent"}`}
          />
        </motion.div>

        <div className="hidden lg:block">
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
      </div>

      <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-sky-500/5 via-transparent to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 lg:py-28">
        <motion.div
          className={`absolute inset-x-0 top-0 flex items-start lg:items-center justify-center pointer-events-none pt-6 sm:pt-10 transition-opacity duration-500 ${showSayHi ? "opacity-100" : "opacity-0"}`}
          animate={showSayHi ? { scale: [1, 1.02, 1] } : { scale: 1 }}
          transition={{
            duration: 6,
            repeat: showSayHi ? Infinity : 0,
            ease: "easeInOut",
          }}
        >
          <img
            src="/assets/images/say-hi-transparent.gif"
            alt="say hi gif"
            className={`max-w-[85%] sm:max-w-[75%] lg:max-w-[70%] opacity-20 ${isDark ? "filter brightness-[0.8]" : "filter brightness-[1.15]"}`}
          />
        </motion.div>
        <div className="relative z-10 grid gap-14 lg:grid-cols-[1.05fr_0.95fr] items-center">
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
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 dark:text-white leading-[0.96]"
                style={{ textShadow: "0 16px 48px rgba(15,23,42,0.12)" }}
              >
                {titleLines.map((line, i) => (
                  <motion.span
                    key={i}
                    className="block"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.2 + i * 0.1 }}
                  >
                    {line}
                  </motion.span>
                ))}
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-2xl text-base sm:text-lg text-slate-900 dark:text-slate-200 leading-relaxed font-medium drop-shadow-sm"
            >
              {subtitleText}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.55 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="relative inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-extrabold transition-all duration-300 hover:-translate-y-1 bg-gradient-to-r from-cyan-500 to-sky-600 text-white shadow-[0_20px_40px_-24px_rgba(14,165,233,0.9)] hover:from-cyan-400 hover:to-sky-500"
              >
                {startConversationText}
                <span className="ml-2">→</span>
              </button>
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

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`relative max-w-4xl w-full overflow-hidden rounded-[2rem] border backdrop-blur-2xl ${
                isDark
                  ? "border-slate-700/65 bg-slate-950/95 shadow-2xl shadow-slate-950/40"
                  : "border-slate-200/65 bg-white/95 shadow-2xl shadow-slate-200/30"
              }`}
              initial={{ y: 32, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 32, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className="flex flex-col gap-6 p-6 sm:p-8 lg:p-10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.32em] text-cyan-500 dark:text-cyan-300">
                      {localize(
                        { id: "Mulai Percakapan", en: "Start Conversation" },
                        language,
                      )}
                    </p>
                    <h3 className="mt-3 text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
                      {localize(
                        {
                          id: "Apa yang Anda butuhkan dan berapa paket kami?",
                          en: "What you need and our package bundles.",
                        },
                        language,
                      )}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                    aria-label="Close modal"
                  >
                    ×
                  </button>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
                  <div className="space-y-5 rounded-[1.75rem] bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-900 p-6 text-white shadow-xl shadow-cyan-500/20 dark:shadow-cyan-500/10">
                    <div className="rounded-3xl bg-white/5 p-5">
                      <p className="text-xs uppercase tracking-[0.30em] text-cyan-200/80">
                        {localize(
                          {
                            id: "Apa yang Anda butuhkan?",
                            en: "What do you need?",
                          },
                          language,
                        )}
                      </p>
                      <ul className="mt-5 space-y-4 text-sm leading-relaxed text-slate-100">
                        <li className="flex items-start gap-3">
                          <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-2xl bg-white/10 text-cyan-200">
                            1
                          </span>
                          {localize(
                            {
                              id: "Desain produk modern yang skalabel.",
                              en: "Scalable modern product design.",
                            },
                            language,
                          )}
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-2xl bg-white/10 text-cyan-200">
                            2
                          </span>
                          {localize(
                            {
                              id: "Prototipe interaktif dan pengalaman pengguna.",
                              en: "Interactive prototypes and UX.",
                            },
                            language,
                          )}
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-2xl bg-white/10 text-cyan-200">
                            3
                          </span>
                          {localize(
                            {
                              id: "Roadmap AI dan otomatisasi produk.",
                              en: "AI roadmap and product automation.",
                            },
                            language,
                          )}
                        </li>
                      </ul>
                    </div>

                    <div
                      className={`rounded-[1.5rem] p-5 ring-1 ${isDark ? "bg-slate-900/80 ring-white/10 text-slate-300" : "bg-slate-100/95 ring-slate-200/80 text-slate-700"}`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs uppercase tracking-[0.3em] ${isDark ? "text-slate-400" : "text-slate-500"}`}
                        >
                          {localize(
                            { id: "Konsultasi", en: "Consultation" },
                            language,
                          )}
                        </span>
                        <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-semibold text-cyan-100">
                          {localize({ id: "Gratis", en: "Free" }, language)}
                        </span>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-slate-300">
                        {localize(
                          {
                            id: "Kami mulai dengan kebutuhan Anda, lalu rekomendasikan paket yang tepat.",
                            en: "We start from your needs and recommend the right package.",
                          },
                          language,
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-[2rem] bg-white p-6 shadow-lg shadow-slate-950/5 dark:bg-slate-900 dark:shadow-black/20 ring-1 ring-slate-200/80 dark:ring-slate-700/70">
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                        {localize(
                          { id: "Paket Starter", en: "Starter" },
                          language,
                        )}
                      </p>
                      <p className="mt-4 text-3xl font-black text-slate-950 dark:text-white">
                        {localize({ id: "Rp 6.500.000", en: "$599" }, language)}
                      </p>
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {localize(
                          {
                            id: "Landing page & prototype dasar.",
                            en: "Basic landing page & prototype.",
                          },
                          language,
                        )}
                      </p>
                      <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                        <li>
                          •{" "}
                          {localize(
                            { id: "1 desain halaman", en: "1 page design" },
                            language,
                          )}
                        </li>
                        <li>
                          •{" "}
                          {localize(
                            { id: "Review 2 kali", en: "2 review rounds" },
                            language,
                          )}
                        </li>
                      </ul>
                    </div>
                    <div className="rounded-[2rem] bg-white p-6 shadow-lg shadow-slate-950/5 dark:bg-slate-900 dark:shadow-black/20 ring-1 ring-slate-200/80 dark:ring-slate-700/70">
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                        {localize(
                          { id: "Paket Growth", en: "Growth" },
                          language,
                        )}
                      </p>
                      <p className="mt-4 text-3xl font-black text-slate-950 dark:text-white">
                        {localize(
                          { id: "Rp 12.500.000", en: "$1,199" },
                          language,
                        )}
                      </p>
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {localize(
                          {
                            id: "UI lebih lengkap dengan animasi.",
                            en: "Full UI with motion.",
                          },
                          language,
                        )}
                      </p>
                      <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                        <li>
                          •{" "}
                          {localize(
                            { id: "3 desain halaman", en: "3 page designs" },
                            language,
                          )}
                        </li>
                        <li>
                          •{" "}
                          {localize(
                            {
                              id: "Prototype interaktif",
                              en: "Interactive prototype",
                            },
                            language,
                          )}
                        </li>
                      </ul>
                    </div>
                    <div className="rounded-[2rem] bg-white p-6 shadow-lg shadow-slate-950/5 dark:bg-slate-900 dark:shadow-black/20 ring-1 ring-slate-200/80 dark:ring-slate-700/70">
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                        {localize(
                          { id: "Paket Enterprise", en: "Enterprise" },
                          language,
                        )}
                      </p>
                      <p className="mt-4 text-3xl font-black text-slate-950 dark:text-white">
                        {localize({ id: "Custom", en: "Custom" }, language)}
                      </p>
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {localize(
                          {
                            id: "Solusi lengkap untuk produk skala besar.",
                            en: "Complete solution for large-scale products.",
                          },
                          language,
                        )}
                      </p>
                      <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                        <li>
                          •{" "}
                          {localize(
                            {
                              id: "Sistem desain penuh",
                              en: "Full design system",
                            },
                            language,
                          )}
                        </li>
                        <li>
                          •{" "}
                          {localize(
                            {
                              id: "Integrasi AI / chatbot",
                              en: "AI / chatbot integration",
                            },
                            language,
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
