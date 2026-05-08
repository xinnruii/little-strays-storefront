import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ground: "#FFFFFF",
        ink: "#2A211C",
        muted: "#5F5048",
        paper: "#F8F5EF",
        oat: "#F8F5EF",
        clay: "#614331",
        moss: "#6A704A",
        fig: "#76515E",
        linen: "#F8F5EF"
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-dm-sans)", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        soft: "0 24px 70px rgba(42, 33, 28, 0.09)"
      }
    }
  },
  plugins: []
};

export default config;
