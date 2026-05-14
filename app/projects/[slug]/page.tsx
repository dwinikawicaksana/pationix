"use client";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { localize } from "@/lib/i18n";
import { projects } from "@/lib/data";
import Link from "next/link";
import { useEffect } from "react";

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { language } = useLanguage();
  const router = useRouter();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const project = projects[slug as keyof typeof projects];

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-white mb-4">
            Project not found
          </h1>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sky-500 text-white font-semibold hover:bg-sky-600 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 lg:py-40 px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 mb-6 transition"
            >
              <span>←</span>
              <span className="text-sm font-semibold">
                {language === "id" ? "Kembali ke Proyek" : "Back to Projects"}
              </span>
            </Link>

            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] border border-white/10 bg-slate-900/90 shadow-xl shadow-slate-950/40 overflow-hidden">
                <img
                  src={project.logo}
                  alt={`${localize(project.title, language)} icon`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white">
                  {localize(project.title, language)}
                </h1>
                <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl">
                  {localize(project.heroDescription, language)}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://api.whatsapp.com/send?phone=6287891541475&text=Halo%20saya%20ingin%20konsultasi%20dalam%20pembuatan%20jasa%20website"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-sky-500 text-white font-semibold hover:bg-sky-600 transition"
              >
                {language === "id" ? "Minta Demo" : "Request Demo"}
              </a>
              <Link
                href="/"
                className="px-8 py-3 rounded-full border border-slate-600 text-white font-semibold hover:border-slate-400 transition"
              >
                {language === "id" ? "Hubungi Kami" : "Contact Us"}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sections */}
      {project.sections.map((section, index) => (
        <motion.section
          key={index}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="py-20 sm:py-28 px-6 border-t border-slate-800"
        >
          {section.type === "text-image" && (
            <div className="max-w-7xl mx-auto">
              <div
                className={`grid gap-12 lg:grid-cols-2 items-center ${section.align === "left" ? "lg:flex-row-reverse" : ""}`}
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    x: section.align === "right" ? -32 : 32,
                  }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
                    {localize(section.title as any, language)}
                  </h2>
                  <p className="text-base text-slate-400 leading-relaxed">
                    {section.description &&
                      localize(section.description, language)}
                  </p>
                </motion.div>

                <motion.div
                  initial={{
                    opacity: 0,
                    x: section.align === "right" ? 32 : -32,
                  }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="rounded-[2rem] overflow-hidden border border-slate-700 bg-slate-900"
                >
                  <img
                    src={section.image}
                    alt={localize(section.title, language)}
                    className="w-full h-auto"
                  />
                </motion.div>
              </div>
            </div>
          )}

          {section.type === "features-grid" && (
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-12 text-center">
                {localize(section.title, language)}
              </h2>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {section.features?.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className="rounded-2xl border border-slate-700 bg-slate-900/50 p-6 hover:border-slate-500 transition"
                  >
                    <h3 className="text-lg font-semibold text-white mb-3">
                      {localize(feature.title, language)}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {localize(feature.description, language)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.section>
      ))}

      {/* CTA Section */}
      <section className="py-20 sm:py-28 px-6 border-t border-slate-800 bg-gradient-to-b from-slate-900/50 to-slate-950">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            {localize(project.cta.title, language)}
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-8">
            {localize(project.cta.description, language)}
          </p>

          <button className="px-8 py-4 rounded-full bg-sky-500 text-white font-semibold hover:bg-sky-600 transition text-lg">
            {language === "id" ? "Hubungi Kami Sekarang" : "Contact Us Now"}
          </button>
        </motion.div>
      </section>

      {/* Footer Navigation */}
      <section className="py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition"
          >
            <span>←</span>
            <span>
              {language === "id"
                ? "Lihat Proyek Lainnya"
                : "View Other Projects"}
            </span>
          </Link>
          <Link
            href="/"
            className="text-slate-400 hover:text-white transition font-semibold"
          >
            {language === "id" ? "Kembali ke Beranda" : "Back to Home"}
          </Link>
        </div>
      </section>
    </main>
  );
}
