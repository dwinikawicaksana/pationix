"use client";
import { motion } from "framer-motion";
import { FeatureData } from "@/types/landing";
import { AnimateIn } from "./AnimateIn";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";

const uiText = {
  serviceLabel: { id: "Layanan Kami", en: "Our Services" },
  heading: {
    id: "Semua yang Anda butuhkan. Tidak kurang, tidak lebih.",
    en: "Everything you need. Nothing extra.",
  },
};

function FeatureCard({
  feature,
  index,
}: {
  feature: FeatureData;
  index: number;
}) {
  const { language } = useLanguage();
  const isHighlight = feature.highlight;

  const neonColors = [
    "from-sky-500 to-cyan-400",
    "from-cyan-400 to-blue-500",
    "from-blue-500 to-purple-500",
    "from-purple-500 to-pink-500",
    "from-pink-500 to-rose-500",
    "from-rose-500 to-orange-500",
  ];

  const bgGlows = [
    "dark:shadow-sky-500/20",
    "dark:shadow-cyan-400/20",
    "dark:shadow-blue-500/20",
    "dark:shadow-purple-500/20",
    "dark:shadow-pink-500/20",
    "dark:shadow-orange-500/20",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 },
        boxShadow: `0 20px 50px -12px rgba(14, 165, 233, 0.5)`,
      }}
      className={`relative p-7 rounded-2xl border transition-all duration-300 group overflow-hidden cursor-default backdrop-blur-sm ${
        isHighlight
          ? "bg-gradient-to-br from-zinc-900 to-zinc-950 dark:from-zinc-800 dark:to-zinc-900 border-transparent shadow-2xl"
          : "bg-white/50 dark:bg-zinc-900/60 border-2 bg-gradient-to-br from-transparent via-transparent to-transparent hover:shadow-2xl"
      }`}
      style={
        !isHighlight
          ? {
              borderImage: `linear-gradient(135deg, rgb(14, 165, 233), rgb(6, 182, 212)) 1`,
              boxShadow: `0 0 20px -5px rgba(14, 165, 233, 0.3), inset 0 0 20px -10px rgba(14, 165, 233, 0.1)`,
            }
          : {}
      }
    >
      {/* Neon glow background effect */}
      {!isHighlight && (
        <motion.div
          className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-gradient-to-br ${neonColors[index % 6]} pointer-events-none`}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            opacity: [0, 0.15, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      )}

      <div className="relative z-10">
        <motion.div
          className={`text-2xl mb-5 ${isHighlight ? "text-zinc-400 dark:text-zinc-300" : "text-sky-400 dark:text-cyan-400"}`}
          whileHover={{ rotate: 20, scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {feature.icon}
        </motion.div>

        <h3
          className={`text-[17px] font-bold mb-2.5 tracking-tight transition-colors ${isHighlight ? "text-zinc-50 dark:text-zinc-100" : "text-zinc-900 dark:text-white bg-gradient-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent group-hover:from-cyan-400 group-hover:to-blue-500"}`}
        >
          {localize(feature.title, language)}
        </h3>

        <p
          className={`text-[13.5px] leading-relaxed transition-colors ${isHighlight ? "text-zinc-400 dark:text-zinc-400" : "text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white"}`}
        >
          {localize(feature.description, language)}
        </p>
      </div>
    </motion.div>
  );
}

export default function FeatureReveal({
  features,
}: {
  features: FeatureData[];
}) {
  const { language } = useLanguage();

  return (
    <section
      id="features"
      className="py-24 lg:py-32 bg-gradient-to-b from-white via-zinc-50/50 to-white dark:from-black dark:via-zinc-950/50 dark:to-black relative overflow-hidden"
    >
      {/* Animated background glow elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl"
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            y: [0, -30, 0],
            x: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <AnimateIn className="text-center mb-16">
          <motion.span
            className="inline-block text-[10px] font-bold tracking-[0.22em] uppercase text-sky-500 dark:text-cyan-400 mb-4"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {localize(uiText.serviceLabel, language)}
          </motion.span>
          <h2
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-black tracking-tighter bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-white dark:via-cyan-400 dark:to-sky-500 bg-clip-text text-transparent max-w-2xl mx-auto leading-[1.1]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {localize(uiText.heading, language)}
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
