"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
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
      {children}
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
