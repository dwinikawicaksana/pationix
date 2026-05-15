/**
 * Responsive and performance optimization utilities
 * Used across components for consistent mobile/desktop animations
 * Includes reduced motion support and slow connection handling
 */

export const responsiveAnimationConfig = {
  // Container queries for responsive behavior
  mobileBreakpoint: 640,
  tabletBreakpoint: 768,
  desktopBreakpoint: 1024,

  // Animation timings - mobile is faster for perceived performance
  animationDurations: {
    fast: 0.2, // Mobile primary
    normal: 0.3, // Mobile secondary
    slow: 0.5, // Desktop primary
    slower: 0.8, // Desktop secondary
    reduced: 0.05, // For reduced motion or slow connections
  },

  // Stagger delays for animations
  staggerDelays: {
    mobile: 0.05,
    desktop: 0.08,
    reduced: 0.02,
  },

  // Transition config for smooth animations
  transitions: {
    mobileSpring: {
      type: "spring",
      stiffness: 100,
      damping: 25,
      mass: 0.8,
    },
    desktopSpring: {
      type: "spring",
      stiffness: 60,
      damping: 20,
      mass: 1,
    },
    reducedSpring: {
      type: "easeOut",
      duration: 0.05,
    },
    mobileEase: {
      type: "easeOut",
      duration: 0.3,
    },
    desktopEase: {
      type: "easeOut",
      duration: 0.5,
    },
  },

  // Viewport settings for whileInView animations
  viewportSettings: {
    mobile: { once: true, margin: "-20px" },
    desktop: { once: true, margin: "-40px" },
    reduced: { once: true, margin: "0px" },
  },

  // Check if we're on mobile (client-side only)
  isMobileDevice: () => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  },

  // Check for slow connection
  isSlowConnection: () => {
    if (typeof window === "undefined") return false;
    const connection = (navigator as any).connection;
    if (!connection) return false;
    const effectiveType = connection.effectiveType;
    return effectiveType === "2g" || effectiveType === "3g";
  },

  // Check for reduced motion preference
  prefersReducedMotion: () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  },

  // Get animation duration based on device
  getDuration: (
    isMobile: boolean,
    speed: "fast" | "normal" | "slow" = "normal",
    shouldReduce: boolean = false,
  ) => {
    if (shouldReduce) return 0.05;
    if (isMobile) {
      return speed === "fast" ? 0.2 : speed === "slow" ? 0.3 : 0.25;
    }
    return speed === "fast" ? 0.4 : speed === "slow" ? 0.8 : 0.5;
  },

  // Get stagger delay based on device
  getStaggerDelay: (isMobile: boolean, shouldReduce: boolean = false) => {
    if (shouldReduce) return 0.02;
    return isMobile ? 0.05 : 0.08;
  },

  // Get spring transition based on device
  getTransition: (isMobile: boolean, shouldReduce: boolean = false) => {
    if (shouldReduce) {
      return responsiveAnimationConfig.transitions.reducedSpring;
    }
    return isMobile
      ? responsiveAnimationConfig.transitions.mobileSpring
      : responsiveAnimationConfig.transitions.desktopSpring;
  },

  // Get viewport settings based on device
  getViewportSettings: (isMobile: boolean, shouldReduce: boolean = false) => {
    if (shouldReduce) {
      return responsiveAnimationConfig.viewportSettings.reduced;
    }
    return isMobile
      ? responsiveAnimationConfig.viewportSettings.mobile
      : responsiveAnimationConfig.viewportSettings.desktop;
  },
};

export default responsiveAnimationConfig;
