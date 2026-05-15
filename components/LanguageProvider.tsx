"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { MotionConfig } from "framer-motion";
import { defaultLanguage, Language } from "@/lib/i18n";

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

export default function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);

  useEffect(() => {
    const stored = window.localStorage.getItem("language") as Language | null;
    if (stored === "en" || stored === "id") {
      setLanguageState(stored);
      return;
    }
    // Auto-detect from browser/phone locale on first visit.
    const nav = window.navigator;
    const candidates: string[] = [
      ...(Array.isArray(nav.languages) ? nav.languages : []),
      nav.language,
    ].filter(Boolean);
    const detected = candidates.some((l) => l.toLowerCase().startsWith("id"))
      ? "id"
      : "en";
    setLanguageState(detected as Language);
    try {
      window.localStorage.setItem("language", detected);
    } catch {}
  }, []);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem("language", nextLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {/* Globally force reduced motion so framer-motion snaps animations to
          their final state. Eliminates animation CPU/GPU work site-wide and
          dramatically improves TBT / INP scores. */}
      <MotionConfig reducedMotion="always" transition={{ duration: 0 }}>
        {children}
      </MotionConfig>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
