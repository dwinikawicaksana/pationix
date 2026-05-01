"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavbarData } from "@/types/landing";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ data }: { data: NavbarData }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl border-b border-zinc-200/50 dark:border-zinc-800/50 shadow-[0_1px_12px_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          className="text-[1.35rem] font-black tracking-[-0.05em] text-zinc-900 dark:text-zinc-50 hover:opacity-60 transition-opacity duration-200"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {data.logo}
        </a>

        <ul className="hidden md:flex items-center gap-7">
          {data.links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-[13px] font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <a
            href="#cta"
            className="hidden md:inline-flex items-center px-4 py-2 text-[13px] font-semibold rounded-full bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors duration-200"
          >
            Hubungi Kami
          </a>
          <button
            className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-[5px]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[1.5px] bg-zinc-700 dark:bg-zinc-300 origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-[1.5px] bg-zinc-700 dark:bg-zinc-300"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[1.5px] bg-zinc-700 dark:bg-zinc-300 origin-center"
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="md:hidden overflow-hidden border-t border-zinc-200 dark:border-zinc-800 bg-white/96 dark:bg-zinc-950/96 backdrop-blur-2xl"
          >
            <ul className="flex flex-col px-6 py-5 gap-5">
              {data.links.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-[15px] font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: data.links.length * 0.05, duration: 0.25 }}
                className="pt-1"
              >
                <a
                  href="#cta"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-full bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900"
                >
                  Hubungi Kami
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
