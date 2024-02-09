/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
const plugin = require("tailwindcss/plugin");

module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      screens: {
        "3xl": "1540px",
      },
    },
  },

  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {};

      addUtilities(newUtilities);
    }),
  ],
});
