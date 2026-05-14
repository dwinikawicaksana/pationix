"use client";
import { AnimatePresence, motion } from "framer-motion";
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
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.14),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.1),_transparent_24%),linear-gradient(180deg,_#f8fcff_0%,_#eef6ff_42%,_#ffffff_100%)] text-slate-950 dark:bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.16),_transparent_24%),linear-gradient(180deg,_#020617_0%,_#0f172a_48%,_#020617_100%)] dark:text-white">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.48)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.48)_1px,transparent_1px)] bg-[size:80px_80px] opacity-30 dark:bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] dark:opacity-100" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-white/70 dark:from-slate-950/60 dark:via-transparent dark:to-slate-950/70" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl dark:bg-cyan-500/20"
          animate={
            shouldReduceMotion || isMobile
              ? { opacity: 0.2 }
              : { x: [0, 24, 0], y: [0, -16, 0] }
          }
          transition={{
            duration: 12,
            repeat: shouldReduceMotion || isMobile ? 0 : Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute right-0 top-0 h-[26rem] w-[26rem] rounded-full bg-blue-200/30 blur-3xl dark:bg-sky-500/15"
          animate={
            shouldReduceMotion || isMobile
              ? { opacity: 0.16 }
              : { x: [0, -20, 0], y: [0, 28, 0] }
          }
          transition={{
            duration: 14,
            repeat: shouldReduceMotion || isMobile ? 0 : Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-cyan-200/40 blur-3xl dark:bg-cyan-400/10"
          animate={
            shouldReduceMotion || isMobile
              ? { opacity: 0.14 }
              : { y: [0, -24, 0] }
          }
          transition={{
            duration: 10,
            repeat: shouldReduceMotion || isMobile ? 0 : Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center px-4">
        <span className="mt-8 select-none text-center text-[clamp(3.2rem,16vw,10rem)] font-black uppercase tracking-[0.32em] text-slate-900/[0.045] dark:text-white/[0.04]">
          paitonix
        </span>
      </div>

      <div className="relative z-10 mx-auto grid w-full min-h-[100svh] max-w-7xl items-center gap-10 px-4 pb-14 pt-24 sm:px-6 sm:pt-28 lg:gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:px-8 lg:pb-20 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative min-w-0 space-y-10"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-sky-200/80 bg-white/80 px-3 py-3 shadow-[0_18px_45px_rgba(148,163,184,0.12)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/65 dark:shadow-[0_20px_60px_rgba(2,6,23,0.4)]">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <img
                src="/assets/images/logo-black-transparent.png"
                alt="Paitonix"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="pr-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-sky-700 dark:text-cyan-300">
                {localize(
                  { id: "Paitonix Labs", en: "Paitonix Labs" },
                  language,
                )}
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {localize(
                  {
                    id: "Platform, produk, dan AI dalam satu arahan yang rapi.",
                    en: "Platforms, products, and AI in one clean direction.",
                  },
                  language,
                )}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {badgeText && (
              <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-sky-200/70 bg-sky-50/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-sky-700 shadow-sm dark:border-cyan-400/20 dark:bg-cyan-500/10 dark:text-cyan-200">
                <span className="inline-flex h-2 w-2 rounded-full bg-sky-500 dark:bg-cyan-300" />
                <span className="truncate">{badgeText}</span>
              </div>
            )}

            <h1 className="max-w-4xl text-4xl font-black tracking-[-0.05em] text-slate-950 dark:text-white sm:text-5xl lg:text-7xl xl:text-[5.25rem] xl:leading-[0.94]">
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

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg"
            >
              {subtitleText}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.55 }}
            className="flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-3.5 text-base font-semibold text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_50px_rgba(15,23,42,0.24)] dark:border dark:border-cyan-400/20 dark:bg-white dark:text-slate-950 dark:shadow-[0_20px_50px_rgba(34,211,238,0.16)] sm:w-auto"
            >
              {ctaText || startConversationText}
              <span className="ml-2">→</span>
            </button>
            <a
              href="#preview"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white/75 px-5 py-3 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-xl transition hover:border-slate-400 hover:text-slate-950 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-white"
            >
              {localize(
                { id: "Lihat preview slide ↓", en: "View preview slides ↓" },
                language,
              )}
            </a>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-3">
            {heroMetrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-[1.8rem] border border-white/70 bg-white/80 p-5 shadow-[0_20px_45px_rgba(148,163,184,0.14)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/65 dark:shadow-[0_20px_60px_rgba(2,6,23,0.32)]"
              >
                <p className="text-2xl font-black tracking-[-0.04em] text-slate-950 dark:text-white">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-[40rem] min-w-0"
        >
          <div className="absolute inset-x-10 top-8 h-48 rounded-full bg-sky-300/25 blur-3xl dark:bg-cyan-500/15" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/75 p-4 shadow-[0_35px_90px_rgba(148,163,184,0.18)] backdrop-blur-2xl dark:border-slate-800/80 dark:bg-slate-950/60 dark:shadow-[0_35px_100px_rgba(2,6,23,0.5)] sm:p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.14),_transparent_32%)] dark:bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.16),_transparent_28%)]" />
            <div className="relative space-y-5">
              <div className="flex items-center justify-between rounded-[1.5rem] border border-slate-200/80 bg-white/85 px-4 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-600 dark:text-cyan-300">
                    {localize(
                      { id: "Studio preview", en: "Studio preview" },
                      language,
                    )}
                  </p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    {localize(
                      {
                        id: "Arah produk, sistem, dan AI dalam satu hero yang lebih tenang.",
                        en: "Product, system, and AI direction in one calmer hero.",
                      },
                      language,
                    )}
                  </p>
                </div>
                <div className="grid h-12 w-12 place-items-center overflow-hidden rounded-2xl border border-sky-100 bg-slate-950 dark:border-slate-700 dark:bg-slate-900">
                  <img
                    src="/assets/images/ai-assistant.png"
                    alt="AI assistant"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
                <div className="rounded-[1.75rem] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(241,245,249,0.82))] p-5 dark:border-slate-800 dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.95),rgba(2,6,23,0.82))]">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                    {localize(
                      { id: "Kerangka kerja", en: "Framework" },
                      language,
                    )}
                  </p>
                  <div className="mt-5 space-y-3">
                    {heroPillars.map((pillar, index) => (
                      <motion.div
                        key={pillar}
                        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.45,
                          delay: shouldReduceMotion ? 0 : 0.18 + index * 0.08,
                        }}
                        className="rounded-[1.35rem] border border-slate-200/70 bg-white/90 px-4 py-4 text-sm text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200"
                      >
                        <span className="mr-3 inline-flex h-2.5 w-2.5 rounded-full bg-sky-500 dark:bg-cyan-300" />
                        {pillar}
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-[1.4rem] border border-slate-200/80 bg-slate-950 px-4 py-4 text-white shadow-[0_16px_35px_rgba(15,23,42,0.18)] dark:border-cyan-400/10 dark:bg-[linear-gradient(180deg,rgba(8,15,32,0.98),rgba(6,12,24,0.92))] dark:text-slate-100 dark:shadow-[0_18px_45px_rgba(0,0,0,0.38)]">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/55 dark:text-cyan-100/55">
                      {localize({ id: "Hasil", en: "Outcome" }, language)}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/90 dark:text-slate-100/92">
                      {localize(
                        {
                          id: "Landing page lebih fokus, lebih premium, dan tetap mudah dibaca di kedua mode.",
                          en: "A hero that feels more premium, more focused, and readable in both modes.",
                        },
                        language,
                      )}
                    </p>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/92 p-5 dark:border-slate-800 dark:bg-slate-950/88">
                  <div className="absolute inset-0 overflow-hidden">
                    {mounted && !shouldReduceMotion && (
                      <video
                        className={`h-full w-full object-cover opacity-20 ${
                          isDark
                            ? "brightness-110 contrast-110 saturate-110"
                            : "brightness-95 contrast-105 saturate-95"
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
                    <div className="absolute inset-0 bg-gradient-to-b from-white/78 via-white/84 to-white/95 dark:from-slate-950/65 dark:via-slate-950/74 dark:to-slate-950/94" />
                  </div>

                  <div className="relative">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-sky-500/80">
                          Paitonix Chat
                        </p>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
                          {localize(
                            {
                              id: "Percakapan AI untuk eksplorasi kebutuhan produk.",
                              en: "AI conversation for product discovery.",
                            },
                            language,
                          )}
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        {localize({ id: "Aktif", en: "Live" }, language)}
                      </div>
                    </div>

                    <div
                      ref={heroChatContainerRef}
                      className="mt-6 flex max-h-[260px] flex-col gap-3 overflow-y-auto pr-1 sm:max-h-[320px]"
                    >
                      {heroChatMessages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${message.sender === "customer" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[84%] rounded-[1.6rem] px-4 py-3 text-sm leading-relaxed shadow-sm ${
                              message.sender === "customer"
                                ? isDark
                                  ? "bg-slate-800 text-slate-100"
                                  : "bg-slate-100 text-slate-950"
                                : isDark
                                  ? "bg-cyan-500/12 text-slate-100 ring-1 ring-cyan-400/10"
                                  : "bg-slate-950 text-white"
                            } ${message.sender === "customer" ? "rounded-br-md" : "rounded-tl-md"}`}
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
                      className={`mt-5 rounded-[1.5rem] border ${isDark ? "border-white/10 bg-slate-900/80 text-slate-300" : "border-slate-200/80 bg-slate-50 text-slate-700"} px-4 py-4`}
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
                        <button className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-sky-500/20 dark:bg-cyan-500">
                          {localize({ id: "Kirim", en: "Send" }, language)}
                        </button>
                      </div>
                    </div>

                    {showSayHi && (
                      <motion.img
                        src="/assets/images/say-hi-transparent.gif"
                        alt="say hi gif"
                        className="pointer-events-none absolute -bottom-10 right-0 w-36 opacity-20 dark:opacity-15"
                        animate={
                          shouldReduceMotion ? undefined : { y: [0, -6, 0] }
                        }
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
