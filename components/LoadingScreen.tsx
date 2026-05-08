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
    const getAudio = () => {
      return (
        ((window as any).__welcomeAudio as HTMLAudioElement | undefined) ||
        (document.getElementById("welcome-audio") as HTMLAudioElement | null)
      );
    };

    const tryPlayAudio = async (unmute = false) => {
      const audio = getAudio();
      if (!audio) return false;

      if (unmute) {
        audio.muted = false;
        audio.volume = 1.0;
      }

      try {
        await audio.play();
        if (unmute) {
          audio.muted = false;
          audio.volume = 1.0;
        }
        return true;
      } catch (_err) {
        return false;
      }
    };

    const addGestureFallback = () => {
      const gestureHandler = async () => {
        const success = await tryPlayAudio(true);
        if (success) {
          window.removeEventListener("click", gestureHandler);
          window.removeEventListener("touchstart", gestureHandler);
          window.removeEventListener("keydown", gestureHandler);
        }
      };

      window.addEventListener("click", gestureHandler, {
        once: true,
        passive: true,
      });
      window.addEventListener("touchstart", gestureHandler, {
        once: true,
        passive: true,
      });
      window.addEventListener("keydown", gestureHandler, {
        once: true,
        passive: true,
      });
    };

    if (!isLoading) {
      const audioTimer = window.setTimeout(async () => {
        const success = await tryPlayAudio(true);
        if (!success) {
          addGestureFallback();
        }
      }, 400);

      return () => window.clearTimeout(audioTimer);
    }

    return undefined;
  }, [isLoading]);

  useEffect(() => {
    const getAudio = () => {
      return (
        ((window as any).__welcomeAudio as HTMLAudioElement | undefined) ||
        (document.getElementById("welcome-audio") as HTMLAudioElement | null)
      );
    };

    const playAudioAtTop = async () => {
      if (window.scrollY === 0) {
        try {
          const audio = getAudio();
          if (!audio) return;
          audio.muted = false;
          audio.volume = 1.0;
          audio.currentTime = 0;
          await audio.play();
        } catch (_err) {
          const gestureHandler = async () => {
            const audio = getAudio();
            if (!audio) return;
            audio.muted = false;
            audio.volume = 1.0;
            try {
              await audio.play();
            } catch (_) {}
          };
          window.addEventListener("click", gestureHandler, {
            once: true,
            passive: true,
          });
          window.addEventListener("touchstart", gestureHandler, {
            once: true,
            passive: true,
          });
          window.addEventListener("keydown", gestureHandler, {
            once: true,
            passive: true,
          });
        }
      }
    };

    const playAudioOnInteraction = async () => {
      try {
        const audio = getAudio();
        if (!audio) return;
        audio.muted = false;
        audio.volume = 1.0;
        audio.currentTime = 0;
        await audio.play();
      } catch (_err) {
        // ignore and wait for a clearer gesture
      }
    };

    window.addEventListener("scroll", playAudioAtTop, { passive: true });
    window.addEventListener("mousemove", playAudioOnInteraction, {
      passive: true,
    });
    window.addEventListener("pointermove", playAudioOnInteraction, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", playAudioAtTop);
      window.removeEventListener("mousemove", playAudioOnInteraction);
      window.removeEventListener("pointermove", playAudioOnInteraction);
    };
  }, []);

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
