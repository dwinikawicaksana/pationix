"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";
import { FooterData, NavbarData } from "@/types/landing";

const footerLinks = [
  {
    column: 1,
    links: [
      { label: "Robot", href: "/robot" },
      { label: "Tools", href: "/tools" },
      { label: "Software", href: "/software" },
      { label: "Ecosystem", href: "/ecosystem" },
    ],
  },
  {
    column: 2,
    links: [
      { label: "Customers", href: "/customers" },
      { label: "Self-Driving Labs", href: "/labs" },
      { label: "Blog", href: "/blog" },
      { label: "Company", href: "/company" },
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
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    if (!email.trim()) {
      setError(language === "id" ? "Masukkan email Anda" : "Enter your email");
      return;
    }
    setError("");
    setShowSuccess(true);
    setEmail("");
  };

  const closeModal = () => setShowSuccess(false);

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
              src="/assets/images/logo-long-white.png"
              alt="Paitonix"
              className="w-full max-w-[320px] sm:max-w-none sm:w-auto h-auto sm:h-[8em] rounded-2xl mb-6 contrast-150 dark:contrast-50 border border-sky-500/60 dark:border-sky-400/50 shadow-lg shadow-sky-500/20"
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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={
                  language === "id" ? "Email Anda" : "Your work email"
                }
                className="w-full px-4 py-2.5 rounded-lg bg-slate-800 dark:bg-gray-900 border border-slate-700 dark:border-gray-800 text-white dark:text-white placeholder-slate-400 dark:placeholder-gray-600 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/30 transition"
              />

              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex w-full items-center justify-center px-4 py-2.5 rounded-lg bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold text-sm hover:from-sky-600 hover:to-sky-700 transition-all duration-200 shadow-lg shadow-sky-500/30 uppercase tracking-wider text-center"
              >
                {language === "id" ? "Pesan Demo" : "Book a Demo"}
              </button>
              {error && <p className="text-xs text-rose-300 mt-2">{error}</p>}
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

        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.95 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-full max-w-md rounded-[2rem] border border-slate-700/70 bg-slate-950/95 p-8 shadow-2xl shadow-slate-950/60"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 mb-6 mx-auto">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-12 w-12 text-emerald-300"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-white text-center">
                {language === "id"
                  ? "Terima kasih atas pesanan Anda!"
                  : "Thanks for your order!"}
              </h2>
              <p className="mt-3 text-sm text-slate-400 text-center">
                {language === "id"
                  ? "Tim kami akan menghubungi Anda segera untuk demo."
                  : "Our team will reach out soon to schedule your demo."}
              </p>
              <button
                type="button"
                onClick={closeModal}
                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15 transition"
              >
                {language === "id" ? "Tutup" : "Close"}
              </button>
            </motion.div>
          </div>
        )}

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
              href="https://www.instagram.com/paitonix"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-100 hover:bg-slate-700 transition-colors duration-200"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.056 1.97.24 2.427.403a4.92 4.92 0 011.675 1.09 4.92 4.92 0 011.09 1.675c.163.458.347 1.257.403 2.427.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.403 2.427a4.92 4.92 0 01-1.09 1.675 4.92 4.92 0 01-1.675 1.09c-.458.163-1.257.347-2.427.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.427-.403a4.92 4.92 0 01-1.675-1.09 4.92 4.92 0 01-1.09-1.675c-.163-.458-.347-1.257-.403-2.427C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.056-1.17.24-1.97.403-2.427a4.92 4.92 0 011.09-1.675 4.92 4.92 0 011.675-1.09c.458-.163 1.257-.347 2.427-.403C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.74 0 8.332.013 7.052.072 5.765.131 4.77.305 4.005.55A6.92 6.92 0 001.512 1.51 6.92 6.92 0 00.55 4.005C.305 4.77.131 5.765.072 7.052.013 8.332 0 8.74 0 12c0 3.26.013 3.668.072 4.948.059 1.287.233 2.282.478 3.047.49 1.327 1.243 2.08 2.57 2.57.765.245 1.76.419 3.047.478C8.332 23.987 8.74 24 12 24s3.668-.013 4.948-.072c1.287-.059 2.282-.233 3.047-.478a6.92 6.92 0 002.57-2.57c.245-.765.419-1.76.478-3.047.059-1.28.072-1.688.072-4.948s-.013-3.668-.072-4.948c-.059-1.287-.233-2.282-.478-3.047a6.92 6.92 0 00-2.57-2.57C19.28.305 18.285.131 17.0.072 15.72.013 15.312 0 12 0z" />
                <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/paitonix"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-100 hover:bg-slate-700 transition-colors duration-200"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.326 24H12.82V14.708h-3.11v-3.62h3.11V8.414c0-3.08 1.882-4.755 4.632-4.755 1.317 0 2.449.098 2.779.142v3.221l-1.907.001c-1.495 0-1.783.71-1.783 1.75v2.297h3.566l-.465 3.62h-3.101V24h6.078C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@paitonix"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-100 hover:bg-slate-700 transition-colors duration-200"
              aria-label="TikTok"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.71 2h2.87c.33 1.77 1.94 2.51 3.69 2.51v2.78a6.5 6.5 0 01-6.47-6.5zm-1.3 2.44a4.11 4.11 0 001.05 2.65 4.1 4.1 0 003.63 1.25v2.05a6.26 6.26 0 01-4.92-2.55 6.3 6.3 0 01-.8-1.7V2.44h2.04zM18.35 6.3a8.93 8.93 0 01-3.14-1.7v5.88h-1.85v6.39c0 2.35-1.6 4.47-3.86 5.02a4.23 4.23 0 01-5.07-3.4 4.36 4.36 0 01.35-1.94 4.26 4.26 0 012.29-2.16 4.08 4.08 0 012.72-.18 4.12 4.12 0 012.47 2.07 1.04 1.04 0 01-.7 1.47 1.07 1.07 0 01-1.24-.59 1.91 1.91 0 00-1.16-.97 1.94 1.94 0 00-1.63.18 1.92 1.92 0 00-.97 1.57 2.1 2.1 0 00.21 1 2 2 0 002.03 1.31 2.27 2.27 0 001.88-1.16 1.09 1.09 0 011.43-.38 1.06 1.06 0 01.56.91v-5.9a8.89 8.89 0 013.25 1.65 1.08 1.08 0 001.52-.12 1.06 1.06 0 00.12-1.47 11.75 11.75 0 00-3.17-2.13z" />
              </svg>
            </a>
            <a
              href="https://x.com/paitonix"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-100 hover:bg-slate-700 transition-colors duration-200"
              aria-label="X"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.954 4.569a10.017 10.017 0 01-2.825.775 4.932 4.932 0 002.163-2.724 9.864 9.864 0 01-3.127 1.197 4.92 4.92 0 00-8.384 4.482A13.978 13.978 0 011.671 3.149a4.822 4.822 0 001.524 6.574 4.903 4.903 0 01-2.229-.616c-.054 2.28 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.928 4.928 0 004.6 3.417 9.867 9.867 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.945 13.945 0 007.557 2.212c9.054 0 14.001-7.496 14.001-13.986 0-.21-.004-.423-.014-.634A9.936 9.936 0 0024 4.59z" />
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
