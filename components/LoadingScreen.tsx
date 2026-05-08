"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const playedRef = useRef(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const getAudio = () => {
      return (
        ((window as any).__welcomeAudio as HTMLAudioElement | undefined) ||
        (document.getElementById("welcome-audio") as HTMLAudioElement | null)
      );
    };

    const isAtTop = () => window.scrollY <= 2;

    const tryPlayAudio = async ({ force = false } = {}) => {
      const audio = getAudio();
      if (!audio || playedRef.current) return;
      if (!force && !isAtTop()) return;

      audio.muted = false;
      audio.volume = 1.0;
      audio.playbackRate = 0.75;
      audio.currentTime = 0;

      try {
        await audio.play();
        playedRef.current = true;
      } catch (_err) {
        // Ignore autoplay failures and retry later when the user interacts.
      }
    };

    const handleScroll = () => {
      tryPlayAudio();
    };

    const handleInteraction = () => {
      tryPlayAudio({ force: true });
    };

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    tryPlayAudio({ force: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchend", handleInteraction, { passive: true });
    window.addEventListener("click", handleInteraction, { passive: true });
    window.addEventListener("pointerup", handleInteraction, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchend", handleInteraction);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("pointerup", handleInteraction);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-slate-950 text-white flex items-center justify-center px-4"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(30,58,138,0.18),transparent_35%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.12),transparent_30%)]" />

          <div className="relative z-10 mx-auto flex w-full max-w-[min(520px,calc(100vw-2rem))] flex-col items-center justify-center gap-6 px-4 py-2">
            <div className="w-full text-center text-[clamp(1rem,4vw,1.9rem)] sm:text-[clamp(1.2rem,3vw,2.4rem)] font-black tracking-[0.35em] text-white uppercase whitespace-nowrap">
              <span className="inline-block opacity-95">PAITONIX</span>
            </div>
            <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 p-5 shadow-[0_30px_70px_-40px_rgba(15,23,42,0.9)] backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),transparent_35%)]" />
              <div className="relative">
                <div className="mb-3 text-center text-xs uppercase tracking-[0.32em] text-slate-400 sm:text-sm">
                  Loading
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800/80">
                  <motion.div
                    className="h-full w-[35%] rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-fuchsia-500"
                    initial={{ x: "-35%" }}
                    animate={{ x: ["-35%", "100%"] }}
                    transition={{
                      duration: 1.9,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
