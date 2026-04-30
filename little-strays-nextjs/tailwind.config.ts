import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#25211d",
        paper: "#fbf6ee",
        oat: "#efe4d4",
        clay: "#b66f54",
        moss: "#5f725c",
        fig: "#6f4f63",
        linen: "#f6eddf"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-serif)", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 24px 70px rgba(74, 55, 36, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
