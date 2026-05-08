"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";

const slides = [
  {
    title: { id: "Dashboard launch-ready", en: "Dashboard launch-ready" },
    description: {
      id: "Lihat data inti, pelacakan pengguna, dan pertumbuhan produk dalam satu tampilan yang elegan.",
      en: "See key data, user tracking, and product growth in one elegant view.",
    },
    image: "/assets/images/prev-1.png",
    accent: "from-sky-500 via-cyan-400 to-slate-600",
    modalTitle: {
      id: "Dashboard Peluncuran",
      en: "Launch-ready Dashboard",
    },
    modalSubtitle: {
      id: "Panel kontrol yang menampilkan metrik utama, perilaku pengguna, dan momentum produk secara ringkas.",
      en: "A control panel showing core metrics, user behavior, and product momentum in a concise view.",
    },
    modalPoints: [
      {
        id: "Pertumbuhan pengguna, retensi, dan funnel semua tersedia dalam satu tampilan.",
        en: "Growth, retention, and funnel insights are all available in one view.",
      },
      {
        id: "Ringkas data real-time untuk keputusan produk cepat.",
        en: "Condensed real-time data for faster product decisions.",
      },
      {
        id: "Tautan tindakan jelas membantu tim bergerak dari ide ke eksekusi.",
        en: "Clear action links help teams move from idea to execution.",
      },
    ],
    modalTag: { id: "Analytics", en: "Analytics" },
  },
  {
    title: { id: "Flow produk yang simpel", en: "Simple product flow" },
    description: {
      id: "Ubah ide menjadi workflow yang jelas dengan antarmuka yang ramah dan mudah dioperasikan.",
      en: "Turn ideas into a clear workflow with a friendly, easy-to-use interface.",
    },
    image: "/assets/images/prev-2.png",
    accent: "from-slate-900 via-slate-700 to-slate-500",
    modalTitle: { id: "Alur Produk Sederhana", en: "Simple Product Flow" },
    modalSubtitle: {
      id: "Langkah desain yang bersih dengan fokus pengguna dan proses yang mudah diikuti.",
      en: "A clean design flow focused on users and easy-to-follow progression.",
    },
    modalPoints: [
      {
        id: "Visualisasi setiap langkah membantu pengguna memahami tujuan selanjutnya.",
        en: "Step-by-step visuals help users understand what comes next.",
      },
      {
        id: "Tombol dan status disajikan dengan jelas agar tidak membingungkan.",
        en: "Buttons and status are presented clearly to avoid confusion.",
      },
      {
        id: "Antarmuka ringkas mempercepat alur kerja dan pengambilan keputusan.",
        en: "A compact interface speeds up workflow and decision-making.",
      },
    ],
    modalTag: { id: "Workflow", en: "Workflow" },
  },
  {
    title: { id: "AI chat & insight", en: "AI chat & insight" },
    description: {
      id: "Sapa pengguna dengan asisten cerdas yang mendukung interaksi cepat dan keputusan lebih tajam.",
      en: "Greet users with an intelligent assistant that supports fast interactions and sharper decisions.",
    },
    image: "/assets/images/prev-3.png",
    accent: "from-sky-600 via-cyan-400 to-slate-900",
    modalTitle: { id: "AI Chat & Insight", en: "AI Chat & Insight" },
    modalSubtitle: {
      id: "Dialog cerdas yang menyajikan wawasan dan rekomendasi dalam kontekstual realtime.",
      en: "Smart dialogue that delivers insights and recommendations in real-time context.",
    },
    modalPoints: [
      {
        id: "Asisten percakapan membantu pengguna menyelesaikan tugas dengan cepat.",
        en: "A conversational assistant helps users complete tasks quickly.",
      },
      {
        id: "Wawasan penting diprioritaskan untuk keputusan produk yang tepat.",
        en: "Key insights are prioritized for sharper product decisions.",
      },
      {
        id: "Interaksi data-driven membuat pengalaman terasa cerdas dan responsif.",
        en: "Data-driven interactions make the experience feel intelligent and responsive.",
      },
    ],
    modalTag: { id: "AI", en: "AI" },
  },
];

