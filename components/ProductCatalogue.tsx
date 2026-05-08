"use client";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";
import Link from "next/link";

const uiText = {
  sectionLabel: { id: "Proyek Kami", en: "Our Projects" },
  heading: {
    id: "Produk Digital yang Dirancang dengan Detail.",
    en: "Digital products designed with care.",
  },
  description: {
    id: "Dua konsep produk inovatif: Aksara untuk kolaborasi dan monitoring proyek, Fitnex untuk manajemen kesehatan dan gym.",
    en: "Two innovative product concepts: Aksara for collaboration and project monitoring, Fitnex for health and gym management.",
  },
  exploreProject: { id: "Lihat Proyek", en: "View Project" },
};

const projects = [
  {
    id: "aksara",
    title: { id: "Aksara", en: "Aksara" },
    subtitle: {
      id: "Kolaborasi & Monitoring Proyek",
      en: "Collaboration & Project Monitoring",
    },
    description: {
      id: "Sistem komprehensif untuk mengelola MVP, jadwal meeting, dokumen arsip, evaluasi proyek, dan pengaturan akun dalam satu dashboard terpadu.",
      en: "A comprehensive system for managing MVPs, meeting schedules, archived documents, project evaluation, and account settings in one unified dashboard.",
    },
    gradient: "from-sky-600 via-blue-600 to-slate-800",
    accent: "sky",
    image: "/assets/images/aksara-card.png",
  },
  {
    id: "fitnex",
    title: { id: "Fitnex", en: "Fitnex" },
    subtitle: {
      id: "Platform Manajemen Kesehatan & Gym",
      en: "Health & Gym Management Platform",
    },
    description: {
      id: "Panel pemilik gym yang elegan untuk mengelola check-in member, booking kelas, overview member, tools trainer, dan insight kesehatan yang real-time.",
      en: "A sleek gym owner panel for managing member check-ins, class bookings, member overview, trainer tools, and real-time health insights.",
    },
    gradient: "from-purple-600 via-pink-600 to-slate-800",
    accent: "purple",
    image: "/assets/images/fitnex-card.png",
  },
];

export default function ProductCatalogue() {
  const { language } = useLanguage();

  return (
    <section
      id="projects"
      className="relative py-24 lg:py-32 bg-slate-950 text-white overflow-hidden"
    >
      {/* Electrical video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-25"
        src="/assets/videos/electrical.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      {/* Dark overlay to keep cards legible */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/85 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="hidden lg:block absolute top-20 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-2xl" />
        <div className="hidden lg:block absolute bottom-0 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center mb-16"
          style={{ willChange: "opacity, transform" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/60 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-300 ring-1 ring-sky-400/30">
            {localize(uiText.sectionLabel, language)}
          </span>
          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
            {localize(uiText.heading, language)}
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-400 leading-relaxed">
            {localize(uiText.description, language)}
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              style={{ willChange: "opacity, transform" }}
            >
              <Link href={`/projects/${project.id}`}>
                <div className="group block h-full cursor-pointer">
                  <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950 shadow-2xl shadow-slate-950/70 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl hover:shadow-slate-900/90">
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={`${localize(project.title, language)} preview`}
                        className="h-72 w-full object-cover"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-35`}
                      />
                    </div>

                    <div className="relative p-8 flex flex-col justify-between min-h-[420px] bg-slate-950/95 backdrop-blur-sm">
                      <div className="space-y-6">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ring-1 ${
                              project.accent === "sky"
                                ? "bg-sky-500/25 text-sky-100 ring-sky-400/40"
                                : "bg-purple-500/25 text-purple-100 ring-purple-400/40"
                            }`}
                          >
                            {localize(project.subtitle, language)}
                          </span>
                          <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                            {project.id.toUpperCase()}
                          </span>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-4xl sm:text-5xl font-black uppercase tracking-[0.14em] text-white">
                            {localize(project.title, language)}
                          </h3>
                          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                            {localize(project.description, language)}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-4">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-4 text-sm text-slate-300">
                            {localize(
                              {
                                id: "UI yang intuitif dan siap scaling.",
                                en: "Intuitive UI ready for scaling.",
                              },
                              language,
                            )}
                          </div>
                          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-4 text-sm text-slate-300">
                            {localize(
                              {
                                id: "Kolaborasi real-time dan insight produk.",
                                en: "Real-time collaboration and product insight.",
                              },
                              language,
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
                          <span>
                            {localize(uiText.exploreProject, language)}
                          </span>
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 group-hover:bg-white/25 transition-colors text-white">
                            →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
