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
    image: "/assets/images/aksara-prototype.svg",
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
    image: "/assets/images/fitnex-prototype.svg",
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
                  <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br bg-slate-900 h-96 shadow-2xl shadow-slate-950/40 transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-slate-900/60">
                    {/* Gradient Overlay Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-40 group-hover:opacity-50 transition-opacity duration-300`}
                    />

                    {/* Content */}
                    <div className="relative h-full p-8 flex flex-col justify-between">
                      {/* Top Badge */}
                      <div>
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ring-1 ${
                            project.accent === "sky"
                              ? "bg-sky-500/20 text-sky-200 ring-sky-400/30"
                              : "bg-purple-500/20 text-purple-200 ring-purple-400/30"
                          }`}
                        >
                          {localize(project.subtitle, language)}
                        </span>
                      </div>

                      {/* Middle - Title and Description */}
                      <div>
                        <h3 className="text-4xl sm:text-5xl font-black text-white mb-4">
                          {localize(project.title, language)}
                        </h3>
                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed line-clamp-3">
                          {localize(project.description, language)}
                        </p>
                      </div>

                      {/* Bottom - CTA */}
                      <div className="flex items-center gap-3 text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
                        <span>{localize(uiText.exploreProject, language)}</span>
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-colors text-white">
                          →
                        </span>
                      </div>
                    </div>

                    {/* Hover Effect - Glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div
                        className={`absolute top-0 right-0 w-64 h-64 blur-3xl rounded-full ${
                          project.accent === "sky"
                            ? "bg-sky-500/20"
                            : "bg-purple-500/20"
                        }`}
                      />
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
