"use client";
import { FooterData, NavbarData } from "@/types/landing";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";

export default function Footer({
  footer,
  navbar,
}: {
  footer: FooterData;
  navbar: NavbarData;
}) {
  const { language } = useLanguage();
  return (
    <footer className="bg-slate-950 text-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-3 rounded-3xl bg-gradient-to-r from-sky-500 via-amber-400 to-[#8b5e3c] px-4 py-3 text-white shadow-xl shadow-slate-900/20 mb-4">
              <img
                src="/assets/images/logo-long-white.png"
                alt="Paitonix logo"
                className="h-12 w-auto rounded-2xl bg-white p-2 shadow-sm shadow-slate-900/10"
              />
              <span className="text-base font-black tracking-tight">
                {navbar.logo}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              {localize(footer.tagline, language)}
            </p>
          </div>
          <nav className="flex flex-wrap gap-5">
            {footer.links.map((link) => (
              <a
                key={link.href + localize(link.label, language)}
                href={link.href}
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                {localize(link.label, language)}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-6 text-sm text-slate-500 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <p>{footer.copyright}</p>
            {footer.description && (
              <p>{localize(footer.description, language)}</p>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="group relative inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900 px-4 py-2 text-sm text-slate-100 transition cursor-not-allowed"
              aria-label="Instagram coming soon"
            >
              <span className="text-lg">📷</span>
              Instagram
              <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 rounded-full bg-slate-950 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-100 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                Coming soon
              </span>
            </button>
            <button
              type="button"
              className="group relative inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900 px-4 py-2 text-sm text-slate-100 transition cursor-not-allowed"
              aria-label="Facebook coming soon"
            >
              <span className="text-lg">📘</span>
              Facebook
              <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 rounded-full bg-slate-950 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-100 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                Coming soon
              </span>
            </button>
            <button
              type="button"
              className="group relative inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900 px-4 py-2 text-sm text-slate-100 transition cursor-not-allowed"
              aria-label="TikTok coming soon"
            >
              <span className="text-lg">🎵</span>
              TikTok
              <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 rounded-full bg-slate-950 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-100 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                Coming soon
              </span>
            </button>
            <button
              type="button"
              className="group relative inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900 px-4 py-2 text-sm text-slate-100 transition cursor-not-allowed"
              aria-label="X coming soon"
            >
              <span className="text-lg">✕</span>X
              <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 rounded-full bg-slate-950 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-100 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                Coming soon
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
