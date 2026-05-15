"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HeroData } from "@/types/landing";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";
import { useMotionPreferences } from "@/hooks/useMotionPreferences";

export default function Hero({ data }: { data: HeroData }) {
  const { language } = useLanguage();
  const { shouldReduceMotion, isMobile } = useMotionPreferences();
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
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
      textEn:
        "Hi, I want to create a landing page with AI chatbot for my product.",
    },
    {
      sender: "ai",
      text: "Tentu, kami bisa bantu dengan desain modern, pengalaman interaktif, dan integrasi chatbot.",
      textEn:
        "Absolutely, we can help with modern design, interactive experience, and chatbot integration.",
    },
    {
      sender: "customer",
      text: "Berapa lama prosesnya dan apa saja yang termasuk?",
      textEn: "How long does it take and what's included?",
    },
    {
      sender: "ai",
      text: "Biasanya 2-3 minggu dengan prototipe, UI responsif, dan asisten AI siap pakai.",
      textEn:
        "Usually 2-3 weeks with prototype, responsive UI, and ready-to-use AI assistant.",
    },
  ];

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const initialDark = stored ? stored === "dark" : prefersDark;
    setIsDark(initialDark);

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

    // Defer heavy video mount until the page is idle / interactive so it
    // doesn't compete with LCP. Falls back to a short timeout on browsers
    // that don't support requestIdleCallback (Safari).
    let idleId: number | undefined;
    let timeoutId: number | undefined;
    const enableVideo = () => setVideoReady(true);
    if (typeof (window as any).requestIdleCallback === "function") {
      idleId = (window as any).requestIdleCallback(enableVideo, {
        timeout: 2000,
      });
    } else {
      timeoutId = window.setTimeout(enableVideo, 1500);
    }

    // Listen for support button event
    const handleShowSayHi = () => {
      setShowSayHi(true);
    };
    window.addEventListener("showSayHi", handleShowSayHi);

    return () => {
      observer.disconnect();
      window.removeEventListener("showSayHi", handleShowSayHi);
      if (idleId !== undefined && (window as any).cancelIdleCallback) {
        (window as any).cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
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
      timer = window.setInterval(
        () => {
          setChatStep((prev) => {
            if (prev >= chatSamples.length) {
              window.clearInterval(timer);
              return prev;
            }
            return prev + 1;
          });
        },
        shouldReduceMotion ? 2400 : 1800,
      );
    } else {
      setChatStep(0);
    }

    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, [modalOpen, shouldReduceMotion]);

  useEffect(() => {
    let timer: number | undefined;
    setHeroChatStep(1);
    timer = window.setInterval(
      () => {
        setHeroChatStep((prev) => {
          if (prev >= chatSamples.length) {
            window.clearInterval(timer);
            return prev;
          }
          return prev + 1;
        });
      },
      shouldReduceMotion ? 2400 : 1800,
    );

    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, [shouldReduceMotion]);

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
  const heroMetrics = [
    {
      value: localize({ id: "2-4 minggu", en: "2-4 weeks" }, language),
      label: localize(
        { id: "Sprint desain ke peluncuran", en: "Design-to-launch sprint" },
        language,
      ),
    },
    {
      value: localize({ id: "AI-ready", en: "AI-ready" }, language),
      label: localize(
        {
          id: "Dirancang untuk automasi & chatbot",
          en: "Designed for automation & chat",
        },
        language,
      ),
    },
    {
      value: localize({ id: "1 alur", en: "1 flow" }, language),
      label: localize(
        {
          id: "Landing page, aplikasi, dan konten sinkron",
          en: "Landing, app, and content aligned",
        },
        language,
      ),
    },
  ];
  const heroPillars = [
    localize(
      { id: "Sistem yang terasa premium", en: "Systems that feel premium" },
      language,
    ),
    localize(
      { id: "Interaksi yang jelas", en: "Clear interactions" },
      language,
    ),
    localize(
      { id: "AI yang relevan untuk bisnis", en: "AI that fits the business" },
      language,
    ),
  ];

  return (
    <section className="relative overflow-hidden bg-[#f6f3ee] text-[#0a0a0a] dark:bg-slate-950 dark:text-slate-50">
      {/* Ambient gradients (liquid glass accent) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.16),_transparent_28%),radial-gradient(circle_at_85%_18%,_rgba(15,23,42,0.10),_transparent_24%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.22),_transparent_30%),radial-gradient(circle_at_88%_12%,_rgba(99,102,241,0.18),_transparent_26%),radial-gradient(circle_at_15%_85%,_rgba(34,211,238,0.14),_transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(10,10,10,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(10,10,10,0.045)_1px,transparent_1px)] bg-[size:88px_88px] opacity-100 dark:bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/70 to-transparent dark:from-slate-950/60" />

      <div className="pointer-events-none absolute left-0 top-24 h-px w-full bg-black/10 dark:bg-white/10" />

      <div className="relative z-10 mx-auto grid min-h-[100svh] w-full max-w-7xl items-center gap-12 px-4 pb-14 pt-24 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] lg:px-8 lg:pb-20 lg:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative min-w-0"
        >
          <div className="mb-6 flex items-center justify-between gap-4 border-b border-black/10 pb-5 dark:border-white/10">
            <div className="inline-flex min-w-0 items-center gap-4 rounded-full border border-black/10 bg-white/80 px-4 py-3 shadow-[0_12px_30px_rgba(17,17,17,0.06)] backdrop-blur-xl dark:border-white/15 dark:bg-white/[0.06] dark:shadow-[0_18px_45px_rgba(2,6,23,0.45)]">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-black/10 dark:bg-slate-900 dark:ring-white/15">
                <Image
                  src="/assets/images/logo-black-transparent.png"
                  alt="Paitonix"
                  width={56}
                  height={56}
                  priority
                  sizes="56px"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate text-[11px] font-extrabold uppercase tracking-[0.38em] text-sky-700 dark:text-cyan-300">
                  {localize(
                    { id: "Paitonix Labs", en: "Paitonix Labs" },
                    language,
                  )}
                </p>
                <p className="mt-1 text-sm text-black/70 dark:text-slate-200 sm:text-base">
                  {localize(
                    {
                      id: "Platform, produk, dan AI dalam satu arah yang tajam.",
                      en: "Platforms, products, and AI in one sharp direction.",
                    },
                    language,
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-7">
            {badgeText && (
              <div className="inline-flex max-w-full items-center gap-3 rounded-full border border-sky-300/70 bg-sky-100/80 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.34em] text-sky-800 backdrop-blur dark:border-cyan-400/30 dark:bg-cyan-400/15 dark:text-cyan-100">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-sky-600 dark:bg-cyan-300" />
                <span className="truncate">{badgeText}</span>
              </div>
            )}

            <div className="space-y-4">
              <p className="text-xs font-black uppercase tracking-[0.42em] text-black/55 dark:text-slate-300">
                {localize(
                  {
                    id: "Digital product studio untuk langkah besar berikutnya",
                    en: "Digital product studio for the next big move",
                  },
                  language,
                )}
              </p>

              <h1 className="max-w-5xl text-[clamp(3.25rem,10vw,7.8rem)] font-black uppercase leading-[0.9] tracking-[-0.07em] text-[#050505] dark:text-white">
                {titleLines.map((line, i) => (
                  <motion.span
                    key={i}
                    className="block"
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.16 + i * 0.1 }}
                  >
                    {line}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.34 }}
                className="max-w-2xl text-lg leading-8 text-black/70 dark:text-slate-300 sm:text-xl"
              >
                {subtitleText}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.5 }}
              className="flex flex-col items-start gap-4 sm:flex-row sm:items-center"
            >
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex w-full items-center justify-center rounded-full bg-[#0b0b0b] px-7 py-4 text-base font-extrabold uppercase tracking-[0.16em] text-[#f8f3e8] shadow-[0_18px_40px_rgba(15,23,42,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-black dark:bg-white dark:text-slate-950 dark:shadow-[0_18px_50px_rgba(34,211,238,0.25)] dark:hover:bg-slate-100 sm:w-auto"
              >
                {ctaText || startConversationText}
                <span className="ml-3">→</span>
              </button>
              <a
                href="#preview"
                className="inline-flex items-center gap-3 rounded-full border border-black/14 bg-white/70 px-5 py-3.5 text-sm font-bold uppercase tracking-[0.18em] text-black/75 backdrop-blur transition hover:border-black/28 hover:text-black dark:border-white/20 dark:bg-white/[0.06] dark:text-slate-200 dark:hover:border-white/40 dark:hover:text-white"
              >
                {localize(
                  { id: "Lihat preview slide", en: "View preview slides" },
                  language,
                )}
                <span>↓</span>
              </a>
            </motion.div>

            <div className="grid gap-3 sm:grid-cols-3">
              {heroMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-[1.8rem] border border-black/10 bg-white/72 p-5 backdrop-blur-xl dark:border-white/15 dark:bg-white/[0.06] dark:shadow-[0_20px_45px_rgba(2,6,23,0.4)]"
                >
                  <p className="text-3xl font-black uppercase tracking-[-0.05em] text-[#0a0a0a] dark:text-white">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-black/65 dark:text-slate-300">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-[42rem] min-w-0"
        >
          <div className="grid gap-4 sm:grid-rows-[minmax(0,1.2fr)_auto]">
            <div className="relative overflow-hidden rounded-[2.25rem] bg-[#111111] text-white shadow-[0_36px_90px_rgba(17,17,17,0.16)] dark:shadow-[0_36px_90px_rgba(0,0,0,0.45)]">
              <div className="absolute inset-0 overflow-hidden">
                {mounted && videoReady && !shouldReduceMotion && (
                  <video
                    key={isDark ? "dark" : "light"}
                    className={`h-full w-full object-cover transition-opacity duration-500 ${
                      isDark
                        ? "opacity-55 brightness-95 contrast-110"
                        : "opacity-70 brightness-95 contrast-110"
                    }`}
                    src={
                      isDark
                        ? "/assets/videos/video-section.mp4"
                        : "/assets/videos/video-hero-white.mp4"
                    }
                    preload="metadata"
                    autoPlay
                    muted
                    loop
                    playsInline
                    disablePictureInPicture
                  />
                )}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,7,0.05)_0%,rgba(7,7,7,0.24)_38%,rgba(7,7,7,0.94)_100%)] dark:bg-[linear-gradient(180deg,rgba(7,7,7,0.12)_0%,rgba(7,7,7,0.36)_38%,rgba(7,7,7,0.96)_100%)]" />
              </div>

              <div className="relative flex min-h-[30rem] flex-col justify-between p-6 sm:min-h-[37rem] sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="rounded-full bg-white/92 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.26em] text-black">
                    {localize({ id: "Featured", en: "Featured" }, language)}
                  </div>
                  <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-white/85 backdrop-blur">
                    {localize(
                      { id: "Paitonix Mode", en: "Paitonix Mode" },
                      language,
                    )}
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="flex flex-wrap gap-2">
                    {heroPillars.map((pillar) => (
                      <span
                        key={pillar}
                        className="rounded-full border border-white/18 bg-white/8 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/82 backdrop-blur"
                      >
                        {pillar}
                      </span>
                    ))}
                  </div>

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/72">
                      {localize(
                        {
                          id: "Sistem premium untuk web, app, dan AI",
                          en: "Premium systems for web, app, and AI",
                        },
                        language,
                      )}
                    </p>
                    <h2 className="mt-3 max-w-lg text-4xl font-black uppercase leading-[0.94] tracking-[-0.06em] text-white sm:text-5xl">
                      {localize(
                        {
                          id: "Gerak cepat. Tampilan tajam.",
                          en: "Move fast. Look sharp.",
                        },
                        language,
                      )}
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="relative z-10 inline-flex min-w-[120px] items-center justify-center gap-2 rounded-full !bg-white px-7 py-3.5 text-base font-extrabold !text-black shadow-[0_12px_32px_rgba(0,0,0,0.35)] ring-1 ring-black/10 transition hover:scale-[1.02] hover:!bg-slate-100 dark:!bg-cyan-400 dark:!text-slate-950 dark:ring-cyan-300/40 dark:hover:!bg-cyan-300 dark:shadow-[0_12px_32px_rgba(34,211,238,0.45)]"
                  >
                    <span className="font-extrabold tracking-wide">
                      {localize({ id: "Mulai", en: "Start" }, language)}
                    </span>
                    <span aria-hidden>→</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[0.82fr_1.18fr]">
              <div className="rounded-[2rem] border border-black/10 bg-white/80 p-5 backdrop-blur-xl dark:border-white/15 dark:bg-white/[0.06] dark:shadow-[0_24px_60px_rgba(2,6,23,0.45)]">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.34em] text-black/55 dark:text-slate-300">
                  {localize({ id: "Framework", en: "Framework" }, language)}
                </p>
                <div className="mt-4 space-y-3">
                  {heroPillars.map((pillar, index) => (
                    <motion.div
                      key={pillar}
                      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: shouldReduceMotion ? 0 : 0.45,
                        delay: shouldReduceMotion ? 0 : 0.18 + index * 0.08,
                      }}
                      className="rounded-[1.25rem] bg-black px-4 py-4 text-sm font-semibold text-white dark:bg-white/10 dark:text-white dark:ring-1 dark:ring-white/15 dark:backdrop-blur"
                    >
                      {pillar}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white/80 p-5 backdrop-blur-xl dark:border-white/15 dark:bg-white/[0.06] dark:shadow-[0_24px_60px_rgba(2,6,23,0.45)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.34em] text-sky-700 dark:text-cyan-300">
                      Paitonix Chat
                    </p>
                    <p className="mt-2 text-sm text-black/65 dark:text-slate-300">
                      {localize(
                        {
                          id: "Percakapan AI untuk mengecek arah produk lebih cepat.",
                          en: "AI conversation to pressure-test the product direction faster.",
                        },
                        language,
                      )}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/70 bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    {localize({ id: "Aktif", en: "Live" }, language)}
                  </div>
                </div>

                <div
                  ref={heroChatContainerRef}
                  className="mt-5 flex max-h-[260px] flex-col gap-3 overflow-y-auto pr-1 sm:max-h-[290px]"
                >
                  {heroChatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.sender === "customer" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[84%] rounded-[1.4rem] px-4 py-3 text-sm leading-relaxed shadow-sm ${
                          message.sender === "customer"
                            ? isDark
                              ? "bg-slate-800/80 text-slate-50 ring-1 ring-white/10 backdrop-blur"
                              : "bg-black/6 text-black"
                            : isDark
                              ? "bg-cyan-400/15 text-cyan-50 ring-1 ring-cyan-300/30 backdrop-blur"
                              : "bg-black text-white"
                        } ${message.sender === "customer" ? "rounded-br-md" : "rounded-tl-md"}`}
                      >
                        {language === "id" ? message.text : message.textEn}
                      </div>
                    </div>
                  ))}
                  {heroChatStep < chatSamples.length && (
                    <div
                      className={`inline-flex items-center gap-2 rounded-[1.5rem] px-4 py-3 text-sm ${
                        isDark
                          ? "bg-white/10 text-slate-200"
                          : "bg-black/5 text-black/55"
                      }`}
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

                <button
                  type="button"
                  onClick={() => {
                    const section = document.getElementById("chatbot");
                    section?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                    window.setTimeout(() => {
                      const input = document.getElementById(
                        "onix-chat-input",
                      ) as HTMLInputElement | null;
                      input?.focus({ preventScroll: true });
                    }, 650);
                  }}
                  aria-label={localize(
                    {
                      id: "Buka OniX Assistant",
                      en: "Open OniX Assistant",
                    },
                    language,
                  )}
                  className={`group mt-5 w-full rounded-[1.4rem] border px-4 py-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 ${
                    isDark
                      ? "border-white/15 bg-slate-900/60 text-slate-200 backdrop-blur hover:border-cyan-300/40 hover:bg-slate-900/80"
                      : "border-black/10 bg-black/[0.03] text-black/72 hover:border-sky-500/40 hover:bg-black/[0.05]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm">
                      {localize(
                        {
                          id: "Tanyakan ide fitur...",
                          en: "Ask feature ideas...",
                        },
                        language,
                      )}
                    </span>
                    <span className="pointer-events-none rounded-full bg-sky-600 px-4 py-2 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-sm transition-colors group-hover:bg-sky-700 dark:bg-cyan-400 dark:text-slate-950 dark:group-hover:bg-cyan-300 dark:shadow-[0_8px_24px_rgba(34,211,238,0.45)]">
                      {localize({ id: "Kirim", en: "Send" }, language)}
                    </span>
                  </div>
                </button>

                {showSayHi && (
                  <motion.img
                    src="/assets/images/say-hi-transparent.gif"
                    alt="say hi gif"
                    className="pointer-events-none absolute -bottom-10 right-0 w-32 opacity-15 dark:opacity-10"
                    animate={shouldReduceMotion ? undefined : { y: [0, -6, 0] }}
                    transition={{
                      duration: 4.5,
                      repeat: shouldReduceMotion ? 0 : Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </motion.div>
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
                              {language === "id"
                                ? message.text
                                : (message as any).textEn || message.text}
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
                        {localize({ id: "Rp 7.000.000", en: "$700" }, language)}
                      </p>
                      <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                        {localize(
                          { id: "~ USD $47", en: "~ IDR 11.2M" },
                          language,
                        )}
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
                          { id: "Rp 20.000.000", en: "$1,900" },
                          language,
                        )}
                      </p>
                      <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                        {localize(
                          { id: "~ USD $130", en: "~ IDR 30.4M" },
                          language,
                        )}
                      </p>
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {localize(
                          {
                            id: "MVP standar dengan UI lengkap & animasi.",
                            en: "Standard MVP with complete UI & motion.",
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
                      <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                        {localize(
                          { id: "Hubungi kami", en: "Contact us" },
                          language,
                        )}
                      </p>
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {localize(
                          {
                            id: "Solusi lengkap untuk produk skala besar & skalabilitas.",
                            en: "Complete solution for large-scale & scalable products.",
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
