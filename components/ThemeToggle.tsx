"use client";
import { useEffect, useState } from "react";

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

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

  if (!mounted) return <div className="w-16 h-8 rounded-full" />;

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative inline-flex h-8 w-16 shrink-0 cursor-pointer rounded-full border-2 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 ${
        dark ? "bg-slate-800 border-slate-600" : "bg-sky-100 border-sky-300"
      }`}
    >
      {/* Knob with embedded icon */}
      <span
        className={`absolute top-[3px] flex h-[22px] w-[22px] items-center justify-center rounded-full shadow-md transition-all duration-300 ease-in-out ${
          dark
            ? "translate-x-[34px] bg-slate-200"
            : "translate-x-[3px] bg-white"
        }`}
      >
        {dark ? (
          <MoonIcon className="w-3 h-3 text-indigo-500" />
        ) : (
          <SunIcon className="w-3 h-3 text-amber-500" />
        )}
      </span>
      {/* Faint track labels */}
      <span
        className={`absolute left-1.5 top-1/2 -translate-y-1/2 transition-opacity duration-200 ${dark ? "opacity-0" : "opacity-40"}`}
      >
        <SunIcon className="w-3 h-3 text-amber-400" />
      </span>
      <span
        className={`absolute right-1.5 top-1/2 -translate-y-1/2 transition-opacity duration-200 ${dark ? "opacity-50" : "opacity-0"}`}
      >
        <MoonIcon className="w-3 h-3 text-indigo-400" />
      </span>
      <span className="sr-only">
        {dark ? "Switch to light mode" : "Switch to dark mode"}
      </span>
    </button>
  );
}
