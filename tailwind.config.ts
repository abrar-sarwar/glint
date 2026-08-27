import type { Config } from "tailwindcss";

/**
 * LEEK palette. Graphite near-black ground; semantic accents only.
 *
 *   evidence   muted green   supported / verified
 *   assess     amber         analyst assessment, moderate confidence
 *   claim      violet        actor claim
 *   crit       red           current frontier, critical, retracted/false
 *   info       blue          legal / platform / media reference
 *   ink.muted  gray          uncertainty
 */
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
          base: "#0b0c0f",
          surface: "#101216",
          elevated: "#161a20",
          inset: "#07080a",
        },
        line: {
          DEFAULT: "#22262e",
          strong: "#323846",
          faint: "#181b21",
        },
        ink: {
          primary: "#e7e9ee",
          secondary: "#b6bcc8",
          muted: "#7f8694",
          faint: "#575d69",
          dim: "#3b404a",
        },
        evidence: {
          DEFAULT: "#6fb083",
          dim: "#3d6a4c",
          faint: "#22382a",
        },
        assess: {
          DEFAULT: "#d9a441",
          dim: "#8a6522",
          faint: "#3a2d14",
        },
        claim: {
          DEFAULT: "#a58ae0",
          dim: "#5f4d8f",
          faint: "#2b2440",
        },
        crit: {
          DEFAULT: "#e2495b",
          dim: "#8c2e3a",
          faint: "#3a1a1f",
        },
        info: {
          DEFAULT: "#5c93d6",
          dim: "#355a86",
          faint: "#1a2838",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "2xs": ["10px", { lineHeight: "14px", letterSpacing: "0.08em" }],
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["13px", { lineHeight: "19px" }],
        base: ["15px", { lineHeight: "24px" }],
        md: ["16px", { lineHeight: "26px" }],
        lg: ["18px", { lineHeight: "28px" }],
        xl: ["22px", { lineHeight: "30px", letterSpacing: "-0.01em" }],
        "2xl": ["28px", { lineHeight: "34px", letterSpacing: "-0.015em" }],
        "3xl": ["36px", { lineHeight: "40px", letterSpacing: "-0.02em" }],
        "4xl": ["48px", { lineHeight: "50px", letterSpacing: "-0.025em" }],
        "5xl": ["64px", { lineHeight: "64px", letterSpacing: "-0.03em" }],
        "6xl": ["88px", { lineHeight: "84px", letterSpacing: "-0.04em" }],
      },
      letterSpacing: {
        label: "0.14em",
        "label-tight": "0.08em",
      },
      borderRadius: {
        none: "0",
        DEFAULT: "1px",
        md: "2px",
        lg: "3px",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
        "frontier-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(226,73,91,0.35)" },
          "100%": { boxShadow: "0 0 0 10px rgba(226,73,91,0)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "pulse-dot": "pulse-dot 2.4s ease-in-out infinite",
        "frontier-ring": "frontier-ring 2.4s ease-out infinite",
        "fade-up": "fade-up 180ms ease-out",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(34,38,46,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,38,46,0.5) 1px, transparent 1px)",
        "hatch-crit":
          "repeating-linear-gradient(135deg, rgba(226,73,91,0.10) 0 6px, transparent 6px 12px)",
        "hatch-muted":
          "repeating-linear-gradient(135deg, rgba(127,134,148,0.10) 0 6px, transparent 6px 12px)",
      },
      backgroundSize: {
        "grid-32": "32px 32px",
      },
    },
  },
  plugins: [],
};

export default config;
