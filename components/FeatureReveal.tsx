"use client";
import { motion } from "framer-motion";
import { FeatureData } from "@/types/landing";
import { AnimateIn } from "./AnimateIn";

function FeatureCard({ feature, index }: { feature: FeatureData; index: number }) {
  const isHighlight = feature.highlight;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={`relative p-7 rounded-2xl border transition-shadow duration-300 hover:shadow-lg cursor-default ${
        isHighlight
          ? "bg-zinc-900 dark:bg-zinc-50 border-transparent"
          : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
      }`}
    >
      <div className={`text-2xl mb-5 ${isHighlight ? "text-zinc-500 dark:text-zinc-400" : "text-zinc-300 dark:text-zinc-700"}`}>
        {feature.icon}
      </div>
      <h3 className={`text-[17px] font-bold mb-2.5 tracking-tight ${isHighlight ? "text-zinc-50 dark:text-zinc-900" : "text-zinc-900 dark:text-zinc-50"}`}>
        {feature.title}
      </h3>
      <p className={`text-[13.5px] leading-relaxed ${isHighlight ? "text-zinc-400 dark:text-zinc-500" : "text-zinc-500 dark:text-zinc-400"}`}>
        {feature.description}
      </p>
    </motion.div>
  );
}

export default function FeatureReveal({ features }: { features: FeatureData[] }) {
  return (
    <section id="features" className="py-24 lg:py-32 bg-zinc-50/70 dark:bg-zinc-950/40">
      <div className="max-w-7xl mx-auto px-6">
        <AnimateIn className="text-center mb-16">
          <span className="inline-block text-[10px] font-bold tracking-[0.22em] uppercase text-zinc-400 dark:text-zinc-500 mb-4">
            Layanan Kami
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-black tracking-tighter text-zinc-900 dark:text-zinc-50 max-w-2xl mx-auto leading-[1.1]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Semua yang Anda butuhkan. Tidak kurang, tidak lebih.
          </h2>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {features.map((f, i) => (
            <FeatureCard key={f.id} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
