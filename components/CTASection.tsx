"use client";
import { motion } from "framer-motion";
import { CTAData } from "@/types/landing";

;

export default function CTASection({ data }: { data: CTAData }) {
  return (
    <section id="cta" className="py-24 lg:py-32 bg-zinc-50/70 dark:bg-zinc-950/40">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl bg-zinc-900 dark:bg-zinc-50 px-8 py-20 md:py-28 text-center"
        >
          {/* Radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 100%)" }}
          />

          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-block text-[10px] font-bold tracking-[0.22em] uppercase text-zinc-500 dark:text-zinc-400 mb-5"
          >
            Siap memulai?
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18, duration: 0.65 }}
            className="text-4xl md:text-6xl lg:text-[4.25rem] font-black tracking-tighter text-zinc-50 dark:text-zinc-900 mb-5 leading-[1.05]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {data.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-zinc-400 dark:text-zinc-500 text-[17px] max-w-md mx-auto mb-11 leading-relaxed"
          >
            {data.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.42, duration: 0.55 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <motion.a
              href="mailto:halo@paitonix.id"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 font-semibold text-sm shadow-md hover:shadow-lg transition-shadow duration-250"
            >
              {data.button}
              <motion.span whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                →
              </motion.span>
            </motion.a>
            {data.secondaryButton && (
              <a
                href="#case-studies"
                className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-300 dark:hover:text-zinc-600 transition-colors font-medium"
              >
                {data.secondaryButton}
              </a>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="mt-9 text-[11px] text-zinc-600 dark:text-zinc-400 tracking-wide"
          >
            Konsultasi awal 30 menit · Tanpa komitmen
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
