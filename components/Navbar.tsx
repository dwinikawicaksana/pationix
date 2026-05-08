"use client";
import { useEffect, useState, type MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavbarData } from "@/types/landing";
import ThemeToggle from "./ThemeToggle";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";

export default function Navbar({ data }: { data: NavbarData }) {
  const { language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith("#")) {
      return;
    }

    event.preventDefault();
    const target = document.querySelector(href) as HTMLElement | null;
    const currentPath = window.location.pathname;
    const rootHref = `/${href}`;

    if (target) {
      setMenuOpen(false);
      // Add delay on mobile to let menu close animation complete
      setTimeout(
        () => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        },
        menuOpen ? 300 : 0,
      );
      return;
    }

    if (currentPath !== "/") {
      window.location.assign(rootHref);
      return;
    }

    window.location.hash = href;
    setMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ease-out backdrop-blur-3xl backdrop-saturate-150 ${
        scrolled
          ? "bg-white/70 dark:bg-slate-950/80 border-slate-200/30 dark:border-slate-800/40 shadow-xl shadow-slate-950/15"
          : "bg-white/30 dark:bg-slate-950/35 border-slate-200/20 dark:border-slate-800/20 shadow-none"
      }`}
    >
      <nav className="max-w-7xl mx-auto md:px-6 px-4 h-20 flex items-center justify-between gap-4">
        <a
          href="#"
          className="inline-flex items-center gap-3 text-slate-950 dark:text-white transition-opacity duration-200"
        >
          <img
            src="/assets/images/logo-header.png"
            alt="Paitonix logo"
            className="h-16 sm:h-20 md:h-24 w-auto dark:contrast-[0.5]"
          />
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {data.links.map((link) => (
            <li key={link.href + localize(link.label, language)}>
              <a
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href)}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition"
              >
                {localize(link.label, language)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden md:inline-flex items-center gap-1 rounded-full border border-slate-200/60 bg-white/90 px-2 py-1 text-sm shadow-sm shadow-slate-900/5 dark:border-slate-700/70 dark:bg-slate-950/85">
            {(["id", "en"] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                aria-label={lang === "id" ? "Indonesian" : "English"}
                className={`inline-flex items-center justify-center rounded-full p-1 transition ${
                  language === lang
                    ? "bg-sky-600 text-slate-50 shadow-sm shadow-sky-600/20 dark:bg-sky-500 dark:text-white dark:shadow-sky-500/30"
                    : "text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                <span>{lang === "id" ? "🇮🇩" : "🇺🇸"}</span>
              </button>
            ))}
          </div>
          <ThemeToggle compact />
          <a
            href="#testimonials"
            onClick={(event) => handleNavClick(event, "#testimonials")}
            className="hidden md:inline-flex items-center px-5 py-2 rounded-full bg-slate-950/80 text-white text-sm font-semibold shadow-[0_8px_24px_rgba(14,165,233,0.2)] backdrop-blur-xl border border-white/10 dark:border-sky-400/30 transition-all duration-300 hover:shadow-[0_12px_36px_rgba(14,165,233,0.35)] hover:bg-slate-900/90 hover:-translate-y-0.5"
          >
            {localize({ id: "Testimonial", en: "Testimonials" }, language)}
          </a>
          <button
            type="button"
            style={{ touchAction: "manipulation" }}
            className="md:hidden relative z-50 w-12 h-12 flex flex-col justify-center items-center gap-[6px] rounded-full border border-slate-200/70 bg-white/90 shadow-sm shadow-slate-900/5 dark:border-slate-700/70 dark:bg-slate-900/75 pointer-events-auto"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[2px] bg-slate-900 dark:bg-slate-100 origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-[2px] bg-slate-900 dark:bg-slate-100"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[2px] bg-slate-900 dark:bg-slate-100 origin-center"
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="md:hidden fixed inset-x-0 top-20 z-40 overflow-hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl shadow-2xl shadow-slate-950/10"
          >
            <ul className="flex flex-col px-6 py-5 gap-4">
              {data.links.map((link, i) => (
                <motion.li
                  key={link.href + localize(link.label, language)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.22 }}
                >
                  <a
                    href={link.href}
                    onClick={(event) => handleNavClick(event, link.href)}
                    className="text-base font-medium text-slate-800 dark:text-slate-100 hover:text-slate-950 dark:hover:text-white transition"
                  >
                    {localize(link.label, language)}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: data.links.length * 0.05, duration: 0.22 }}
                className="pt-2"
              >
                <a
                  href="#testimonials"
                  onClick={(event) => handleNavClick(event, "#testimonials")}
                  className="inline-flex items-center justify-center w-full rounded-full bg-slate-950/85 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(14,165,233,0.2)] backdrop-blur-xl border border-white/10 dark:border-sky-400/30 transition-all duration-300 hover:shadow-[0_12px_36px_rgba(14,165,233,0.35)] hover:bg-slate-900/90"
                >
                  {localize(
                    { id: "Testimonial", en: "Testimonials" },
                    language,
                  )}
                </a>
              </motion.li>
            </ul>
            <div className="border-t border-slate-200 dark:border-slate-800 px-6 py-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400 mb-3">
                {localize({ id: "Bahasa", en: "Language" }, language)}
              </p>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-slate-50/90 px-3 py-2 dark:border-slate-700/70 dark:bg-slate-900/80">
                {(["id", "en"] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => {
                      setLanguage(lang);
                      setMenuOpen(false);
                    }}
                    aria-label={lang === "id" ? "Indonesian" : "English"}
                    className={`rounded-full px-3 py-2 transition text-base ${
                      language === lang
                        ? "bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950"
                        : "text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                    }`}
                  >
                    {lang === "id" ? "🇮🇩" : "🇺🇸"}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
