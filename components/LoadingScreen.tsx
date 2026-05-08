"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
          {/* Netflix-style loading animation */}
          <div className="relative w-40 h-40 flex items-center justify-center">
            {/* Outer rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-transparent border-t-sky-500 border-r-sky-400 rounded-full"
            />

            {/* Middle rotating ring - opposite direction */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 border-2 border-transparent border-t-amber-400 border-r-amber-300 rounded-full"
            />

            {/* Center logo/text */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10 text-center"
            >
              <img
                src="/assets/images/favicon.png"
                alt="Paitonix"
                className="h-16 w-16 mx-auto mb-3"
              />
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-xs uppercase tracking-widest text-sky-300 font-semibold"
              >
                Loading
              </motion.div>
            </motion.div>

            {/* Pulsing background glow */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-sky-500/20 blur-2xl"
            />
          </div>

          {/* Bottom progress indicator */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="absolute bottom-20 h-1 w-32 bg-gradient-to-r from-sky-500 to-amber-400 rounded-full origin-left"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
