"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const uiText = {
  title: { id: "OniX Support", en: "OniX Support" },
  subtitle: {
    id: "Asisten AI untuk perencanaan website bisnis.",
    en: "AI assistant for business website planning.",
  },
  message: {
    id: "Ada yang bisa kami bantu? Tanyakan tentang layanan kami atau pesan demo sekarang.",
    en: "How can we help? Ask about our services or book a demo.",
  },
  placeholder: {
    id: "Ketik pesan Anda...",
    en: "Type your message...",
  },
  sendButton: { id: "Kirim", en: "Send" },
  close: { id: "Tutup", en: "Close" },
};

export default function SupportButton() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiReady] = useState(true);
  const historyRef = useRef<
    Array<{ role: "user" | "model"; parts: Array<{ text: string }> }>
  >([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleOpen = () => {
    setIsOpen(true);
    const audio =
      ((window as any).__welcomeAudio as HTMLAudioElement | undefined) ||
      (document.getElementById("welcome-audio") as HTMLAudioElement | null) ||
      (document.getElementById("welcome-audio-js") as HTMLAudioElement | null);

    if (audio) {
      audio.currentTime = 0;
      audio.muted = false;
      audio.play().catch(() => {
        // Autoplay policy may prevent this
      });
    }

    window.dispatchEvent(new CustomEvent("showSayHi", { detail: true }));
  };

  const handleSend = async () => {
    if (!inputMessage.trim() || !apiReady || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
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
        { role: "assistant", content: `Error: ${errorMsg}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button - Right side above WhatsApp */}
      <motion.button
        type="button"
        onClick={handleOpen}
        className="fixed bottom-24 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-[0_8px_32px_rgba(14,165,233,0.4)] hover:shadow-[0_12px_48px_rgba(14,165,233,0.6)] transition-all duration-300 backdrop-blur-xl border border-white/20 dark:border-cyan-400/30 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open support"
      >
        <motion.div
          animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </motion.div>

        {/* Badge */}
        {!isOpen && (
          <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50 animate-pulse" />
        )}
      </motion.button>

      {/* Modal Background */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Support Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-3xl border-t border-slate-700/80 bg-slate-900 shadow-2xl shadow-slate-950/60 overflow-hidden md:inset-x-auto md:top-auto md:bottom-40 md:right-6 md:left-auto md:rounded-[2rem] md:border md:w-96 md:max-h-[32rem]"
          style={{ maxHeight: "85dvh" }}
          >
            {/* Header */}
            <div className="border-b border-slate-800/80 bg-gradient-to-r from-sky-500/10 to-cyan-500/10 px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-3 sm:gap-4 backdrop-blur-xl">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="inline-flex h-9 sm:h-10 w-9 sm:w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 shadow-lg shadow-sky-500/30">
                  <svg
                    className="w-4 sm:w-5 h-4 sm:h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                  </svg>
                </div>
                <div className="text-left min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-white truncate">
                    {localize(uiText.title, language)}
                  </p>
                  <p className="text-xs text-slate-400">
                    {localize(uiText.subtitle, language)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <svg
                  className="w-4 sm:w-5 h-4 sm:h-5 text-slate-400 hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="px-4 sm:px-6 py-4 sm:py-5 overflow-y-auto">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 sm:mb-5">
                {localize(uiText.message, language)}
              </p>

              <div className="space-y-3 mb-4 max-h-56 overflow-y-auto pr-1">
                {messages.length === 0 ? (
                  <div className="rounded-2xl border border-slate-700/80 bg-slate-950 p-4 text-slate-300 text-sm">
                    {language === "id"
                      ? "Halo! Saya OniX, asisten AI Anda untuk merencanakan website bisnis. Apa yang ingin Anda diskusikan?"
                      : "Hi! I'm OniX, your AI assistant for planning business websites. What would you like to discuss?"}
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`rounded-2xl p-4 text-sm ${
                        msg.role === "assistant"
                          ? "bg-slate-900 border border-slate-700 text-slate-200"
                          : "bg-slate-800/70 border border-slate-700 text-slate-100 self-end"
                      }`}
                    >
                      {msg.content}
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {error && <p className="text-xs text-rose-300 mb-3">{error}</p>}

              {/* Quick Actions */}
              <div className="grid gap-2 mb-4 sm:mb-5">
                <a
                  href="mailto:hello@paitonix.com"
                  className="inline-flex items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-sky-500/15 text-sky-200 text-xs sm:text-sm font-medium border border-sky-400/30 hover:bg-sky-500/25 transition-all duration-300"
                >
                  {language === "id" ? "💌 Email Kami" : "💌 Email Us"}
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=6287891541475&text=Halo%20saya%20ingin%20konsultasi%20dalam%20pembuatan%20jasa%20website"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-cyan-500/15 text-cyan-200 text-xs sm:text-sm font-medium border border-cyan-400/30 hover:bg-cyan-500/25 transition-all duration-300"
                >
                  {language === "id" ? "📅 Pesan Demo" : "📅 Book Demo"}
                </a>
              </div>

              {/* Message Input */}
              <div className="flex flex-col gap-2 sm:gap-3 rounded-lg border border-slate-700/80 bg-slate-950 px-3 py-2 sm:py-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder={localize(uiText.placeholder, language)}
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-100 outline-none placeholder:text-slate-500"
                />
                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={handleSend}
                    className="inline-flex items-center justify-center rounded-full bg-sky-500/90 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-sky-500/30 backdrop-blur-xl border border-white/15 transition-all duration-300 hover:bg-sky-500 hover:shadow-sky-500/50"
                  >
                    {isLoading
                      ? language === "id"
                        ? "Mengirim..."
                        : "Sending..."
                      : localize(uiText.sendButton, language)}
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              className="border-t border-slate-800/80 px-4 sm:px-6 py-2 sm:py-3 text-center"
              style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
            >
              <p className="text-xs text-slate-400">
                {language === "id"
                  ? "Respons cepat dalam hitungan jam"
                  : "Quick response within hours"}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
