"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  // Scroll to top on component mount (page refresh) - use requestAnimationFrame to ensure it runs after browser scroll restoration
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Disable browser's automatic scroll restoration
      window.history.scrollRestoration = "manual";

      // Use requestAnimationFrame to ensure this runs after all renders
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });
    }
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    if (typeof window !== "undefined") {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });
    }
  }, [pathname]);

  return null;
}
