"use client";
import { motion } from "framer-motion";
import { CTAData } from "@/types/landing";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";

const uiText = {
  label: { id: "Siap memulai?", en: "Ready to start?" },
};

export default function CTASection({ data }: { data: CTAData }) {
  const { language } = useLanguage();
  const title = localize(data.title, language);
  const subtitle = localize(data.subtitle, language);
  const button = localize(data.button, language);
  const secondaryButton = data.secondaryButton
    ? localize(data.secondaryButton, language)
    : null;

  return (
    <section
      id="cta"
      className="scroll-mt-24 py-24 lg:py-32 relative overflow-hidden bg-slate-950"
    >
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-40 dark:opacity-30"
        src="/assets/videos/video-section.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/55 to-slate-950/80 pointer-events-none" />

      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hidden lg:block">
          {/* Light mode orbs */}
          <motion.div
            className="absolute top-10 left-1/4 w-96 h-96 opacity-100 dark:opacity-0 bg-sky-400/20 rounded-full blur-3xl"
            animate={{
              y: [0, 40, 0],
              x: [0, 30, 0],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-10 right-1/4 w-96 h-96 opacity-100 dark:opacity-0 bg-pink-400/15 rounded-full blur-3xl"
            animate={{
              y: [0, -40, 0],
              x: [0, -30, 0],
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 right-10 w-72 h-72 opacity-100 dark:opacity-0 bg-indigo-400/12 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Dark mode orbs */}
          <motion.div
            className="absolute top-10 left-1/4 w-96 h-96 opacity-0 dark:opacity-100 bg-sky-500/15 rounded-full blur-3xl"
            animate={{
              y: [0, 40, 0],
              x: [0, 30, 0],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-10 right-1/4 w-96 h-96 opacity-0 dark:opacity-100 bg-cyan-500/12 rounded-full blur-3xl"
            animate={{
              y: [0, -40, 0],
              x: [0, -30, 0],
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 right-10 w-72 h-72 opacity-0 dark:opacity-100 bg-purple-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Animated grid for dark mode */}
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

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl px-8 py-20 md:py-28 text-center backdrop-blur-2xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(15,23,42,0.65) 0%, rgba(8,47,73,0.55) 100%)",
            boxShadow:
              "0 8px 48px rgba(14, 165, 233, 0.18), inset 0 1px 0 rgba(255,255,255,0.08)",
            border: "1px solid rgba(56,189,248,0.18)",
          }}
        >
          {/* Animated border gradient */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.3), transparent)",
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPosition: ["-200% 0", "200% 0"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          {/* Dark mode variant */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none dark:block hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(30, 30, 35, 0.6) 0%, rgba(24, 24, 28, 0.4) 100%)",
            }}
          />

          {/* Radial glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-3xl"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              background:
                "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(14, 165, 233, 0.08) 0%, transparent 100%)",
            }}
          />

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block text-[10px] font-bold tracking-[0.22em] uppercase text-sky-400 mb-5 animate-pulse"
          >
            {localize(uiText.label, language)}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="text-4xl md:text-6xl lg:text-[4.25rem] font-black tracking-tighter bg-gradient-to-r from-white via-cyan-200 to-sky-300 bg-clip-text text-transparent mb-5 leading-[1.05]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.28, duration: 0.6 }}
            className="text-slate-300 text-[17px] max-w-md mx-auto mb-11 leading-relaxed"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.38, duration: 0.55 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <motion.a
              href="mailto:halo@paitonix.id"
              whileHover={{
                y: -4,
                boxShadow:
                  "0 25px 50px rgba(14, 165, 233, 0.4), 0 0 30px rgba(6, 182, 212, 0.25)",
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-sky-500/90 to-cyan-500/90 text-white font-semibold text-sm shadow-[0_8px_32px_rgba(14,165,233,0.3)] hover:shadow-[0_15px_45px_rgba(14,165,233,0.5)] transition-all duration-300 backdrop-blur-xl border border-white/20 dark:border-cyan-400/30"
            >
              {button}
              <motion.span
                whileHover={{ x: 4, rotate: 15 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                →
              </motion.span>
            </motion.a>
            {secondaryButton && (
              <motion.a
                href="#case-studies"
                whileHover={{ x: 4 }}
                className="text-sm text-slate-300 hover:text-sky-400 transition-colors font-medium backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 hover:border-sky-400/50 hover:bg-sky-400/5"
              >
                {secondaryButton}
              </motion.a>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-9 text-[11px] text-slate-400 tracking-wide"
          >
            Konsultasi awal 30 menit · Tanpa komitmen
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
