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
        // All semantic colors read from CSS variables so the light/dark
        // toggle re-skins the entire site. Names kept for backward-compat.
        bg: "var(--bg)",
        "bg-soft": "var(--surface)",
        card: "var(--surface)",
        surface: "var(--surface)",
        elevated: "var(--surface-2)",
        line: "var(--border)",
        "line-strong": "var(--border-strong)",
        "line-muted": "var(--border)",
        ink: "var(--text-strong)",
        "text-strong": "var(--text-strong)",
        body: "var(--text)",
        muted: "var(--text)",
        faint: "var(--muted)",
        tint: "var(--tint)",
        "chip-border": "var(--chip-border)",
        ok: "var(--ok)",
        accent: "var(--accent-1)",
        cyan: {
          DEFAULT: "var(--accent-1)",
          dim: "var(--accent-1)",
        },
        violet: {
          DEFAULT: "var(--accent-2)",
          dim: "var(--accent-2)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Inter", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "brand-gradient": "var(--gradient)",
        "brand-gradient-soft":
          "linear-gradient(135deg, var(--tint), var(--tint))",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        glow: "var(--shadow-glow)",
        "glow-cyan": "0 0 40px var(--glow)",
        "glow-cyan-lg": "0 0 80px var(--glow)",
        "glow-violet": "0 0 40px var(--glow)",
      },
      keyframes: {
        "nv-pulse": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.45", transform: "scale(0.82)" },
        },
        "nv-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "nv-marquee": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "nv-fade": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
      },
      animation: {
        "nv-pulse": "nv-pulse 1.8s ease-in-out infinite",
        "nv-float": "nv-float 6s ease-in-out infinite",
        "nv-marquee": "nv-marquee 32s linear infinite",
        "nv-fade": "nv-fade 0.25s ease both",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
