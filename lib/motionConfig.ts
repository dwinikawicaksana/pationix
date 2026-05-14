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

  // Mobile-optimized variants - faster, simpler animations
  mobileVariants: {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, type: "spring", stiffness: 80 },
    },
  },

  // Desktop variants - more elaborate
  desktopVariants: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, type: "spring", stiffness: 60 },
    },
  },

  // Mobile animation durations (shorter = smoother on low-end devices)
  mobileDuration: 0.3,
  desktopDuration: 0.5,

  // Reduced motion config
  reducedMotionTransition: {
    duration: 0.01,
    type: "linear",
  },
};

// Reduce layout shift and enable will-change for smooth animations
export const optimizedAnimationClasses = {
  willChange: "will-change-transform will-change-opacity",
  gpu: "transform gpu",
  backfaceHidden: "backface-hidden",
};

// Mobile-specific animation config to disable heavy animations
export const mobileAnimationConfig = {
  // Disable background orb animations on mobile
  disableBackgroundOrbsOnMobile: true,
  // Reduce parallax on mobile
  mobileParallaxFactor: 0.3,
  desktopParallaxFactor: 1,
  // Simpler blur effects on mobile
  mobileBlurRadius: "blur-2xl",
  desktopBlurRadius: "blur-3xl",
};
