"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";
import { FooterData, NavbarData } from "@/types/landing";

const footerLinks = [
  {
    column: 1,
    links: [
      { label: "Robot", href: "#" },
      { label: "Tools", href: "#" },
      { label: "Software", href: "#" },
      { label: "Ecosystem", href: "#" },
    ],
  },
  {
    column: 2,
    links: [
      { label: "Customers", href: "#" },
      { label: "Self-Driving Labs", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Company", href: "#" },
    ],
  },
];

export default function FooterNew({
  footer,
  navbar,
}: {
  footer: FooterData;
  navbar: NavbarData;
}) {
  const { language } = useLanguage();

  return (
    <footer className="relative bg-slate-900 dark:bg-black text-slate-100 dark:text-white overflow-hidden transition-colors">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/8 dark:bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 dark:bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        {/* Top section with logo and newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1.2fr] gap-16 mb-16 items-start">
          {/* Logo section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/assets/images/logo-long-transparent.png"
              alt="Paitonix"
              className="h-[8em] w-auto rounded-2xl mb-6 contrast-150 dark:contrast-50 border border-sky-500/60 dark:border-sky-400/50 shadow-lg shadow-sky-500/20"
            />
            <p className="text-sm leading-relaxed text-slate-300 dark:text-gray-400 max-w-xs">
              {localize(footer.tagline, language)}
            </p>
          </motion.div>

          {/* Navigation columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 gap-12"
          >
            {footerLinks.map((col, idx) => (
              <div key={idx} className="space-y-6">
                {col.links.map((link) => (
                  <a
                    key={link.href + link.label}
                    href={link.href}
                    className="text-sm text-slate-300 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors duration-200 block"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </motion.div>

          {/* Newsletter section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-semibold text-white dark:text-white uppercase tracking-wider mb-4">
              {language === "id" ? "Tetap Update" : "Stay Updated"}
            </h3>
            <p className="text-xs text-slate-200 dark:text-gray-400 leading-relaxed mb-4">
              {language === "id"
                ? "Dapatkan insights terbaru, update produk, dan tips aplikasi."
                : "Get the latest research insights, product updates, and application tips."}
            </p>

            <div className="space-y-3">
              <input
                type="email"
                placeholder={
                  language === "id" ? "Email Anda" : "Your work email"
                }
                className="w-full px-4 py-2.5 rounded-lg bg-slate-800 dark:bg-gray-900 border border-slate-700 dark:border-gray-800 text-white dark:text-white placeholder-slate-400 dark:placeholder-gray-600 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/30 transition"
              />

              <button className="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold text-sm hover:from-sky-600 hover:to-sky-700 transition-all duration-200 shadow-lg shadow-sky-500/30 uppercase tracking-wider">
                {language === "id" ? "Pesan Demo" : "Book a Demo"}
              </button>
            </div>

            {language === "id" ? (
              <p className="text-[11px] text-slate-300 dark:text-gray-600 leading-relaxed">
                Dengan memberikan informasi ini, Anda setuju untuk menerima
                informasi terbaru tentang produk dan layanan Paitonix.
              </p>
            ) : (
              <p className="text-[11px] text-slate-300 dark:text-gray-600 leading-relaxed">
                By providing this information, you agree to be kept informed
                about Paitonix products and services.
              </p>
            )}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-700 dark:via-gray-800 to-transparent mb-8" />

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          {/* Left - Social links */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-slate-300 dark:text-gray-400 hover:text-sky-400 dark:hover:text-sky-400 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-slate-300 dark:text-gray-400 hover:text-sky-400 dark:hover:text-sky-400 transition-colors duration-200"
              aria-label="Twitter/X"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
              </svg>
            </a>
          </div>

          {/* Center - Copyright */}
          <p className="text-sm text-slate-300 dark:text-gray-500">
            © {new Date().getFullYear()} Paitonix.{" "}
            {language === "id"
              ? "Seluruh hak cipta dilindungi."
              : "All Rights Reserved."}
          </p>

          {/* Right - Made by */}
          <a
            href="#"
            className="text-sm text-slate-300 dark:text-gray-400 hover:text-sky-400 dark:hover:text-sky-400 transition-colors duration-200"
          >
            {language === "id" ? "Dibuat oleh" : "Made by"}{" "}
            <span className="font-semibold">Paitonix</span>
          </a>
        </motion.div>
      </div>
    </footer>
  );
}
