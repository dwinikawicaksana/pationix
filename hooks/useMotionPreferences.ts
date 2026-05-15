"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function useMotionPreferences(breakpoint: number = 768) {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    const checkConnection = () => {
      const connection = (navigator as any).connection;
      if (connection) {
        const effectiveType = connection.effectiveType;
        setIsSlowConnection(effectiveType === "2g" || effectiveType === "3g");
      }
    };

    checkMobile();
    checkConnection();

    const resizeListener = () => checkMobile();
    const connectionListener = () => checkConnection();

    window.addEventListener("resize", resizeListener);
    if ((navigator as any).connection) {
      (navigator as any).connection.addEventListener(
        "change",
        connectionListener,
      );
    }

    return () => {
      window.removeEventListener("resize", resizeListener);
      if ((navigator as any).connection) {
        (navigator as any).connection.removeEventListener(
          "change",
          connectionListener,
        );
      }
    };
  }, [breakpoint]);

  const shouldReduceMotion =
    Boolean(prefersReducedMotion) || isMobile || isSlowConnection;

  return {
    isMobile,
    isSlowConnection,
    prefersReducedMotion: Boolean(prefersReducedMotion),
    shouldReduceMotion,
  };
}
