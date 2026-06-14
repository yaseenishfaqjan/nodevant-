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
        bg: "#08080F",
        "bg-soft": "#0D0D18",
        surface: "rgba(255,255,255,0.03)",
        cyan: {
          DEFAULT: "#00D4FF",
          dim: "#0BA5C9",
        },
        violet: {
          DEFAULT: "#9B5CFF",
          dim: "#7B3FE4",
        },
        ink: "#F0F0FF",
        muted: "#B0B0CC",
        faint: "#7B7BA8",
        line: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
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
        "ticker": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
      },
      animation: {
        ticker: "ticker 30s linear infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
