import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Refined typography scale - mobile first
        xs: ["0.75rem", { lineHeight: "1rem", letterSpacing: "-0.01em" }],
        sm: ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "-0.0075em" }],
        base: ["1rem", { lineHeight: "1.5rem", letterSpacing: "-0.005em" }],
        lg: ["1.125rem", { lineHeight: "1.75rem", letterSpacing: "-0.005em" }],
        xl: ["1.25rem", { lineHeight: "1.75rem", letterSpacing: "-0.01em" }],
        "2xl": ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.01em" }],
        "3xl": [
          "1.875rem",
          { lineHeight: "2.25rem", letterSpacing: "-0.02em" },
        ],
        "4xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "-0.02em" }],
        "5xl": ["3rem", { lineHeight: "3.5rem", letterSpacing: "-0.03em" }],
        "6xl": ["3.75rem", { lineHeight: "4.5rem", letterSpacing: "-0.03em" }],
        "7xl": ["4.5rem", { lineHeight: "5.5rem", letterSpacing: "-0.04em" }],
      },
      colors: {
        // Refined color palette - less aggressive
        surface: {
          light: "#ffffff",
          dark: "#0f1419", // Softer than slate-950
        },
        text: {
          light: "#1a1f2e",
          dark: "#f5f5f5", // Softer than white
        },
        accent: {
          primary: "#0ea5e9", // Cyan/Sky
          secondary: "#06b6d4", // Cyan
          tertiary: "#0369a1", // Sky-700
        },
        neutral: {
          light: "#f3f4f6",
          "light-elevated": "#ffffff",
          dark: "#1e293b",
          "dark-elevated": "#334155",
        },
      },
      spacing: {
        gutter: "clamp(1rem, 5vw, 2rem)",
        section: "clamp(2rem, 10vw, 5rem)",
      },
      transitionDuration: {
        smooth: "300ms",
        smoother: "500ms",
      },
    },
  },
  plugins: [],
};

export default config;
