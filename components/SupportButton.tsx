"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";

const uiText = {
  title: { id: "Paitonix Support", en: "Paitonix Support" },
  subtitle: { id: "Kami siap membantu Anda", en: "We're here to help" },
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
  const [message, setMessage] = useState("");

  const handleOpen = () => {
    setIsOpen(true);
    // Play audio
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

    // Trigger say hi animation
    window.dispatchEvent(new CustomEvent("showSayHi", { detail: true }));
  };

  const handleSend = () => {
    if (!message.trim()) return;
    // Handle message sending
    setMessage("");
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
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-1/2 left-4 right-4 -translate-y-1/2 md:top-auto md:bottom-40 md:right-6 md:left-auto md:translate-y-0 z-50 w-11/12 md:w-96 max-h-[calc(100vh-64px)] md:max-h-96 rounded-2xl md:rounded-[2rem] border border-slate-700/80 bg-slate-900/95 shadow-2xl shadow-slate-950/60 overflow-hidden flex flex-col"
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

              {/* Quick Actions */}
              <div className="grid gap-2 mb-4 sm:mb-5">
                <a
                  href="mailto:halo@paitonix.id"
                  className="inline-flex items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-sky-500/15 text-sky-200 text-xs sm:text-sm font-medium border border-sky-400/30 hover:bg-sky-500/25 transition-all duration-300"
                >
                  {language === "id" ? "💌 Email Kami" : "💌 Email Us"}
                </a>
                <a
                  href="#cta"
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
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder={localize(uiText.placeholder, language)}
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-100 outline-none placeholder:text-slate-500"
                />
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={handleSend}
                    className="inline-flex items-center justify-center rounded-full bg-sky-500/90 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-sky-500/30 backdrop-blur-xl border border-white/15 transition-all duration-300 hover:bg-sky-500 hover:shadow-sky-500/50"
                  >
                    {localize(uiText.sendButton, language)}
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-800/80 px-4 sm:px-6 py-2 sm:py-3 text-center">
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
