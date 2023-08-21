/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
        big: "5px 0 4px var(--tw-shadow-color), 0 -5px 4px var(--tw-shadow-color), 0 5px 4px var(--tw-shadow-color), -5px 0 4px var(--tw-shadow-color);",
        md: "2px 0 4px var(--tw-shadow-color), 0 -2px 4px var(--tw-shadow-color), 0 2px 4px var(--tw-shadow-color), -2px 0 4px var(--tw-shadow-color);",
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
      animation: {
        shimmer: "shimmer 2s infinite",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};
