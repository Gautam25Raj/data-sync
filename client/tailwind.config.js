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

      backgroundImage: {
        "gradient-push": "linear-gradient(225deg, #e03dc1, #8247E5)",
        "gradient-push-light":
          "linear-gradient(to right, #e03dc11a, #8147e51a)",
        "gradient-linear": "linear-gradient(to right, #ffcfd7, #bfa8e8)",
      },
    },
  },

  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".gradient-text": {
          "background-clip": "text",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
        },
      };

      addUtilities(newUtilities);
    }),
  ],
});
