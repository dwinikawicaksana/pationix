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

        <div className="mt-12 border-t border-slate-800 pt-6 text-sm text-slate-500 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p>{footer.copyright}</p>
          {footer.description && (
            <p>{localize(footer.description, language)}</p>
          )}
        </div>
      </div>
    </footer>
  );
}
