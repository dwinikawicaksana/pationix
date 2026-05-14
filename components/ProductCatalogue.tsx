"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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
    id: "Empat prototype desain: Aksara, Nexfit, Noura Care, dan Bare Beaute Studio.",
    en: "Four design prototypes: Aksara, Nexfit, Noura Care, and Bare Beaute Studio.",
  },
  exploreProject: { id: "Lihat Proyek", en: "View Project" },
  startFrom: { id: "Mulai dari", en: "Start from" },
  prototype: { id: "Prototype", en: "Prototype" },
};

interface TextObject {
  id: string;
  en: string;
}

interface ProjectItem {
  id: string;
  title: TextObject;
  subtitle: TextObject;
  description: TextObject;
  framework: string;
  estimate: TextObject;
  discountBadge?: TextObject;
  prototypeUrl?: string;
  logo: string;
  image: string;
  gradient: string;
  accent: string;
}

const projects: ProjectItem[] = [
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
    framework: "Next.js / React",
    estimate: { id: "IDR 90 - 100 Juta", en: "IDR 90 - 100 Million" },
    discountBadge: {
      id: "Pesan sebelum Des • diskon 10%",
      en: "Book before Dec • 10% off",
    },
    prototypeUrl: "https://aksara-web-nine.vercel.app",
    logo: "/assets/images/project-logo/aksara-logo.png",
    image: "/assets/images/aksara-card.png",
    gradient: "from-sky-600 via-blue-600 to-slate-800",
    accent: "sky",
  },
  {
    id: "nexfit",
    title: { id: "Nexfit", en: "Nexfit" },
    subtitle: {
      id: "Platform Manajemen Kesehatan & Gym",
      en: "Health & Gym Management Platform",
    },
    description: {
      id: "Panel pemilik gym yang elegan untuk mengelola check-in member, booking kelas, overview member, tools trainer, dan insight kesehatan yang real-time.",
      en: "A sleek gym owner panel for managing member check-ins, class bookings, member overview, trainer tools, and real-time health insights.",
    },
    framework: "Next.js / React",
    estimate: { id: "IDR 30 - 50 Juta", en: "IDR 30 - 50 Million" },
    prototypeUrl: "https://gym-prototype-fawn.vercel.app/",
    discountBadge: {
      id: "Pesan sebelum Des • diskon 10%",
      en: "Book before Dec • 10% off",
    },
    logo: "/assets/images/project-logo/nexfit-logo.png",
    image: "/assets/images/fitnex-card.png",
    gradient: "from-purple-600 via-pink-600 to-slate-800",
    accent: "purple",
  },
  {
    id: "noura",
    title: { id: "Noura Care", en: "Noura Care" },
    subtitle: {
      id: "Healthcare / Appointment",
      en: "Healthcare / Appointment",
    },
    description: {
      id: "Platform booking untuk klinik kecil dan home service, lengkap dengan jadwal appointment, profil pasien, dan reminder otomatis.",
      en: "Booking platform for small clinics and home services, complete with appointment scheduling, patient profiles, and automatic reminders.",
    },
    framework: "Vue 3 / Vite / Pinia",
    estimate: { id: "IDR 10 - 20 Juta", en: "IDR 10 - 20 Million" },
    discountBadge: undefined,
    logo: "/assets/images/project-logo/noura-logo.png",
    image: "/assets/images/project-noura.png",
    gradient: "from-emerald-500 via-teal-600 to-slate-800",
    accent: "emerald",
  },
  {
    id: "bare-beaute",
    title: { id: "Bare Beaute Studio", en: "Bare Beaute Studio" },
    subtitle: {
      id: "UMKM / Beauty",
      en: "SMB / Beauty",
    },
    description: {
      id: "Sistem UMKM untuk salon dan nail art yang fokus pada appointment, kas harian, stok kosmetik, dan laporan monthly.",
      en: "An SMB system for salons and nail art, focused on appointments, daily cash, cosmetic stock, and monthly reports.",
    },
    framework: "Vue 3 / Vite / Tailwind",
    estimate: { id: "IDR 10 - 20 Juta", en: "IDR 10 - 20 Million" },
    discountBadge: undefined,
    logo: "/assets/images/project-logo/bare-beaute-logo.png.jpg",
    image: "/assets/images/project-bare.png",
    gradient: "from-pink-500 via-rose-600 to-slate-800",
    accent: "pink",
  },
];

