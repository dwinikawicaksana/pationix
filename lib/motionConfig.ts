// Framer Motion global animation optimization for production
export const motionConfig = {
  // Use transform instead of left/top for better performance
  initial: "hidden",
  animate: "visible",
  exit: "hidden",

  // Enable GPU acceleration with transform
  transition: {
    type: "spring",
    stiffness: 60,
    damping: 20,
    mass: 1,
  },

  // Mobile-optimized variants
  mobileVariants: {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  },

  // Desktop variants
  desktopVariants: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
};

// Reduce layout shift and enable will-change for smooth animations
export const optimizedAnimationClasses = {
  willChange: "will-change-transform will-change-opacity",
  gpu: "transform gpu",
  backfaceHidden: "backface-hidden",
};
