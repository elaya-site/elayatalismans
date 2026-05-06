import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14100C",
        "ink-2": "#1C1611",
        "ink-3": "#251D16",
        bone: "#F4ECDF",
        sand: "#E8D7B8",
        "sand-soft": "#C9B289",
        ochre: "#D9A56B",
        terra: "#C97B4A",
        umber: "#7A3E2A",
        gold: "#C49A5C",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Times New Roman"', "serif"],
        sans: ['"Inter"', "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
