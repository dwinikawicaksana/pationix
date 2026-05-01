"use client";
import { motion } from "framer-motion";
import { CaseStudyData } from "@/types/landing";
import { AnimateIn } from "./AnimateIn";

function CaseStudyCard({ cs, index }: { cs: CaseStudyData; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.22 } }}
      className="group relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-shadow duration-300 hover:shadow-xl"
    >
      <div className="relative h-52 overflow-hidden">
        <motion.img
          src={cs.image}
          alt={cs.title}
          className="w-full h-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
        <div className="absolute bottom-4 left-5">
          <div className="text-[2.6rem] font-black text-white leading-none tracking-tighter" style={{ fontFamily: "'Playfair Display', serif" }}>
            {cs.metric}
          </div>
          <div className="text-[10px] text-white/75 font-semibold tracking-[0.16em] uppercase mt-0.5">{cs.metricLabel}</div>
        </div>
      </div>
      <div className="p-6">
        <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-zinc-400 dark:text-zinc-500">{cs.client}</span>
        <h3 className="mt-2 text-[17px] font-bold text-zinc-900 dark:text-zinc-50 mb-3 tracking-tight leading-snug">{cs.title}</h3>
        <p className="text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">{cs.result}</p>
        <div className="flex flex-wrap gap-1.5">
          {cs.tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function CaseStudy({ caseStudies }: { caseStudies: CaseStudyData[] }) {
  return (
    <section id="case-studies" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <AnimateIn className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <span className="inline-block text-[10px] font-bold tracking-[0.22em] uppercase text-zinc-400 dark:text-zinc-500 mb-4">Bukti Kerja</span>
            <h2 className="text-4xl md:text-5xl lg:text-[3.25rem] font-black tracking-tighter text-zinc-900 dark:text-zinc-50 leading-[1.1] max-w-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
              Hasil yang berbicara sendiri.
            </h2>
          </div>
          <p className="text-zinc-400 dark:text-zinc-500 max-w-[260px] text-sm leading-relaxed">
            Proyek nyata. Angka nyata. Dampak nyata bagi bisnis yang memilih membangun dengan benar.
          </p>
        </AnimateIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {caseStudies.map((cs, i) => (
            <CaseStudyCard key={cs.id} cs={cs} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