export default function ProductCatalogue() {
  const { language } = useLanguage();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const initialDark = stored ? stored === "dark" : prefersDark;
    setIsDark(initialDark);

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="projects"
      suppressHydrationWarning
      className="scroll-mt-24 relative py-24 lg:py-32 bg-white dark:bg-slate-950 text-slate-950 dark:text-white overflow-hidden transition-colors duration-300"
    >
      {/* Soft gradient background for stable rendering */}
      <div
        className={`absolute inset-0 pointer-events-none ${isDark ? "bg-gradient-to-b from-slate-950/85 via-slate-900/60 to-slate-950/90" : "bg-gradient-to-b from-slate-50 via-white to-slate-50"}`}
      />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_18%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.16),_transparent_20%)]" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="hidden lg:block absolute top-20 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-2xl dark:bg-sky-500/10" />
        <div className="hidden lg:block absolute bottom-0 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-2xl dark:bg-purple-500/10" />
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
          <span
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] ${isDark ? "bg-slate-900/60 text-sky-300 ring-1 ring-sky-400/30" : "bg-sky-100/60 text-sky-700 ring-1 ring-sky-300/40"}`}
          >
            {localize(uiText.sectionLabel, language)}
          </span>
          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 dark:text-white">
            {localize(uiText.heading, language)}
          </h2>
          <p
            className={`mt-5 text-base sm:text-lg ${isDark ? "text-slate-400" : "text-slate-600"} leading-relaxed`}
          >
            {localize(uiText.description, language)}
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.45,
                delay: index * 0.06,
                ease: "easeOut",
              }}
              style={{ willChange: "opacity, transform" }}
            >
              <Link href={`/projects/${project.id}`}>
                <div className="group block h-full cursor-pointer">
                  <div
                    className={`relative overflow-hidden rounded-[2rem] border transition-all duration-300 hover:-translate-y-0.5 ${isDark ? "border-white/10 bg-slate-950 shadow-2xl shadow-slate-950/50 hover:border-white/20 hover:shadow-2xl hover:shadow-slate-900/40" : "border-slate-200/50 bg-slate-50 shadow-lg shadow-slate-200/20 hover:border-slate-300/60 hover:shadow-xl hover:shadow-slate-300/30"}`}
                  >
                    <div className="overflow-hidden">
                      <div className="relative overflow-hidden">
                        <img
                          src={project.image}
                          alt={`${localize(project.title, language)} preview`}
                          className="h-48 w-full object-cover sm:h-56"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${project.gradient} ${isDark ? "opacity-35" : "opacity-20"}`}
                        />
                        {project.discountBadge && (
                          <div className="absolute right-6 top-6 rounded-full bg-rose-500/95 px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-rose-500/20">
                            {typeof project.discountBadge === "string"
                              ? project.discountBadge
                              : localize(project.discountBadge, language)}
                          </div>
                        )}
                      </div>

                      <div
                        className={`relative px-6 pb-6 pt-8 sm:px-8 sm:pb-8 space-y-5 ${isDark ? "bg-slate-950/95" : "bg-white/95"} backdrop-blur-sm`}
                      >
                        <div className="space-y-6">
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ring-1 ${
                                project.accent === "sky"
                                  ? isDark
                                    ? "bg-sky-500/25 text-sky-100 ring-sky-400/40"
                                    : "bg-sky-100/70 text-sky-700 ring-sky-300/50"
                                  : isDark
                                    ? "bg-purple-500/25 text-purple-100 ring-purple-400/40"
                                    : "bg-purple-100/70 text-purple-700 ring-purple-300/50"
                              }`}
                            >
                              {localize(project.subtitle, language)}
                            </span>
                            <span
                              className={`text-xs uppercase tracking-[0.3em] ${isDark ? "text-slate-400" : "text-slate-600"}`}
                            >
                              {project.id.toUpperCase()}
                            </span>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center gap-3 rounded-3xl bg-slate-100/70 px-3 py-2 text-sm font-semibold text-slate-800 ring-1 ring-slate-200 sm:w-fit sm:px-4 sm:py-3 dark:bg-slate-900/80 dark:text-slate-100 dark:ring-slate-700">
                              <img
                                src={project.logo}
                                alt={`${localize(project.title, language)} logo`}
                                className="h-8 w-8 object-contain"
                              />
                              <span className="uppercase tracking-[0.2em]">
                                {project.id.toUpperCase()}
                              </span>
                            </div>
                            <h3
                              className={`text-3xl sm:text-4xl font-black uppercase tracking-[0.1em] ${isDark ? "text-white" : "text-slate-950"}`}
                            >
                              {localize(project.title, language)}
                            </h3>
                            <p
                              className={`text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}
                            >
                              {localize(project.description, language)}
                            </p>
                            <div className="grid gap-3 sm:grid-cols-2">
                              <div
                                className={`rounded-[1.75rem] border p-4 text-sm ${isDark ? "border-white/10 bg-slate-950/80 text-slate-300" : "border-slate-200/60 bg-slate-100/60 text-slate-700"}`}
                              >
                                {project.framework}
                              </div>
                              <div
                                className={`rounded-[1.75rem] border p-4 text-sm ${isDark ? "border-white/10 bg-slate-950/80 text-slate-300" : "border-slate-200/60 bg-slate-100/60 text-slate-700"}`}
                              >
                                {localize(uiText.startFrom, language)}{" "}
                                {localize(project.estimate, language)}
                              </div>
                            </div>
                            <div
                              className={`text-sm ${isDark ? "text-slate-300" : "text-slate-600"} leading-relaxed mt-4`}
                            >
                              <span className="font-semibold">
                                {localize(uiText.prototype, language)}:
                              </span>{" "}
                              {!project.prototypeUrl ||
                              project.prototypeUrl === "#" ? (
                                <span>TBC</span>
                              ) : (
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    window.open(
                                      project.prototypeUrl!,
                                      "_blank",
                                    );
                                  }}
                                  className={`underline transition cursor-pointer border-0 bg-transparent p-0 text-left ${isDark ? "text-sky-300 hover:text-sky-200" : "text-sky-700 hover:text-slate-900"}`}
                                >
                                  {project.prototypeUrl!.replace(
                                    /^https?:\/\//,
                                    "",
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3">
                          <div className="grid gap-3 sm:grid-cols-2">
                            <div
                              className={`rounded-[1.5rem] border p-3 text-xs ${isDark ? "border-white/10 bg-slate-950/80 text-slate-300" : "border-slate-200/60 bg-slate-100/60 text-slate-700"}`}
                            >
                              {localize(
                                {
                                  id: "UI yang intuitif dan siap scaling.",
                                  en: "Intuitive UI ready for scaling.",
                                },
                                language,
                              )}
                            </div>
                            <div
                              className={`rounded-[1.75rem] border p-4 text-sm ${isDark ? "border-white/10 bg-slate-950/80 text-slate-300" : "border-slate-200/60 bg-slate-100/60 text-slate-700"}`}
                            >
                              {localize(
                                {
                                  id: "Kolaborasi real-time dan insight produk.",
                                  en: "Real-time collaboration and product insight.",
                                },
                                language,
                              )}
                            </div>
                          </div>
                          <div
                            className={`flex items-center gap-3 text-sm font-semibold ${isDark ? "text-slate-300 group-hover:text-white" : "text-slate-700 group-hover:text-slate-950"} transition-colors`}
                          >
                            <span>
                              {localize(uiText.exploreProject, language)}
                            </span>
                            <span
                              className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors ${isDark ? "bg-white/15 group-hover:bg-white/25 text-white" : "bg-slate-300/30 group-hover:bg-slate-300/50 text-slate-800"}`}
                            >
                              →
                            </span>
                          </div>
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
