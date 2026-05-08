"use client";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";

export default function PhilosophyCard() {
  const { language } = useLanguage();

  const quote = localize(
    {
      id: "Dari aliran energi Jawa dan Bali, lahirlah Paitonix — menghubungkan kekuatan, inovasi, dan harmoni dalam satu visi.",
      en: "From the energy currents of Java and Bali, Paitonix was born — connecting strength, innovation, and harmony in a single vision.",
    },
    language,
  );

  const label = localize(
    { id: "Filosofi Kami", en: "Our Philosophy" },
    language,
  );

  const origin = localize(
    { id: "Jawa · Bali · Indonesia", en: "Java · Bali · Indonesia" },
    language,
  );

  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 px-6">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/assets/videos/video-section.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Background ambiance */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dark overlay to ensure readability over video */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-900/75 to-slate-950/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/40" />

        {/* Animated orb left – light */}
        <motion.div
          className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-sky-300/20 dark:bg-sky-500/10 blur-3xl opacity-100"
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Animated orb right – light */}
        <motion.div
          className="absolute -right-32 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-indigo-300/20 dark:bg-purple-500/10 blur-3xl opacity-100"
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        {/* Center glow */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] rounded-full bg-cyan-400/10 dark:bg-cyan-500/8 blur-3xl"
          animate={{ scaleX: [1, 1.1, 1], scaleY: [1, 0.9, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-[2.5rem] overflow-hidden
            border border-white/10
            bg-white/8
            shadow-[0_8px_48px_rgba(14,165,233,0.15),0_0_0_1px_rgba(255,255,255,0.06)]
            backdrop-blur-2xl"
        >
          {/* Top accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-sky-400 via-cyan-400 to-indigo-400 dark:from-sky-500 dark:via-cyan-400 dark:to-purple-500" />

          <div className="px-8 py-12 sm:px-14 sm:py-16">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="inline-block w-8 h-[2px] rounded-full bg-gradient-to-r from-sky-400 to-cyan-400" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-sky-300">
                {label}
              </span>
            </motion.div>

            {/* Decorative opening quote */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[6rem] leading-none font-serif text-white/20 select-none -mt-4 mb-2"
              aria-hidden="true"
            >
              "
            </motion.div>

            {/* Quote text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-snug text-white tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {quote}
            </motion.p>

            {/* Divider + origin */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="flex-1 h-px bg-gradient-to-r from-sky-400/50 via-cyan-400/30 to-transparent" />
              <div className="flex items-center gap-3">
                <img
                  src="/assets/images/logo-2.png"
                  alt="Paitonix"
                  className="h-8 w-8 rounded-xl object-cover shadow-md shadow-sky-500/20"
                />
                <div>
                  <p className="text-xs font-bold text-white tracking-wide">
                    Paitonix
                  </p>
                  <p className="text-[11px] text-sky-400 tracking-widest uppercase">
                    {origin}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Subtle inner glow bottom */}
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-sky-50/60 to-transparent dark:from-sky-950/20 dark:to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
