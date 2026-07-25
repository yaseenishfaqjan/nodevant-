import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Charcoal base (V2 Linear/Vercel aesthetic) — cyan/violet accent kept.
        bg: "#0C0C0F",
        "bg-soft": "#13131A",
        card: "#13131A",
        elevated: "#18181F",
        surface: "rgba(255,255,255,0.03)",
        cyan: {
          DEFAULT: "#00D4FF",
          dim: "#0BA5C9",
        },
        violet: {
          DEFAULT: "#9B5CFF",
          dim: "#7B3FE4",
        },
        ink: "#F1F1FA",
        muted: "#8A90A0",
        faint: "#5F6472",
        line: "#1E1E2E",
        "line-muted": "#16161F",
      },
      fontFamily: {
        display: ["var(--font-display)", "Inter", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #00D4FF 0%, #9B5CFF 100%)",
        "brand-gradient-soft":
          "linear-gradient(135deg, rgba(0,212,255,0.12) 0%, rgba(155,92,255,0.12) 100%)",
      },
      boxShadow: {
        "glow-cyan": "0 0 40px rgba(0,212,255,0.25)",
        "glow-cyan-lg": "0 0 80px rgba(0,212,255,0.35)",
        "glow-violet": "0 0 40px rgba(155,92,255,0.25)",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        ticker: "ticker 30s linear infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
