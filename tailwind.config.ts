import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ["var(--font-lato)", "sans-serif"],
        noto: ["var(--font-noto-sans)", "sans-serif"],
      },
      colors: {
        gc: {
          red: "#cc0000",
        },
      },
    },
  },
  plugins: [],
};

export default config;
