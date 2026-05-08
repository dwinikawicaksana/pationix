"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HeroData } from "@/types/landing";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";

export default function Hero({ data }: { data: HeroData }) {
  const { language } = useLanguage();
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showSayHi, setShowSayHi] = useState(false);
  const [chatStep, setChatStep] = useState(0);
  const [heroChatStep, setHeroChatStep] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const heroChatContainerRef = useRef<HTMLDivElement | null>(null);

  const chatSamples = [
    {
      sender: "customer",
      text: "Halo, saya ingin membuat landing page dengan chatbot AI untuk produk saya.",
    },
    {
      sender: "ai",
      text: "Tentu, kami bisa bantu dengan desain modern, pengalaman interaktif, dan integrasi chatbot.",
    },
    {
      sender: "customer",
      text: "Berapa lama prosesnya dan apa saja yang termasuk?",
    },
    {
      sender: "ai",
      text: "Biasanya 2-3 minggu dengan prototipe, UI responsif, dan asisten AI siap pakai.",
    },
  ];

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const initialDark = stored ? stored === "dark" : prefersDark;
    setIsDark(initialDark);

    // Mobile detection
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const getAudio = () => {
      return (
        ((window as any).__welcomeAudio as HTMLAudioElement | undefined) ||
        (document.getElementById("welcome-audio") as HTMLAudioElement | null) ||
        (document.getElementById("welcome-audio-js") as HTMLAudioElement | null)
      );
    };

    const updateSayHi = () => {
      const audio = getAudio();
      setShowSayHi(Boolean(audio && !audio.paused && !audio.muted));
    };

    const audio = getAudio();
    if (audio) {
      audio.addEventListener("play", updateSayHi);
      audio.addEventListener("pause", updateSayHi);
      audio.addEventListener("ended", updateSayHi);
      audio.addEventListener("volumechange", updateSayHi);
    }

    updateSayHi();
    setMounted(true);

    // Listen for support button event
    const handleShowSayHi = () => {
      setShowSayHi(true);
    };
    window.addEventListener("showSayHi", handleShowSayHi);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("showSayHi", handleShowSayHi);
      if (audio) {
        audio.removeEventListener("play", updateSayHi);
        audio.removeEventListener("pause", updateSayHi);
        audio.removeEventListener("ended", updateSayHi);
        audio.removeEventListener("volumechange", updateSayHi);
      }
    };
  }, []);

  useEffect(() => {
    let timer: number | undefined;
    if (modalOpen) {
      setChatStep(1);
      timer = window.setInterval(() => {
        setChatStep((prev) => {
          if (prev >= chatSamples.length) {
            window.clearInterval(timer);
            return prev;
          }
          return prev + 1;
        });
      }, 1800);
    } else {
      setChatStep(0);
    }

    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, [modalOpen]);

  useEffect(() => {
    let timer: number | undefined;
    setHeroChatStep(1);
    timer = window.setInterval(() => {
      setHeroChatStep((prev) => {
        if (prev >= chatSamples.length) {
          window.clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 1800);

    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
    if (heroChatContainerRef.current) {
      heroChatContainerRef.current.scrollTop =
        heroChatContainerRef.current.scrollHeight;
    }
  }, [chatStep, heroChatStep]);

  const titleText = localize(data.title, language);
  const titleLines = titleText.split("\n");
  const ctaText = localize(data.cta, language);
  const startConversationText = localize(
    { id: "Mulai Percakapan", en: "Start Conversation" },
    language,
  );
  const subtitleText = localize(data.subtitle, language);
  const badgeText = data.badge ? localize(data.badge, language) : undefined;
  const chatMessages = chatSamples.slice(0, chatStep);
  const heroChatMessages = chatSamples.slice(0, heroChatStep);

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
          animate={isMobile ? { scale: 1 } : { scale: [1, 1.01, 1] }}
          transition={{
            duration: isMobile ? 0 : 12,
            repeat: isMobile ? 0 : Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          {mounted && (
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
          )}
          <div
            className={`absolute inset-0 ${isDark ? "bg-gradient-to-br from-slate-950/70 via-slate-950/45 to-transparent" : "bg-gradient-to-br from-white/80 via-white/55 to-transparent"}`}
          />
        </motion.div>

        <div className="hidden lg:block">
          {/* Light mode orbs */}
          {!isMobile && (
            <>
              {/* Top-left soft blue orb */}
              <motion.div
                className="absolute -top-40 -left-40 w-80 h-80 opacity-0 dark:opacity-100 bg-sky-500/20 rounded-full blur-3xl"
                animate={{
                  y: [0, 40, 0],
                  x: [0, 20, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Light mode: soft pink orb top-left */}
              <motion.div
                className="absolute -top-40 -left-40 w-80 h-80 opacity-100 dark:opacity-0 bg-pink-300/15 rounded-full blur-3xl"
                animate={{
                  y: [0, 40, 0],
                  x: [0, 20, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
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
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Light mode: soft purple bottom-left */}
              <motion.div
                className="absolute -bottom-40 -left-60 w-96 h-96 opacity-100 dark:opacity-0 bg-purple-300/10 rounded-full blur-3xl"
                animate={{
                  y: [0, -20, 0],
                  x: [0, 30, 0],
                }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
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
            </>
          )}
        </div>
      </div>

      <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-sky-500/5 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-5 flex items-center justify-center px-4 text-center">
        <span className="mx-auto max-w-full select-none text-[clamp(1rem,16vw,3rem)] font-black uppercase tracking-[0.18em] leading-none text-slate-950/5 dark:text-slate-500/10 sm:text-[clamp(2.2rem,10vw,5.5rem)] sm:tracking-[0.28em] lg:text-[clamp(2.6rem,9vw,6rem)] lg:tracking-[0.35em]">
          paitonix-labs
        </span>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
        <div className="relative z-20 mb-8 flex w-full justify-start">
          <div className="w-full max-w-[840px] text-left">
            <div className="flex items-center gap-4 mb-6">
              <img
                src="/assets/images/logo-black-transparent.png"
                alt="Paitonix"
                className="h-16 w-16 object-cover rounded-lg shadow-lg shadow-sky-500/20"
              />
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-sky-300/60 bg-gradient-to-r from-sky-50 to-cyan-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.35em] text-sky-700 shadow-md shadow-sky-500/15 dark:border-sky-600/40 dark:bg-gradient-to-r dark:from-sky-950/60 dark:to-sky-900/40 dark:text-cyan-300">
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5 text-sky-500 dark:text-cyan-400"
                    aria-hidden="true"
                  >
                    <path d="M10 2a6 6 0 100 12 6 6 0 000-12zm1 9H9V6h2v5zm-1 3a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
                  </svg>
                  {localize({ id: "Visi", en: "Vision" }, language)}
                </div>
                <p className="max-w-xl text-base font-medium text-slate-700 dark:text-slate-200 leading-relaxed">
                  {localize(
                    {
                      id: "Visi kami adalah menghubungkan produk, orang, dan kecerdasan dalam pengalaman digital yang mulus.",
                      en: "Our vision is to connect products, people, and intelligence in a seamless digital experience.",
                    },
                    language,
                  )}
                </p>
                <span className="text-xl font-black uppercase tracking-[0.4em] bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent dark:from-cyan-400 dark:to-sky-300">
                  paitonix-labs
                </span>
              </div>
            </div>
            <div className="space-y-12">
              <div className="space-y-5">
                <motion.div
                  className="relative pl-12"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <motion.span
                    className="absolute left-0 top-4 block h-5 w-5 rounded-full bg-gradient-to-br from-sky-500 via-cyan-500 to-blue-500 shadow-[0_0_28px_rgba(14,165,233,0.7)] dark:shadow-[0_0_32px_rgba(34,211,238,0.6)]"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: isMobile ? 1.5 : 2.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.span
                    className="absolute left-[8.5px] top-8 block h-24 w-1 rounded-full bg-gradient-to-b from-sky-500/80 via-sky-400/40 to-cyan-400/10 dark:from-cyan-400/80 dark:via-sky-400/50 dark:to-sky-300/10"
                    animate={{ scaleY: [1, 1.08, 1] }}
                    transition={{
                      duration: isMobile ? 1.8 : 2.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="group rounded-2xl border-2 border-sky-300/50 bg-gradient-to-br from-sky-50/80 via-cyan-50/50 to-white/40 px-6 py-5 shadow-xl shadow-sky-200/40 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-sky-300/50 dark:border-sky-600/40 dark:bg-gradient-to-br dark:from-sky-950/60 dark:via-slate-950/40 dark:to-slate-900/30 dark:shadow-sky-950/40 dark:hover:shadow-sky-900/60"
                    whileHover={{ y: -4 }}
                  >
                    <p className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-[-0.03em] leading-tight bg-gradient-to-br from-sky-700 via-sky-600 to-blue-600 bg-clip-text text-transparent dark:from-cyan-200 dark:via-sky-300 dark:to-cyan-400">
                      integrate.
                    </p>
                    <p className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-cyan-300">
                      {localize(
                        { id: "Satu Platform", en: "One Platform" },
                        language,
                      )}
                    </p>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="relative pl-16"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <motion.span
                    className="absolute left-2 top-14 block h-2.5 w-14 rounded-full bg-gradient-to-r from-sky-500/60 via-cyan-400/40 to-transparent shadow-[0_0_20px_rgba(56,189,248,0.35)] dark:from-cyan-400/70 dark:via-sky-400/40 dark:to-transparent"
                    animate={{ scaleX: [0.6, 1, 0.6], opacity: [0.7, 1, 0.7] }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="group rounded-2xl border-2 border-sky-300/50 bg-gradient-to-br from-sky-50/80 via-cyan-50/50 to-white/40 px-6 py-5 shadow-xl shadow-sky-200/40 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-sky-300/50 dark:border-sky-600/40 dark:bg-gradient-to-br dark:from-sky-950/60 dark:via-slate-950/40 dark:to-slate-900/30 dark:shadow-sky-950/40 dark:hover:shadow-sky-900/60"
                    whileHover={{ y: -4 }}
                  >
                    <p className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-[-0.03em] leading-tight bg-gradient-to-br from-sky-700 via-cyan-600 to-blue-600 bg-clip-text text-transparent dark:from-cyan-200 dark:via-sky-300 dark:to-cyan-400">
                      connect.
                    </p>
                    <p className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-cyan-300">
                      {localize(
                        { id: "Ekosistem Terpadu", en: "Unified Ecosystem" },
                        language,
                      )}
                    </p>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="relative pl-20"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <motion.span
                    className="absolute left-6 top-14 block h-2.5 w-14 rounded-full bg-gradient-to-r from-sky-500/60 via-cyan-400/40 to-transparent shadow-[0_0_20px_rgba(56,189,248,0.35)] dark:from-cyan-400/70 dark:via-sky-400/40 dark:to-transparent"
                    animate={{ scaleX: [0.6, 1, 0.6], opacity: [0.7, 1, 0.7] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.2,
                    }}
                  />
                  <motion.div
                    className="group rounded-2xl border-2 border-sky-300/50 bg-gradient-to-br from-sky-50/80 via-cyan-50/50 to-white/40 px-6 py-5 shadow-xl shadow-sky-200/40 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-sky-300/50 dark:border-sky-600/40 dark:bg-gradient-to-br dark:from-sky-950/60 dark:via-slate-950/40 dark:to-slate-900/30 dark:shadow-sky-950/40 dark:hover:shadow-sky-900/60"
                    whileHover={{ y: -4 }}
                  >
                    <p className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-[-0.03em] leading-tight bg-gradient-to-br from-sky-700 via-cyan-600 to-blue-600 bg-clip-text text-transparent dark:from-cyan-200 dark:via-sky-300 dark:to-cyan-400">
                      innovate.
                    </p>
                    <p className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-cyan-300">
                      {localize(
                        { id: "Masa Depan", en: "Future Ready" },
                        language,
                      )}
                    </p>
                  </motion.div>
                </motion.div>
              </div>

              <div className="border-t-2 border-sky-300/40 pt-8 dark:border-sky-700/30">
                <div className="relative mb-6 h-1 overflow-hidden rounded-full bg-slate-200/50 dark:bg-slate-700/40">
                  <motion.div
                    className="absolute left-0 top-0 h-full w-24 rounded-full bg-cyan-500 shadow-[0_0_18px_rgba(56,189,248,0.45)]"
                    initial={{ x: "-100%" }}
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <motion.div
          className={`absolute inset-x-0 top-0 flex items-start lg:items-center justify-center pointer-events-none pt-2 sm:pt-10 transition-opacity duration-500 ${showSayHi ? "opacity-100" : "opacity-0"}`}
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
            className={`max-w-[85%] sm:max-w-[75%] lg:max-w-[70%] opacity-20 rotate-12 scale-105 ${isDark ? "filter brightness-[0.8]" : "filter brightness-[1.15]"}`}
          />
        </motion.div>
        <div className="relative z-10 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-10"
          >
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-slate-950 dark:text-white leading-[0.96]">
                {titleLines.map((line, i) => (
                  <motion.span
                    key={i}
                    className="block"
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.2 + i * 0.1 }}
                  >
                    {line}
                  </motion.span>
                ))}
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="max-w-2xl text-base sm:text-lg text-slate-900 dark:text-slate-200 leading-relaxed font-medium"
            >
              {subtitleText}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.55 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-sky-600 dark:from-cyan-500/90 dark:to-sky-600/90 px-6 py-3 text-base font-semibold text-white shadow-[0_8px_32px_rgba(14,165,233,0.35)] hover:shadow-[0_16px_48px_rgba(14,165,233,0.5)] transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-xl border border-white/20 dark:border-cyan-400/30"
              >
                {startConversationText}
                <span className="ml-2">→</span>
              </button>
              <a
                href="#preview"
                className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white transition px-4 py-2 rounded-full border border-slate-300/30 dark:border-white/10 backdrop-blur-sm hover:bg-slate-900/5 dark:hover:bg-white/5 hover:shadow-[0_8px_24px_rgba(14,165,233,0.2)]"
              >
                {localize(
                  { id: "Lihat preview slide ↓", en: "View preview slides ↓" },
                  language,
                )}
              </a>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.75rem] border border-slate-200/70 bg-slate-50/80 p-5 shadow-sm shadow-slate-900/5 backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/60">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                  Premium Suite
                </p>
                <p className="mt-3 text-sm text-slate-900 dark:text-slate-100 leading-relaxed">
                  {localize(
                    {
                      id: "Desain yang selaras dengan pengguna dan sistem yang siap berkembang.",
                      en: "Design aligned with user needs and scalable systems.",
                    },
                    language,
                  )}
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-slate-200/70 bg-white/80 p-5 shadow-sm shadow-slate-900/5 backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-950/50">
                <p className="text-xs uppercase tracking-[0.28em] text-sky-600 dark:text-cyan-300">
                  Modern Delivery
                </p>
                <p className="mt-3 text-sm text-slate-900 dark:text-slate-100 leading-relaxed">
                  {localize(
                    {
                      id: "Iterasi cepat, komunikasi jelas, dan pengalaman yang konsisten di setiap layar.",
                      en: "Rapid iteration, clear communication, and consistent experience across all screens.",
                    },
                    language,
                  )}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-full sm:max-w-lg"
          >
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-br from-sky-500/20 via-transparent to-transparent blur-3xl" />
            <div className="relative z-20 overflow-hidden rounded-[2rem] border border-white/30 bg-white/40 shadow-2xl shadow-slate-950/10 backdrop-blur-2xl dark:border-slate-700/40 dark:bg-slate-950/75 dark:shadow-black/20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.16),_transparent_42%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(255,255,255,0.35)_0%,_rgba(255,255,255,0.08)_55%,_transparent_100%)]" />
              <div className="relative p-6 sm:p-8">
                <div
                  className={`rounded-[2rem] border ${isDark ? "border-white/10 bg-slate-950/95" : "border-slate-200/80 bg-white/95"} p-5 shadow-2xl shadow-slate-950/10`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-sky-500/80">
                        Paitonix Chat
                      </p>
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
                        AI untuk percakapan produk.
                      </p>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 overflow-hidden border border-white/10">
                      <img
                        src="/assets/images/ai-assistant.png"
                        alt="AI assistant"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  <div
                    ref={heroChatContainerRef}
                    className="mt-6 flex max-h-[340px] flex-col gap-3 overflow-y-auto pr-1"
                  >
                    {heroChatMessages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.sender === "customer" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-[1.75rem] px-4 py-3 text-sm leading-relaxed ${
                            message.sender === "customer"
                              ? isDark
                                ? "bg-slate-800 text-slate-100"
                                : "bg-slate-100 text-slate-950"
                              : isDark
                                ? "bg-slate-900/90 text-slate-100"
                                : "bg-slate-900 text-white"
                          } ${message.sender === "customer" ? "rounded-tl-[1.75rem] rounded-tr-[1.75rem] rounded-bl-[1.75rem] rounded-br-[0.5rem]" : "rounded-tr-[1.75rem] rounded-bl-[1.75rem] rounded-br-[1.75rem] rounded-tl-[0.5rem]"}`}
                        >
                          {message.text}
                        </div>
                      </div>
                    ))}
                    {heroChatStep < chatSamples.length && (
                      <div
                        className={`inline-flex items-center gap-2 rounded-[1.5rem] px-4 py-3 text-sm ${isDark ? "bg-slate-900/85 text-slate-400" : "bg-slate-100 text-slate-600"}`}
                      >
                        <span className="inline-flex h-2.5 w-2.5 rounded-full bg-current animate-pulse" />
                        {localize(
                          {
                            id: "AI sedang mengetik...",
                            en: "AI is typing...",
                          },
                          language,
                        )}
                      </div>
                    )}
                  </div>

                  <div
                    className={`mt-5 rounded-[1.75rem] border ${isDark ? "border-white/10 bg-slate-900/75 text-slate-300" : "border-slate-200/80 bg-slate-50 text-slate-700"} px-4 py-4`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-slate-400 dark:text-slate-400">
                        {localize(
                          {
                            id: "Tanyakan ide fitur...",
                            en: "Ask feature ideas...",
                          },
                          language,
                        )}
                      </span>
                      <button className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-cyan-500/20">
                        {localize({ id: "Kirim", en: "Send" }, language)}
                      </button>
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
            className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto bg-slate-950/80 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.div
              className={`relative w-full max-w-[min(100vw-1.5rem,56rem)] max-h-[calc(100vh-2rem)] overflow-y-auto rounded-[2rem] border backdrop-blur-2xl ${
                isDark
                  ? "border-slate-700/65 bg-slate-950/95 shadow-2xl shadow-slate-950/40"
                  : "border-slate-200/65 bg-white/95 shadow-2xl shadow-slate-200/30"
              }`}
              initial={{ y: 24, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 24, opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
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
                  <div
                    className={`space-y-5 rounded-[1.75rem] p-6 shadow-xl ${isDark ? "bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-900 text-white shadow-cyan-500/20" : "bg-white/95 text-slate-950 shadow-slate-200/60 ring-1 ring-slate-200/70"}`}
                  >
                    <div
                      className={`rounded-3xl p-5 ${isDark ? "bg-white/5" : "bg-slate-100/95 ring-1 ring-slate-200/80"}`}
                    >
                      <p
                        className={`text-xs uppercase tracking-[0.30em] ${isDark ? "text-cyan-200/80" : "text-slate-500"}`}
                      >
                        {localize(
                          {
                            id: "Apa yang Anda butuhkan?",
                            en: "What do you need?",
                          },
                          language,
                        )}
                      </p>
                      <ul
                        className={`mt-5 space-y-4 text-sm leading-relaxed ${isDark ? "text-slate-100" : "text-slate-700"}`}
                      >
                        <li className="flex items-start gap-3">
                          <span
                            className={`mt-1 inline-flex h-7 w-7 items-center justify-center rounded-2xl ${isDark ? "bg-white/10 text-cyan-200" : "bg-slate-200 text-slate-700"}`}
                          >
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
                          <span
                            className={`mt-1 inline-flex h-7 w-7 items-center justify-center rounded-2xl ${isDark ? "bg-white/10 text-cyan-200" : "bg-slate-200 text-slate-700"}`}
                          >
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
                          <span
                            className={`mt-1 inline-flex h-7 w-7 items-center justify-center rounded-2xl ${isDark ? "bg-white/10 text-cyan-200" : "bg-slate-200 text-slate-700"}`}
                          >
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
                      className={`rounded-[1.5rem] p-5 ring-1 ${isDark ? "bg-slate-900/90 ring-white/10 text-slate-200" : "bg-white/95 ring-slate-200/80 text-slate-900"}`}
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
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${isDark ? "bg-cyan-500/15 text-cyan-100" : "bg-cyan-500/10 text-cyan-700"}`}
                        >
                          {localize({ id: "Gratis", en: "Free" }, language)}
                        </span>
                      </div>
                      <p
                        className={`mt-4 text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}
                      >
                        {localize(
                          {
                            id: "Kami mulai dengan kebutuhan Anda, lalu rekomendasikan paket yang tepat.",
                            en: "We start from your needs and recommend the right package.",
                          },
                          language,
                        )}
                      </p>
                    </div>

                    <div
                      className={`rounded-[1.5rem] p-4 ring-1 ${isDark ? "bg-slate-900/90 ring-white/10 text-slate-200" : "bg-slate-50 ring-slate-200/80 text-slate-900"}`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs uppercase tracking-[0.3em] ${isDark ? "text-slate-400" : "text-slate-500"}`}
                        >
                          {localize(
                            { id: "Chat AI", en: "AI Chat Preview" },
                            language,
                          )}
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 text-[11px] font-semibold ${isDark ? "bg-sky-500/15 text-sky-200" : "bg-slate-900/10 text-slate-900"}`}
                        >
                          {localize(
                            { id: "Live demo", en: "Live demo" },
                            language,
                          )}
                        </span>
                      </div>
                      <div
                        ref={chatContainerRef}
                        className="mt-4 max-h-56 space-y-3 overflow-y-auto pr-1"
                      >
                        {chatMessages.map((message, index) => (
                          <div
                            key={index}
                            className={`flex ${message.sender === "customer" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-[1.5rem] px-4 py-3 text-sm leading-relaxed ${
                                message.sender === "ai"
                                  ? isDark
                                    ? "bg-cyan-500/15 text-cyan-100"
                                    : "bg-cyan-500/10 text-slate-950"
                                  : isDark
                                    ? "bg-slate-800/85 text-slate-100"
                                    : "bg-white shadow-sm text-slate-900"
                              }`}
                            >
                              {message.text}
                            </div>
                          </div>
                        ))}
                        {chatStep < chatSamples.length && (
                          <div className="inline-flex items-center gap-2 rounded-[1.5rem] bg-slate-100 px-4 py-3 text-sm text-slate-700 dark:bg-slate-800/90 dark:text-slate-300">
                            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-current animate-pulse" />
                            {localize(
                              {
                                id: "AI sedang mengetik...",
                                en: "AI is typing...",
                              },
                              language,
                            )}
                          </div>
                        )}
                      </div>
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
