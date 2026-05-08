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
      className="py-24 lg:py-32 bg-gradient-to-b from-white via-zinc-50/30 to-white dark:from-black dark:via-zinc-900/30 dark:to-black relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-10 left-1/4 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl"
          animate={{
            y: [0, 40, 0],
            x: [0, 30, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            y: [0, -40, 0],
            x: [0, -30, 0],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
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
              "linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(248, 250, 252, 0.5) 100%)",
            boxShadow:
              "0 8px 32px rgba(14, 165, 233, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.5)",
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
            className="inline-block text-[10px] font-bold tracking-[0.22em] uppercase bg-gradient-to-r from-sky-600 to-cyan-600 dark:from-sky-400 dark:to-cyan-400 bg-clip-text text-transparent mb-5 animate-pulse"
          >
            {localize(uiText.label, language)}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="text-4xl md:text-6xl lg:text-[4.25rem] font-black tracking-tighter bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 dark:from-white dark:via-cyan-200 dark:to-sky-400 bg-clip-text text-transparent mb-5 leading-[1.05]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.28, duration: 0.6 }}
            className="text-zinc-600 dark:text-zinc-300 text-[17px] max-w-md mx-auto mb-11 leading-relaxed"
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
                boxShadow: "0 20px 40px rgba(14, 165, 233, 0.3)",
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-sky-400/50"
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
                className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors font-medium"
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
            className="mt-9 text-[11px] text-zinc-500 dark:text-zinc-400 tracking-wide"
          >
            Konsultasi awal 30 menit · Tanpa komitmen
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
