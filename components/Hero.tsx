"use client";
import { motion } from "framer-motion";
import { HeroData } from "@/types/landing";

;

export default function Hero({ data }: { data: HeroData }) {
  const titleLines = data.title.split("\n");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-16">
      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-zinc-200/40 dark:bg-zinc-800/20 blur-[120px]" />
        <div className="absolute bottom-0 right-[-10%] w-[400px] h-[400px] rounded-full bg-zinc-100/60 dark:bg-zinc-900/40 blur-[80px]" />
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.035] dark:opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, #52525b 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-5xl w-full text-center">
        {/* Badge */}
        {data.badge && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-10 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 tracking-[0.18em] uppercase">
              {data.badge}
            </span>
          </motion.div>
        )}

        {/* Title — each line staggers in */}
        <h1
          className="text-[clamp(3.5rem,11vw,9.5rem)] font-black leading-[0.88] tracking-tighter text-zinc-900 dark:text-zinc-50 mb-8"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {titleLines.map((line, i) => (
            <motion.span
              key={i}
              className="block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 + i * 0.12 }}
            >
              {i === 1 ? (
                <span className="italic text-zinc-500 dark:text-zinc-400">
                  {line}
                </span>
              ) : (
                line
              )}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.58 }}
          className="max-w-xl mx-auto text-lg md:text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed mb-12"
        >
          {data.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.72 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <a
            href="#cta"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-semibold text-sm hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors duration-250 shadow-md"
          >
            {data.cta}
            <motion.span
              className="inline-block"
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              →
            </motion.span>
          </a>
          <a
            href="#story"
            className="text-sm text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors font-medium"
          >
            Lihat cara kami bekerja ↓
          </a>
        </motion.div>
      </div>

      {/* Scroll line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-10 bg-gradient-to-b from-zinc-400/50 to-transparent dark:from-zinc-600/50 animate-pulse" />
      </motion.div>
    </section>
  );
}
