"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { useMotionPreferences } from "@/hooks/useMotionPreferences";

interface ScrollableContainerProps {
  children: React.ReactNode;
  showIndicators?: boolean;
  gap?: string;
  className?: string;
  /** When true, hide the gradient fade overlays at the edges. */
  noFade?: boolean;
}

/**
 * Nike-style horizontal scroll carousel.
 * Works on both desktop and mobile.
 * Snap-scrolls one card per step, smooth on both pointer and touch.
 */
export function ScrollableContainer({
  children,
  showIndicators = true,
  gap = "gap-5 sm:gap-6",
  className = "",
  noFade = false,
}: ScrollableContainerProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { shouldReduceMotion } = useMotionPreferences();

  const checkScroll = useCallback(() => {
    const el = contentRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const max = scrollWidth - clientWidth;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < max - 4);
    setScrollProgress(
      max <= 0 ? 0 : Math.min(1, Math.max(0, scrollLeft / max)),
    );
  }, []);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    const ro = new ResizeObserver(checkScroll);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
      ro.disconnect();
    };
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const el = contentRef.current;
    if (!el) return;
    const firstChild = el.querySelector<HTMLElement>(":scope > *");
    const step = firstChild
      ? firstChild.getBoundingClientRect().width + 24
      : el.clientWidth * 0.85;
    el.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative w-full">
        <div
          ref={contentRef}
          className={`scrollable-row flex ${gap} overflow-x-auto overflow-y-hidden snap-x snap-mandatory pb-2`}
          style={{
            scrollBehavior: shouldReduceMotion ? "auto" : "smooth",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {children}
        </div>

        {!noFade && (
          <>
            <div className="pointer-events-none absolute left-0 top-0 hidden h-full w-12 bg-gradient-to-r from-white to-transparent dark:from-slate-950 sm:block" />
            <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-12 bg-gradient-to-l from-white to-transparent dark:from-slate-950 sm:block" />
          </>
        )}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <div className="flex gap-3">
          <motion.button
            type="button"
            aria-label="Scroll left"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            whileTap={{ scale: 0.94 }}
            className="rounded-full border border-slate-300 bg-white p-3 text-slate-900 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-900 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0 disabled:hover:border-slate-300 disabled:hover:shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-white"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>

          <motion.button
            type="button"
            aria-label="Scroll right"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            whileTap={{ scale: 0.94 }}
            className="rounded-full border border-slate-300 bg-white p-3 text-slate-900 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-900 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0 disabled:hover:border-slate-300 disabled:hover:shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-white"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        </div>

        {showIndicators && (
          <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <motion.div
              className="h-full rounded-full bg-slate-900 dark:bg-white"
              animate={{ width: `${Math.max(8, scrollProgress * 100)}%` }}
              transition={{ type: "spring", damping: 24, stiffness: 140 }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
