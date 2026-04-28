import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./providers/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F172A",
        mist: "#E2E8F0",
        steel: "#334155",
        skycore: "#0EA5E9",
        ambercore: "#F59E0B",
        panel: "rgb(var(--panel) / <alpha-value>)",
        edge: "rgb(var(--edge) / <alpha-value>)",
        canvas: "rgb(var(--canvas) / <alpha-value>)",
        glow: "rgb(var(--glow) / <alpha-value>)"
      },
      boxShadow: {
        panel: "0 24px 80px rgba(15, 23, 42, 0.18)"
      },
      backgroundImage: {
        radar:
          "radial-gradient(circle at top, rgba(14,165,233,0.24), transparent 35%), radial-gradient(circle at bottom right, rgba(245,158,11,0.16), transparent 30%)"
      }
    }
  },
  plugins: []
};

export default config;
