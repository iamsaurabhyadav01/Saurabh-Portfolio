import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        paper: "#f7f3ec",
        surface: "#fffdf9",
        ink: "#201d19",
        line: "#e2dacb",
        muted: "#7a7266",
        rust: "#b3452b",
        rustDark: "#8f3620",
        moss: "#586a4c",
      },
      keyframes: {
        slideUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "slide-up": "slideUp 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