const uiText = {
  previewSlide: { id: "Preview Slide", en: "Preview Slides" },
  headline: {
    id: "Tampilan produk yang membuat ide Anda terasa nyata.",
    en: "Product views that make your ideas feel real.",
  },
  subheading: {
    id: "Setiap kartu hadir sebagai jendela kecil menuju pengalaman aplikasi yang cepat, cerdas, dan berkelas.",
    en: "Each card appears as a small window into a fast, smart, and classy app experience.",
  },
  explore: { id: "Explore", en: "Explore" },
};

export default function PreviewSlides() {
  const { language } = useLanguage();
  const [selectedSlide, setSelectedSlide] = useState<number | null>(null);
  const [isDark, setIsDark] = useState(false);

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

    return () => observer.disconnect();
  }, []);

  const previewModalClass = isDark
    ? "relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-slate-700/65 bg-slate-950/95 shadow-2xl shadow-slate-950/40 backdrop-blur-2xl"
    : "relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-slate-200/65 bg-white/95 shadow-2xl shadow-slate-200/30 backdrop-blur-2xl";

  const previewPointClass = isDark
    ? "rounded-[1.5rem] border border-slate-700/70 bg-slate-900/90 p-4 text-sm text-slate-200 shadow-sm shadow-slate-950/5"
    : "rounded-[1.5rem] border border-slate-200/80 bg-white/90 p-4 text-sm text-slate-700 shadow-sm shadow-slate-200/5";

  const previewFeatureClass = isDark
    ? "relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/90 p-6 text-white shadow-2xl shadow-slate-950/40"
    : "relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-slate-100/95 p-6 text-slate-950 shadow-2xl shadow-slate-200/40";

  const previewFeatureText = isDark ? "text-slate-100" : "text-slate-700";
  const previewFeatureCaption = isDark ? "text-sky-200" : "text-slate-500";

  return (
    <section
      id="preview"
      className="relative overflow-hidden py-20 sm:py-24 bg-white dark:bg-slate-950 transition-colors"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hidden lg:block">
          {/* Light mode orbs */}
          <motion.div
            className="absolute top-40 left-1/4 w-96 h-96 opacity-100 dark:opacity-0 bg-sky-400/20 rounded-full blur-3xl"
            animate={{
              y: [0, 40, 0],
              x: [0, 20, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-40 right-1/3 w-96 h-96 opacity-100 dark:opacity-0 bg-pink-400/15 rounded-full blur-3xl"
            animate={{
              y: [0, -30, 0],
              x: [0, -30, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Dark mode orbs */}
          <motion.div
            className="absolute top-40 left-1/4 w-96 h-96 opacity-0 dark:opacity-100 bg-sky-500/15 rounded-full blur-3xl"
            animate={{
              y: [0, 40, 0],
              x: [0, 20, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-40 right-1/3 w-96 h-96 opacity-0 dark:opacity-100 bg-cyan-500/12 rounded-full blur-3xl"
            animate={{
              y: [0, -30, 0],
              x: [0, -30, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-sky-100/50 dark:from-sky-500/10 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/95 dark:bg-sky-500/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-200 dark:text-sky-300 shadow-lg shadow-slate-900/10 dark:shadow-black/20">
            {localize(uiText.previewSlide, language)}
          </span>
          <h2 className="mt-6 text-4xl sm:text-5xl font-black tracking-tight text-slate-950 dark:text-white">
            {localize(uiText.headline, language)}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-500 dark:text-gray-300 leading-relaxed">
            {localize(uiText.subheading, language)}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {slides.map((slide, index) => (
            <motion.button
              key={localize(slide.title, language)}
              type="button"
              onClick={() => setSelectedSlide(index)}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.12 }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="group overflow-hidden rounded-[2rem] border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/60 shadow-2xl shadow-slate-200/50 dark:shadow-black/30 transition hover:-translate-y-1 hover:shadow-2xl backdrop-blur-lg text-left"
            >
              <div className="relative overflow-hidden bg-slate-950/5">
                <img
                  src={slide.image}
                  alt={localize(slide.title, language)}
                  className="h-64 w-full object-cover"
                />
                <div
                  className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-br ${slide.accent} opacity-60`}
                />
              </div>
              <div className="relative p-8">
                <span className="inline-flex rounded-full bg-slate-100 dark:bg-sky-500/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-700 dark:text-sky-300 shadow-sm dark:shadow-black/10">
                  {localize({ id: "Preview", en: "Preview" }, language)}{" "}
                  {index + 1}
                </span>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                  {localize(slide.title, language)}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-gray-300">
                  {localize(slide.description, language)}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {localize(
                      { id: "Explore feature", en: "Explore feature" },
                      language,
                    )}
                  </span>
                  <div className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white dark:shadow-black/20">
                    {localize(
                      { id: "Lihat detail", en: "View details" },
                      language,
                    )}
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedSlide !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto bg-slate-950/80 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`${previewModalClass} w-full max-w-[min(100vw-1.5rem,56rem)] max-h-[calc(100vh-2rem)] overflow-y-auto`}
              initial={{ y: 40, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <button
                type="button"
                onClick={() => setSelectedSlide(null)}
                className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg shadow-slate-900/10 transition hover:bg-slate-100 dark:bg-slate-900/90 dark:text-slate-100 dark:hover:bg-slate-800"
                aria-label={localize({ id: "Tutup", en: "Close" }, language)}
              >
                ×
              </button>

              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] p-5 sm:p-6 lg:p-10">
                <div className="space-y-5">
                  <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.32em] text-cyan-200 shadow-sm shadow-cyan-500/10">
                    {localize(slides[selectedSlide].modalTag, language)}
                  </span>
                  <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                    {localize(slides[selectedSlide].modalTitle, language)}
                  </h2>
                  <p className="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
                    {localize(slides[selectedSlide].modalSubtitle, language)}
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {slides[selectedSlide].modalPoints.map((point, index) => (
                      <div key={index} className={previewPointClass}>
                        {localize(point, language)}
                      </div>
                    ))}
                  </div>
                </div>

                <div className={previewFeatureClass}>
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-sky-500/10 to-transparent opacity-70" />
                  <div className="relative space-y-5">
                    <p
                      className={`text-sm uppercase tracking-[0.3em] ${previewFeatureCaption}`}
                    >
                      {localize(
                        { id: "Fitur utama", en: "Key features" },
                        language,
                      )}
                    </p>
                    <div
                      className={`space-y-4 text-sm leading-relaxed ${previewFeatureText}`}
                    >
                      <p>
                        {localize(
                          {
                            id: "Ukur dampak dengan data yang tampil jelas, tanpa kebisingan.",
                            en: "Measure impact with clear, noise-free data.",
                          },
                          language,
                        )}
                      </p>
                      <p>
                        {localize(
                          {
                            id: "Desain futuristik yang terasa ringan dan canggih.",
                            en: "Futuristic design that feels light and sophisticated.",
                          },
                          language,
                        )}
                      </p>
                      <p>
                        {localize(
                          {
                            id: "Interaksi lancar di setiap langkah pengguna.",
                            en: "Seamless interactions at every user step.",
                          },
                          language,
                        )}
                      </p>
                    </div>
                    <div
                      className={`rounded-[1.75rem] border ${isDark ? "border-white/10 bg-white/10 text-slate-100" : "border-slate-200/80 bg-white text-slate-950"} p-4 text-sm`}
                    >
                      <p
                        className={`${isDark ? "font-semibold text-slate-100" : "font-semibold text-slate-950"}`}
                      >
                        {localize(
                          {
                            id: "Ingin paket khusus?",
                            en: "Want a custom package?",
                          },
                          language,
                        )}
                      </p>
                      <p
                        className={`${isDark ? "mt-2 text-slate-300" : "mt-2 text-slate-700"}`}
                      >
                        {localize(
                          {
                            id: "Katakan saja kebutuhanmu, kami siap bantu.",
                            en: "Tell us your needs and we'll help build it.",
                          },
                          language,
                        )}
                      </p>
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
