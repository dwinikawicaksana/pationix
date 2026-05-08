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

  const lightBgColors = [
    "from-sky-50 to-cyan-50",
    "from-cyan-50 to-blue-50",
    "from-blue-50 to-purple-50",
    "from-purple-50 to-pink-50",
    "from-pink-50 to-rose-50",
    "from-rose-50 to-orange-50",
  ];

  const borderColors = [
    "border-sky-300 hover:border-sky-400",
    "border-cyan-300 hover:border-cyan-400",
    "border-blue-300 hover:border-blue-400",
    "border-purple-300 hover:border-purple-400",
    "border-pink-300 hover:border-pink-400",
    "border-rose-300 hover:border-rose-400",
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
        y: -12,
        transition: { duration: 0.3 },
        boxShadow: `0 20px 50px -12px rgba(14, 165, 233, 0.5)`,
      }}
      className={`relative p-7 rounded-2xl border-2 transition-all duration-300 group overflow-hidden cursor-default backdrop-blur-lg ${
        isHighlight
          ? "bg-gradient-to-br from-zinc-900 to-zinc-950 dark:from-zinc-800 dark:to-zinc-900 border-zinc-700 dark:border-zinc-700 shadow-2xl"
          : `bg-gradient-to-br ${lightBgColors[index % 6]} dark:bg-zinc-900/60 ${borderColors[index % 6]} dark:border-cyan-500/30 dark:hover:border-cyan-400/50 hover:shadow-xl dark:hover:shadow-cyan-500/20 shadow-lg shadow-slate-200/30`
      }`}
    >
      {/* Continuous animated background glow effect */}
      {!isHighlight && (
        <>
          <div
            className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-2xl bg-gradient-to-br ${neonColors[index % 6]} pointer-events-none`}
          />
          <div
            className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 bg-gradient-to-br ${neonColors[index % 6]} pointer-events-none`}
          />
        </>
      )}

      <div className="relative z-10">
        <motion.div
          className={`text-2xl mb-5 ${isHighlight ? "text-zinc-400 dark:text-zinc-300" : `${["text-sky-500", "text-cyan-500", "text-blue-500", "text-purple-500", "text-pink-500", "text-rose-500"][index % 6]} dark:text-cyan-400`}`}
          whileHover={{ rotate: 20, scale: 1.2 }}
          transition={{
            rotate: { type: "spring", stiffness: 300 },
            duration: 0.25,
          }}
        >
          {feature.icon}
        </motion.div>

        <h3
          className={`text-[17px] font-bold mb-2.5 tracking-tight transition-colors ${
            isHighlight
              ? "text-zinc-50 dark:text-zinc-100"
              : `${["text-sky-900", "text-cyan-900", "text-blue-900", "text-purple-900", "text-pink-900", "text-rose-900"][index % 6]} dark:text-white`
          }`}
        >
          {localize(feature.title, language)}
        </h3>

        <p
          className={`text-[13.5px] leading-relaxed transition-colors ${
            isHighlight
              ? "text-zinc-400 dark:text-zinc-400"
              : `${["text-sky-700", "text-cyan-700", "text-blue-700", "text-purple-700", "text-pink-700", "text-rose-700"][index % 6]} dark:text-zinc-300 group-hover:${["text-sky-900", "text-cyan-900", "text-blue-900", "text-purple-900", "text-pink-900", "text-rose-900"][index % 6]} dark:group-hover:text-white`
          }`}
        >
          {localize(feature.description, language)}
        </p>
      </div>

      {/* Animated border glow for dark mode */}
      {!isHighlight && (
        <motion.div
          className={`absolute inset-0 rounded-2xl opacity-0 pointer-events-none dark:opacity-100 dark:group-hover:opacity-50 border-2 border-transparent bg-gradient-to-r ${neonColors[index % 6]} bg-clip-border transition-opacity duration-300`}
          animate={{
            backgroundPosition: ["-200% 0", "200% 0"],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{
            backgroundSize: "200% 100%",
          }}
        />
      )}
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
      className="py-24 lg:py-32 bg-gradient-to-b from-white via-zinc-50/50 to-white dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950 relative overflow-hidden"
    >
      {/* Animated background glow elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hidden lg:block">
          {/* Light mode orbs */}
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 opacity-100 dark:opacity-0 bg-sky-400/20 rounded-full blur-3xl"
            animate={{
              y: [0, 30, 0],
              x: [0, 20, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-72 h-72 opacity-100 dark:opacity-0 bg-pink-400/15 rounded-full blur-3xl"
            animate={{
              y: [0, -30, 0],
              x: [0, -20, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 right-1/4 w-96 h-96 opacity-100 dark:opacity-0 bg-indigo-400/12 rounded-full blur-3xl"
            animate={{
              y: [0, -40, 0],
              x: [0, 30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {/* Dark mode orbs */}
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 opacity-0 dark:opacity-100 bg-sky-500/15 rounded-full blur-3xl"
            animate={{
              y: [0, 30, 0],
              x: [0, 20, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-72 h-72 opacity-0 dark:opacity-100 bg-cyan-500/12 rounded-full blur-3xl"
            animate={{
              y: [0, -30, 0],
              x: [0, -20, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 right-1/4 w-96 h-96 opacity-0 dark:opacity-100 bg-purple-500/10 rounded-full blur-3xl"
            animate={{
              y: [0, -40, 0],
              x: [0, 30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
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
