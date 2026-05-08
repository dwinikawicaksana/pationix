"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";

const messages = [
  {
    role: "assistant",
    content: {
      id: "Halo! Saya Paitonix Assistant. Apa yang ingin Anda bangun hari ini?",
      en: "Hello! I'm the Paitonix Assistant. What would you like to build today?",
    },
  },
  {
    role: "user",
    content: {
      id: "Saya butuh prototype landing page startup yang modern.",
      en: "I need a modern startup landing page prototype.",
    },
  },
  {
    role: "assistant",
    content: {
      id: "Bagus! Mari kita desain UI yang cepat, responsif, dan siap launch.",
      en: "Great! Let's design a fast, responsive UI ready for launch.",
    },
  },
];

const uiText = {
  label: { id: "Chatbot Interaktif", en: "Interactive Chatbot" },
  heading: {
    id: "Bantuan AI yang selalu siap membantu tim Anda.",
    en: "AI support always ready to help your team.",
  },
  description: {
    id: "Biarkan pengguna Anda berinteraksi dengan chatbot cerdas yang mengusulkan fitur, desain, dan jalur produk secara real-time.",
    en: "Let your users interact with an intelligent chatbot that suggests features, design, and product direction in real time.",
  },
  quickResponse: { id: "Respon cepat", en: "Fast response" },
  seamlessIntegration: { id: "Integrasi mulus", en: "Seamless integration" },
  quickResponseDesc: {
    id: "Jawaban instan dengan gaya percakapan natural.",
    en: "Instant answers in a natural conversational style.",
  },
  seamlessIntegrationDesc: {
    id: "Siap dipasang di landing page, dashboard, atau mobile app.",
    en: "Ready to deploy on landing pages, dashboards, or mobile apps.",
  },
  sectionTitle: { id: "Paitonix Chat", en: "Paitonix Chat" },
  sectionSubtitle: {
    id: "AI untuk percakapan produk.",
    en: "AI for product conversations.",
  },
  placeholder: {
    id: "Tanyakan ide fitur...",
    en: "Ask about feature ideas...",
  },
  button: { id: "Kirim", en: "Send" },
};

export default function ChatbotPanel() {
  const { language } = useLanguage();
  const [inputValue, setInputValue] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setToastVisible(true);
    setInputValue("");
    window.setTimeout(() => setToastVisible(false), 2400);
  };

  return (
    <section
      id="chatbot"
      className="scroll-mt-24 py-20 sm:py-24 bg-slate-950 text-slate-50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-amber-200/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-amber-100">
              {localize(uiText.label, language)}
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
              {localize(uiText.heading, language)}
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-slate-300">
              {localize(uiText.description, language)}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-700/70 bg-white/5 px-5 py-4">
                <p className="text-sm font-semibold text-amber-200">
                  {localize(uiText.quickResponse, language)}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  {localize(uiText.quickResponseDesc, language)}
                </p>
              </div>
              <div className="rounded-3xl border border-slate-700/70 bg-white/5 px-5 py-4">
                <p className="text-sm font-semibold text-cyan-200">
                  {localize(uiText.seamlessIntegration, language)}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  {localize(uiText.seamlessIntegrationDesc, language)}
                </p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] border border-slate-700/80 bg-slate-900/95 shadow-2xl shadow-slate-950/40"
          >
            <div className="border-b border-slate-800/80 px-6 py-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white">
                  {localize(uiText.sectionTitle, language)}
                </p>
                <p className="text-xs text-slate-400">
                  {localize(uiText.sectionSubtitle, language)}
                </p>
              </div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-3xl bg-slate-800 overflow-hidden">
                <img
                  src="/assets/images/ai-assistant.png"
                  alt="AI assistant"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 px-6 py-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`rounded-3xl px-4 py-3 text-sm leading-relaxed ${message.role === "assistant" ? "bg-slate-800 text-slate-100" : "bg-amber-300/15 text-amber-100"}`}
                  >
                    <p>{localize(message.content, language)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-800/80 px-6 py-5">
              <div className="flex flex-col gap-3 rounded-3xl border border-slate-700/80 bg-slate-950 px-4 py-3 sm:flex-row sm:items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  aria-label={localize(uiText.sectionTitle, language)}
                  placeholder={localize(uiText.placeholder, language)}
                  className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  className="inline-flex items-center justify-center rounded-full bg-sky-500/85 px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(14,165,233,0.35)] hover:shadow-[0_12px_36px_rgba(14,165,233,0.5)] backdrop-blur-xl border border-white/20 transition-all duration-300 hover:bg-sky-500/95 hover:-translate-y-0.5"
                >
                  {localize(uiText.button, language)}
                </button>
              </div>
              {toastVisible && (
                <div className="mt-3 rounded-3xl bg-slate-800/90 px-4 py-3 text-sm text-slate-100 shadow-lg shadow-slate-950/20">
                  {localize(
                    {
                      id: "Terima kasih, itu sudah ditampilkan pada inquiries.",
                      en: "Thanks, that's already showing in inquiries.",
                    },
                    language,
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
