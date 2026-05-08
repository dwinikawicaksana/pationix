"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const loadingText = "PAITONIX".split("");

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const audioTimer = setTimeout(() => {
        try {
          const audio =
            (window as any).__welcomeAudio ||
            (document.getElementById("welcome-audio") as HTMLAudioElement);

          if (!audio) return;

          if (!audio.paused) {
            audio.muted = false;
            audio.volume = 1.0;
          } else {
            audio.muted = false;
            audio.volume = 1.0;
            audio.play().catch(() => {});
          }
        } catch (_) {}
      }, 400);

      return () => clearTimeout(audioTimer);
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center px-6"
        >
          <div className="relative flex flex-col items-center gap-8">
            <div className="relative flex items-end gap-2">
              {loadingText.map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.08,
                    ease: "easeOut",
                  }}
                  className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[0.28em] text-white"
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.6, ease: "easeInOut", delay: 0.6 }}
              className="relative h-1 w-72 overflow-hidden rounded-full bg-slate-800"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-sky-400 via-cyan-300 to-amber-400"
                initial={{ x: "-100%" }}
                animate={{ x: ["-100%", "0%", "100%"] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="text-sm uppercase tracking-[0.34em] text-slate-400"
            >
              welcome
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
