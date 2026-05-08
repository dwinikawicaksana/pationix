"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SCROLL_STEP = 8;

export default function AutoScrollButton() {
  const [direction, setDirection] = useState<"up" | "down" | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const stopScroll = useCallback(() => {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    setDirection(null);
  }, []);

  const performScroll = useCallback(
    (scrollDirection: "up" | "down") => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentPosition = window.scrollY;
      const nextPosition =
        scrollDirection === "up"
          ? Math.max(currentPosition - SCROLL_STEP, 0)
          : Math.min(currentPosition + SCROLL_STEP, maxScroll);

      if (
        (scrollDirection === "up" && nextPosition <= 0) ||
        (scrollDirection === "down" && nextPosition >= maxScroll)
      ) {
        window.scrollTo({ top: nextPosition, left: 0, behavior: "auto" });
        stopScroll();
        return;
      }

      window.scrollTo({ top: nextPosition, left: 0, behavior: "auto" });
      frameRef.current = window.requestAnimationFrame(() =>
        performScroll(scrollDirection),
      );
    },
    [stopScroll],
  );

  const handleClick = (scrollDirection: "up" | "down") => {
    if (direction === scrollDirection) {
      stopScroll();
      return;
    }

    stopScroll();
    setDirection(scrollDirection);
    performScroll(scrollDirection);
  };

  useEffect(() => {
    return () => {
      stopScroll();
    };
  }, [stopScroll]);

  return (
    <>
      <AnimatePresence>
        {direction && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed right-6 bottom-56 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-sky-500/50 whitespace-nowrap pointer-events-none"
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: isMobile ? 1.2 : 1.5, repeat: Infinity }}
              className="inline-flex h-2 w-2 rounded-full bg-white"
            />
            Auto Scroll {direction === "up" ? "↑" : "↓"} ON
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed right-6 bottom-24 z-50 flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={() => handleClick("up")}
          className={`inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-slate-900/85 shadow-lg shadow-slate-950/40 text-white transition hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
            direction === "up"
              ? "ring-2 ring-sky-400 ring-offset-2 ring-offset-slate-950"
              : ""
          }`}
          aria-label="Auto scroll up"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => handleClick("down")}
          className={`inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-slate-900/85 shadow-lg shadow-slate-950/40 text-white transition hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
            direction === "down"
              ? "ring-2 ring-sky-400 ring-offset-2 ring-offset-slate-950"
              : ""
          }`}
          aria-label="Auto scroll down"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>
    </>
  );
}
