import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "#0c0a06",
          surface: "#15120c",
          elevated: "#1f1b13",
          inset: "#080604",
        },
        line: {
          DEFAULT: "#2a251a",
          strong: "#3d3526",
          faint: "#1a160e",
        },
        ink: {
          primary: "#f0e9d8",
          secondary: "#b8ad94",
          muted: "#807660",
          faint: "#5a5240",
          dim: "#3d372a",
        },
        accent: {
          DEFAULT: "#ff7a1a",
          terminal: "#ff7a1a",
          "terminal-bright": "#ffa050",
          "terminal-dim": "#a3501a",
          amber: "#f0b32d",
          "amber-dim": "#9c7218",
          crit: "#e8503a",
          "crit-dim": "#a13524",
          info: "#5d9ec7",
          "info-dim": "#34678a",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-display)", "Georgia", "serif"],
        stamp: ["var(--font-stamp)", "Courier New", "monospace"],
      },
      fontSize: {
        "2xs": ["10px", { lineHeight: "14px", letterSpacing: "0.08em" }],
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["13px", { lineHeight: "18px" }],
        base: ["15px", { lineHeight: "24px" }],
        md: ["16px", { lineHeight: "26px" }],
        lg: ["18px", { lineHeight: "28px" }],
        xl: ["22px", { lineHeight: "30px" }],
        "2xl": ["28px", { lineHeight: "36px" }],
        "3xl": ["36px", { lineHeight: "42px" }],
        "4xl": ["48px", { lineHeight: "54px" }],
        "5xl": ["64px", { lineHeight: "66px", letterSpacing: "-0.025em" }],
        "6xl": ["80px", { lineHeight: "82px", letterSpacing: "-0.03em" }],
      },
      letterSpacing: {
        label: "0.14em",
        "label-tight": "0.08em",
        stamp: "0.18em",
      },
      borderRadius: {
        none: "0",
        DEFAULT: "1px",
        md: "3px",
        lg: "5px",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        "feed-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "47%": { opacity: "1" },
          "48%": { opacity: "0.7" },
          "49%": { opacity: "1" },
        },
      },
      animation: {
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        "feed-in": "feed-in 220ms ease-out",
        flicker: "flicker 6s linear infinite",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(42,37,26,0.55) 1px, transparent 1px), linear-gradient(to bottom, rgba(42,37,26,0.55) 1px, transparent 1px)",
        "diag-stripes":
          "repeating-linear-gradient(135deg, rgba(255,122,26,0.07) 0 8px, transparent 8px 16px)",
      },
      backgroundSize: {
        "grid-32": "32px 32px",
        "grid-48": "48px 48px",
      },
    },
  },
  plugins: [],
};

export default config;
