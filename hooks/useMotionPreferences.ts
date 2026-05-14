"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function useMotionPreferences(breakpoint: number = 768) {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  const shouldReduceMotion = Boolean(prefersReducedMotion) || isMobile;

  return {
    isMobile,
    prefersReducedMotion: Boolean(prefersReducedMotion),
    shouldReduceMotion,
  };
}
