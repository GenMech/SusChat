import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        sm: "480px",
        md: "768px",
        lg: "1206px",
        xl: "1440px",
      },
    },
    extend: {
      colors: {
        primary: "#313131",
        white: "#ffffff",
        black: "#000000",
        fontlight: "#F4f4f4",
        fontfaded: "#6D6D6D",
        btnlime: "#46ba3c",
        userbubble: "#00A766",
        botbubble: "#007983",
        fade: "#007983",
        btnhover: "#3c3c3c",
        card: "#313131",
      },
      boxShadow: {
        "1xl": "0px 0px 10px 5px rgba(0,0,0,0.05)",
        "1blue": "0px 0px 6px 1px rgba(22, 44, 244, 0.668)",
        "2xl": "0px 0px 10px 5px rgba(0,0,0,0.1)",
      },
      fontFamily: {
        albert: ["Albert Sans", "sans-serif"],
        sans: ["Plus Jakarta Sans", "sans-serif"],
        nunito: ["Nunito Sans", "sans-serif"],
        roboto: ["Roboto Mono", "monospace"],
        space: ["Space Grotesk", "sans-serif"],
        dmsans: ["DM Sans", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
