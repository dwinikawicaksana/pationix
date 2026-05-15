"use client";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavbarData } from "@/types/landing";
import ThemeToggle from "./ThemeToggle";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";

export default function Navbar({ data }: { data: NavbarData }) {
  const { language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [demoLabsOpen, setDemoLabsOpen] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState<"up" | "down" | null>(
    null,
  );

  const demoLabProjects = [
    {
      label: "Noura Care",
      href: "https://nouracare-labs.paitonix.com/",
      active: true,
    },
    { label: "Aksara", active: false },
    { label: "Nexfit", active: false },
    { label: "Bare Beaute Studio", active: false },
  ] as const;
  const [toast, setToast] = useState<{ msg: string; id: number } | null>(null);
  const scrollRafRef = useRef<number | null>(null);
  const scrollingDirRef = useRef<"up" | "down" | null>(null);
  const lastScrollYRef = useRef<number>(0);
  const stuckFramesRef = useRef<number>(0);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const demoLabsRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close Demo-Labs dropdown on outside click or Escape
  useEffect(() => {
    if (!demoLabsOpen) return;
    const onDown = (e: globalThis.MouseEvent) => {
      if (!demoLabsRef.current) return;
      if (!demoLabsRef.current.contains(e.target as Node)) {
        setDemoLabsOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDemoLabsOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [demoLabsOpen]);

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

  const showToast = useCallback((msg: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ msg, id: Date.now() });
    toastTimerRef.current = setTimeout(() => setToast(null), 2400);
  }, []);

  const stopAutoScroll = useCallback(() => {
    if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    scrollRafRef.current = null;
    scrollingDirRef.current = null;
    stuckFramesRef.current = 0;
    // Restore browser scroll-behavior
    document.documentElement.style.scrollBehavior = "";
    setIsAutoScrolling(null);
  }, []);

  const startAutoScroll = useCallback(
    (direction: "up" | "down") => {
      if (scrollingDirRef.current === direction) {
        stopAutoScroll();
        showToast("Auto-scroll stopped");
        return;
      }
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
      scrollingDirRef.current = direction;
      stuckFramesRef.current = 0;
      lastScrollYRef.current = window.scrollY;
      // Override smooth scroll so RAF steps are instant
      document.documentElement.style.scrollBehavior = "auto";
      setIsAutoScrolling(direction);
      showToast(
        direction === "down"
          ? "Auto-scroll ↓ enabled"
          : "Auto-scroll ↑ enabled",
      );

      const speed = 5;
      const tick = () => {
        if (scrollingDirRef.current !== direction) return;
        const currentY = window.scrollY;
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;

        if (direction === "up") {
          if (currentY <= 0) {
            stopAutoScroll();
            return;
          }
        } else {
          if (currentY >= maxScroll) {
            stopAutoScroll();
            return;
          }
        }

        // Stuck detection: if position didn't change, force-jump past it
        if (currentY === lastScrollYRef.current) {
          stuckFramesRef.current++;
          if (stuckFramesRef.current >= 4) {
            const jump = direction === "down" ? speed * 8 : -(speed * 8);
            window.scrollTo({
              top: currentY + jump,
              behavior: "instant" as ScrollBehavior,
            });
            stuckFramesRef.current = 0;
          }
        } else {
          stuckFramesRef.current = 0;
        }
        lastScrollYRef.current = currentY;

        const nextY = currentY + (direction === "down" ? speed : -speed);
        window.scrollTo({ top: nextY, behavior: "instant" as ScrollBehavior });
        scrollRafRef.current = requestAnimationFrame(tick);
      };
      scrollRafRef.current = requestAnimationFrame(tick);
    },
    [stopAutoScroll, showToast],
  );

  useEffect(
    () => () => {
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      document.documentElement.style.scrollBehavior = "";
    },
    [],
  );

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 26, stiffness: 160, mass: 0.8 }}
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
              width={240}
              height={96}
              loading="eager"
              decoding="async"
              className="h-16 sm:h-20 md:h-24 w-auto dark:contrast-[0.5]"
            />
          </a>

          <ul className="hidden md:flex items-center gap-6 lg:gap-8">
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

            {/* Demo-Labs dropdown — desktop (styled like other nav links) */}
            <li ref={demoLabsRef} className="relative">
              <button
                type="button"
                onClick={() => setDemoLabsOpen((prev) => !prev)}
                aria-expanded={demoLabsOpen}
                aria-haspopup="menu"
                className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition"
              >
                Demo-Labs
                <svg
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${demoLabsOpen ? "rotate-180" : "rotate-0"}`}
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 8l5 5 5-5" />
                </svg>
              </button>

              <AnimatePresence>
                {demoLabsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ type: "spring", damping: 24, stiffness: 260 }}
                    className="absolute right-0 top-[calc(100%+0.6rem)] z-50 w-72 overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-950/10 backdrop-blur-2xl dark:border-slate-700 dark:bg-slate-950"
                    role="menu"
                    aria-label="Demo-Labs projects"
                  >
                    <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                      Projects
                    </p>
                    <div className="space-y-0.5">
                      {demoLabProjects.map((project) =>
                        project.active ? (
                          <a
                            key={project.label}
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            role="menuitem"
                            onClick={() => setDemoLabsOpen(false)}
                            className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-emerald-50 hover:text-emerald-900 dark:text-slate-100 dark:hover:bg-slate-900 dark:hover:text-white"
                          >
                            <span className="flex items-center gap-3">
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-xs font-bold text-white">
                                N
                              </span>
                              <span>
                                <span className="block">{project.label}</span>
                                <span className="block text-[11px] font-normal text-slate-500 dark:text-slate-400">
                                  Opens in new tab
                                </span>
                              </span>
                            </span>
                            <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300">
                              Live
                            </span>
                          </a>
                        ) : (
                          <div
                            key={project.label}
                            role="menuitem"
                            aria-disabled="true"
                            className="flex cursor-default items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-500 dark:text-slate-400"
                          >
                            <span className="flex items-center gap-3">
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-slate-100 text-[10px] font-bold text-slate-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-400">
                                ?
                              </span>
                              {project.label}
                            </span>
                            <span className="rounded-full border border-slate-300 bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-400">
                              TBC
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          </ul>

          <div className="flex items-center gap-2">
            <div className="relative hidden md:inline-flex h-8 w-20 shrink-0 overflow-hidden rounded-full border border-slate-200/70 bg-slate-100 p-1 shadow-sm dark:border-slate-700/60 dark:bg-slate-800">
              <span
                className={`pointer-events-none absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-white shadow-sm dark:bg-slate-950 transition-transform duration-300 ease-in-out ${
                  language === "en" ? "translate-x-9" : "translate-x-0"
                }`}
              />
              {(["id", "en"] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  aria-label={lang === "id" ? "Indonesian" : "English"}
                  className={`relative z-10 flex-1 text-[11px] font-bold uppercase tracking-wider transition-colors duration-200 ${
                    language === lang
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
            <ThemeToggle compact />
            {/* Scroll Controls */}
            <div className="hidden lg:flex items-center gap-1 rounded-full border border-slate-200/60 bg-white/90 px-1.5 py-1 dark:border-slate-700/70 dark:bg-slate-950/85 shadow-sm shadow-slate-900/5">
              <button
                type="button"
                onClick={() => startAutoScroll("up")}
                className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                  isAutoScrolling === "up"
                    ? "bg-sky-500 text-white"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
                aria-label="Auto scroll up"
                title={
                  isAutoScrolling === "up" ? "Stop scrolling" : "Auto scroll up"
                }
              >
                <svg
                  className={`w-4 h-4 ${isAutoScrolling === "up" ? "text-white" : "text-slate-600 dark:text-slate-300"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 15l-6-6-6 6"
                  />
                </svg>
              </button>
              <div className="w-px h-5 bg-slate-200 dark:bg-slate-700" />
              <button
                type="button"
                onClick={() => startAutoScroll("down")}
                className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                  isAutoScrolling === "down"
                    ? "bg-sky-500 text-white"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
                aria-label="Auto scroll down"
                title={
                  isAutoScrolling === "down"
                    ? "Stop scrolling"
                    : "Auto scroll down"
                }
              >
                <svg
                  className={`w-4 h-4 ${isAutoScrolling === "down" ? "text-white" : "text-slate-600 dark:text-slate-300"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 9l6 6 6-6"
                  />
                </svg>
              </button>
            </div>
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
              className="md:hidden relative z-50 w-8 h-8 flex flex-col justify-center items-center gap-[4px] rounded-full pointer-events-auto
              bg-gradient-to-br from-white/60 to-white/20
              dark:from-white/18 dark:to-white/5
              backdrop-blur-xl
              border border-white/60 dark:border-white/20
              shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_6px_20px_-4px_rgba(0,0,0,0.18)]
              dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_6px_20px_-4px_rgba(0,0,0,0.5)]
              transition-shadow duration-300 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_28px_-4px_rgba(0,0,0,0.22)]"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ type: "spring", damping: 18, stiffness: 220 }}
                className="block w-[14px] h-[1.5px] rounded-full bg-slate-800 dark:bg-white/90 origin-center"
              />
              <motion.span
                animate={
                  menuOpen
                    ? { opacity: 0, scaleX: 0.4 }
                    : { opacity: 1, scaleX: 1 }
                }
                transition={{ type: "spring", damping: 18, stiffness: 220 }}
                className="block w-[14px] h-[1.5px] rounded-full bg-slate-800 dark:bg-white/90"
              />
              <motion.span
                animate={
                  menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }
                }
                transition={{ type: "spring", damping: 18, stiffness: 220 }}
                className="block w-[14px] h-[1.5px] rounded-full bg-slate-800 dark:bg-white/90 origin-center"
              />
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ y: -24, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -16, opacity: 0, scale: 0.98 }}
              transition={{
                type: "spring",
                damping: 28,
                stiffness: 200,
                mass: 0.7,
              }}
              className="md:hidden fixed inset-x-0 top-20 z-40 overflow-hidden border-t border-white/30 dark:border-white/10 bg-white/75 dark:bg-slate-950/75 backdrop-blur-2xl backdrop-saturate-150 shadow-2xl shadow-slate-950/15"
            >
              <ul className="flex flex-col px-6 py-5 gap-4">
                {data.links.map((link, i) => (
                  <motion.li
                    key={link.href + localize(link.label, language)}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      type: "spring",
                      damping: 22,
                      stiffness: 180,
                      delay: i * 0.045,
                    }}
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

                {/* Demo-Labs — mobile */}
                <motion.li
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    type: "spring",
                    damping: 22,
                    stiffness: 180,
                    delay: data.links.length * 0.045,
                  }}
                  className="pt-1"
                >
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-400 dark:text-slate-500">
                    Demo-Labs
                  </p>
                  <div className="space-y-1.5">
                    {demoLabProjects.map((project) =>
                      project.active ? (
                        <a
                          key={project.label}
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-emerald-300 hover:bg-emerald-50/80 dark:border-slate-700/70 dark:bg-slate-950/70 dark:text-slate-100 dark:hover:border-emerald-400/40 dark:hover:bg-slate-900/80"
                        >
                          <span>{project.label}</span>
                          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
                            Live
                          </span>
                        </a>
                      ) : (
                        <div
                          key={project.label}
                          className="flex cursor-default items-center justify-between rounded-2xl border border-slate-200/60 bg-slate-100/70 px-4 py-2.5 text-sm font-semibold text-slate-400 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-500"
                        >
                          <span>{project.label}</span>
                          <span className="rounded-full border border-slate-300 bg-slate-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                            TBC
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </motion.li>

                <motion.li
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    type: "spring",
                    damping: 22,
                    stiffness: 180,
                    delay: (data.links.length + 1) * 0.045,
                  }}
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
              <div className="border-t border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400 mb-3">
                    {localize({ id: "Bahasa", en: "Language" }, language)}
                  </p>
                  <div className="relative inline-flex h-9 w-24 shrink-0 overflow-hidden rounded-full border border-slate-200/70 bg-slate-100 p-1 dark:border-slate-700/60 dark:bg-slate-800">
                    <span
                      className={`pointer-events-none absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-white shadow-sm dark:bg-slate-950 transition-transform duration-300 ease-in-out ${
                        language === "en" ? "translate-x-11" : "translate-x-0"
                      }`}
                    />
                    {(["id", "en"] as const).map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => {
                          setLanguage(lang);
                          setMenuOpen(false);
                        }}
                        aria-label={lang === "id" ? "Indonesian" : "English"}
                        className={`relative z-10 flex-1 text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                          language === lang
                            ? "text-slate-900 dark:text-white"
                            : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                        }`}
                      >
                        {lang.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile autoscroll controls */}
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400 mb-3">
                    {localize({ id: "Gulir", en: "Scroll" }, language)}
                  </p>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/70 bg-slate-100 dark:border-slate-700/60 dark:bg-slate-800 px-2 py-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        startAutoScroll("up");
                        setMenuOpen(false);
                      }}
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 ${
                        isAutoScrolling === "up"
                          ? "bg-sky-500 text-white shadow-sm shadow-sky-500/30"
                          : "text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700"
                      }`}
                      aria-label="Auto scroll up"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18 15l-6-6-6 6"
                        />
                      </svg>
                    </button>
                    <div className="w-px h-5 bg-slate-200 dark:bg-slate-700" />
                    <button
                      type="button"
                      onClick={() => {
                        startAutoScroll("down");
                        setMenuOpen(false);
                      }}
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 ${
                        isAutoScrolling === "down"
                          ? "bg-sky-500 text-white shadow-sm shadow-sky-500/30"
                          : "text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700"
                      }`}
                      aria-label="Auto scroll down"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 9l6 6 6-6"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Autoscroll toast + stop button */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ type: "spring", damping: 22, stiffness: 200 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-2.5 rounded-full px-4 py-2
              bg-gradient-to-r from-white/70 to-white/50
              dark:from-slate-800/80 dark:to-slate-900/70
              backdrop-blur-xl backdrop-saturate-150
              border border-white/60 dark:border-white/15
              shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_8px_32px_-4px_rgba(0,0,0,0.18)]
              dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_8px_32px_-4px_rgba(0,0,0,0.5)]
              text-sm font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap select-none"
          >
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${isAutoScrolling ? "bg-sky-400 animate-pulse" : "bg-slate-400"}`}
            />
            <span>{toast.msg}</span>
            {isAutoScrolling && (
              <button
                type="button"
                onClick={() => {
                  stopAutoScroll();
                  showToast("Auto-scroll stopped");
                }}
                aria-label="Stop auto-scroll"
                className="ml-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full
                  bg-white/70 dark:bg-slate-700/80
                  border border-white/80 dark:border-white/15
                  text-slate-500 dark:text-slate-300
                  hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/20 dark:hover:text-red-400
                  transition-colors duration-150 shadow-sm"
              >
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating stop button — always visible while autoscrolling */}
      <AnimatePresence>
        {isAutoScrolling && (
          <motion.button
            type="button"
            key="floating-stop"
            initial={{ opacity: 0, scale: 0.7, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 12 }}
            transition={{ type: "spring", damping: 20, stiffness: 260 }}
            onClick={() => {
              stopAutoScroll();
              showToast("Auto-scroll stopped");
            }}
            aria-label="Stop auto-scroll"
            className="fixed bottom-6 left-6 z-[9999] inline-flex h-12 w-12 items-center justify-center rounded-full
              bg-gradient-to-br from-white/80 to-white/50
              dark:from-slate-800/90 dark:to-slate-900/80
              backdrop-blur-xl
              border border-white/70 dark:border-white/15
              shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_24px_-4px_rgba(0,0,0,0.2)]
              dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_8px_24px_-4px_rgba(0,0,0,0.55)]
              text-slate-500 dark:text-slate-300
              hover:text-red-500 dark:hover:text-red-400
              hover:border-red-200 dark:hover:border-red-500/30
              hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_24px_-4px_rgba(239,68,68,0.25)]
              transition-colors duration-200 group"
          >
            <span className="absolute inset-0 rounded-full border-2 border-sky-400/50 animate-ping opacity-60" />
            <svg
              className="relative w-4 h-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <rect x="5" y="5" width="14" height="14" rx="2" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
