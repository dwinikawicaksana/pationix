"use client";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";

const testimonials = [
  {
    quote: {
      id: "Paitonix membuat proses ide menjadi presentasi produk yang terasa premium dan siap dipresentasikan ke investor.",
      en: "Paitonix turned our idea into a premium product presentation ready for investors.",
    },
    name: "Mira Santoso",
    role: "Founder, Tech Spark",
  },
  {
    quote: {
      id: "Desain prototype mereka sangat halus, detail, dan memberikan kepercayaan diri kepada tim kami untuk membangun lebih cepat.",
      en: "Their prototype design is smooth, detailed, and gave our team confidence to build faster.",
    },
    name: "Rafi Pratama",
    role: "Head of Product, BloomID",
  },
  {
    quote: {
      id: "UI katalog produk mereka terasa seperti Apple — bersih, elegan, dan mudah dipahami oleh semua orang.",
      en: "Their product catalogue UI feels like Apple — clean, elegant, and easy for everyone to understand.",
    },
    name: "Nadya Kusuma",
    role: "Marketing Lead, Wave Labs",
  },
];

const uiText = {
  label: { id: "Testimonial", en: "Testimonials" },
  heading: {
    id: "Mereka melihat dan merasakan kualitas produk secara langsung.",
    en: "They see and feel product quality firsthand.",
  },
  description: {
    id: "Cerita dari pengguna yang sudah merasakan pengalaman desain dan prototipe Paitonix.",
    en: "Stories from users who experienced Paitonix's design and prototypes.",
  },
};

export default function Testimonials() {
  const { language } = useLanguage();

  return (
    <section
      id="testimonials"
      className="py-24 lg:py-32 bg-slate-100 dark:bg-zinc-900/50 text-slate-950 dark:text-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="inline-flex rounded-full bg-slate-950 dark:bg-sky-500/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-300 dark:text-sky-300">
            {localize(uiText.label, language)}
          </span>
          <h2 className="mt-6 text-4xl sm:text-5xl font-black tracking-tight text-slate-950 dark:text-white">
            {localize(uiText.heading, language)}
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-gray-300 leading-relaxed">
            {localize(uiText.description, language)}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="rounded-[2rem] border border-slate-200 dark:border-zinc-700/50 bg-white dark:bg-zinc-800/60 p-8 shadow-xl shadow-slate-200/70 dark:shadow-black/30 backdrop-blur"
            >
              <p className="text-base leading-relaxed text-slate-700 dark:text-gray-200">
                "{localize(item.quote, language)}"
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-950 dark:bg-sky-600 text-white text-lg font-black">
                  {item.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </div>
                <div>
                  <p className="font-semibold text-slate-950 dark:text-white">
                    {item.name}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-gray-400">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
