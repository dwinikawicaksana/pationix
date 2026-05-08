"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle({ compact }: { compact?: boolean }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const isDark = stored ? stored === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  if (!mounted) return <div className={compact ? "w-10 h-6" : "w-14 h-7"} />;

  const baseClasses = compact
    ? "relative inline-flex h-8 w-16 items-center rounded-full p-1"
    : "relative inline-flex h-11 w-24 items-center rounded-full p-1";

  const knobClasses = compact
    ? "absolute inset-y-1 left-1 h-6 w-6 rounded-full border border-slate-200 shadow transition-transform duration-300"
    : "absolute inset-y-1 left-1 h-9 w-9 rounded-full border border-slate-200 shadow-md transition-transform duration-300";

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to day mode" : "Switch to night mode"}
      className={`${baseClasses} transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 ${
        dark
          ? "bg-slate-900/90 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.85)]"
          : "bg-gradient-to-r from-amber-300 via-sky-200 to-slate-100 shadow-[0_16px_40px_-24px_rgba(251,191,36,0.75)]"
      }`}
    >
      {!compact && (
        <>
          <span className="absolute left-3 text-[11px] font-semibold text-slate-900 dark:text-slate-200">
            Day
          </span>
          <span className="absolute right-3 text-[11px] font-semibold text-slate-900 dark:text-slate-200">
            Night
          </span>
        </>
      )}
      <span
        className={`${knobClasses} ${
          dark
            ? "translate-x-8 bg-slate-950 text-white"
            : "translate-x-0 bg-white text-amber-400"
        }`}
      >
        <span
          className={`absolute inset-0 flex items-center justify-center ${compact ? "text-xs" : "text-sm"}`}
        >
          {dark ? "🌙" : "☀️"}
        </span>
      </span>
      <span className="sr-only">{dark ? "Night mode" : "Day mode"}</span>
    </button>
  );
}
