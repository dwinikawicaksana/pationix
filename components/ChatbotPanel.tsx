"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const uiText = {
  label: { id: "Chatbot Interaktif", en: "Interactive Chatbot" },
  heading: {
    id: "Bantuan AI yang selalu siap membantu tim Anda.",
    en: "AI support always ready to help your team.",
  },
  description: {
    id: "Biarkan pengguna Anda berinteraksi dengan chatbot AI bilingual yang membantu merencanakan website bisnis, fitur MVP, dan jalur pengembangan.",
    en: "Let your users interact with a bilingual AI chatbot that helps plan business websites, MVP features, and development direction.",
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
  sectionTitle: { id: "OniX Assistant", en: "OniX Assistant" },
  sectionSubtitle: {
    id: "Rencanakan website bisnis Anda dengan AI konsultan.",
    en: "Plan your business website with an AI consultant.",
  },
  placeholder: {
    id: "Industri bisnis Anda apa?",
    en: "What's your industry?",
  },
  button: { id: "Kirim", en: "Send" },
};

export default function ChatbotPanel() {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const historyRef = useRef<
    Array<{ role: "user" | "model"; parts: Array<{ text: string }> }>
  >([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // Scroll to chatbot section when loading finishes
    if (!isLoading && messages.length > 0) {
      const chatSection = document.getElementById("chatbot");
      chatSection?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: historyRef.current,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Chat request failed");

      const assistantMessage = data.text as string;

      historyRef.current = [
        ...historyRef.current,
        { role: "user", parts: [{ text: userMessage }] },
        { role: "model", parts: [{ text: assistantMessage }] },
      ];

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantMessage },
      ]);
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to get response";
      setError(errorMsg);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error: ${errorMsg}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
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

            {/* Messages Display */}
            <div className="space-y-4 px-6 py-6 h-96 overflow-y-auto">
              {messages.length === 0 && !error && (
                <div className="flex items-center justify-center h-full">
                  <p className="text-sm text-slate-400 text-center">
                    {language === "id"
                      ? "Mulai percakapan dengan mengajukan pertanyaan..."
                      : "Start a conversation by asking a question..."}
                  </p>
                </div>
              )}

              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`rounded-3xl px-4 py-3 text-sm leading-relaxed max-w-xs ${
                      message.role === "assistant"
                        ? "bg-slate-800 text-slate-100"
                        : "bg-amber-300/15 text-amber-100"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="rounded-3xl px-4 py-3 bg-slate-800">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" />
                      <div
                        className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-slate-800/80 px-6 py-5">
              {error && (
                <div className="mb-3 rounded-3xl bg-red-500/20 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}
              <div className="flex flex-col gap-3 rounded-3xl border border-slate-700/80 bg-slate-950 px-4 py-3 sm:flex-row sm:items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  placeholder={localize(uiText.placeholder, language)}
                  className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500 disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={isLoading || !inputValue.trim()}
                  className="inline-flex items-center justify-center rounded-full bg-sky-500/85 px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(14,165,233,0.35)] hover:shadow-[0_12px_36px_rgba(14,165,233,0.5)] backdrop-blur-xl border border-white/20 transition-all duration-300 hover:bg-sky-500/95 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "..." : localize(uiText.button, language)}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
