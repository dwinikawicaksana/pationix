"use client";
import { motion } from "framer-motion";
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
  },
  {
    title: { id: "Flow produk yang simpel", en: "Simple product flow" },
    description: {
      id: "Ubah ide menjadi workflow yang jelas dengan antarmuka yang ramah dan mudah dioperasikan.",
      en: "Turn ideas into a clear workflow with a friendly, easy-to-use interface.",
    },
    image: "/assets/images/prev-2.png",
    accent: "from-slate-900 via-slate-700 to-slate-500",
  },
  {
    title: { id: "AI chat & insight", en: "AI chat & insight" },
    description: {
      id: "Sapa pengguna dengan asisten cerdas yang mendukung interaksi cepat dan keputusan lebih tajam.",
      en: "Greet users with an intelligent assistant that supports fast interactions and sharper decisions.",
    },
    image: "/assets/images/prev-3.png",
    accent: "from-sky-600 via-cyan-400 to-slate-900",
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

  return (
    <section
      id="preview"
      className="relative overflow-hidden py-20 sm:py-24 bg-white dark:bg-zinc-950 transition-colors"
    >
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
            <motion.div
              key={localize(slide.title, language)}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.12 }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="group overflow-hidden rounded-[2rem] border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/60 shadow-2xl shadow-slate-200/50 dark:shadow-black/30 transition hover:-translate-y-1 hover:shadow-2xl backdrop-blur"
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
                <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-slate-900 dark:text-white">
                  <span>
                    {localize(
                      { id: "Explore feature", en: "Explore feature" },
                      language,
                    )}
                  </span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 dark:bg-sky-600 text-white">
                    →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
