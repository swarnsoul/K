import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        brand: {
          purple: "#8364fc",
          "purple-light": "#dad1ff",
          pink: "#ee3f64",
          green: "#1fad4e",
          "green-light": "#c2f2d2",
          "green-dark": "#225432",
        },
        text: {
          primary: "#000000",
          secondary: "#656565",
          muted: "#909090",
          body: "#4a3f7a",
        },
      },
      fontFamily: {
        sans: ["'Almarena Neue'", "'Almarena Neue Display'", "sans-serif"],
        architects: ["'Architects Daughter'", "cursive"],
        inter: ["'Almarena Neue'", "'Almarena Neue Display'", "sans-serif"],
        almarena: ["'Almarena Neue'", "'Almarena Neue Display'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
