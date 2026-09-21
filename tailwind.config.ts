import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  safelist: [
    // Admin panelinden gelen dinamik renkler (JSON'da durduğu için elle listelendi)
    "from-electric",
    "to-sky-600",
    "from-violet",
    "to-fuchsia-600",
    "from-tang",
    "to-amber-500",
    "from-emerald-400",
    "to-teal-600",
    "from-[#1B2B5E]",
    "from-[#5E1B3A]",
    "from-[#0E4A44]",
    "from-[#3A1B5E]",
    "from-[#5E4A1B]",
    "from-[#1B3A5E]",
    "to-[#0B0F19]",
  ],
  theme: {
    extend: {
      colors: {
        base: "#0B0F19",
        surface: "#121826",
        card: "#151D2E",
        line: "rgba(255,255,255,0.08)",
        electric: "#00E5FF",
        violet: "#7C5CFF",
        tang: "#FF6B2C",
        muted: "#9AA3B5",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        float: "float 6s ease-in-out infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
      },
      keyframes: {
        marquee: { to: { transform: "translateX(-50%)" } },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        pulseGlow: { "0%,100%": { opacity: ".5" }, "50%": { opacity: "1" } },
      },
    },
  },
  plugins: [],
};

export default config;
