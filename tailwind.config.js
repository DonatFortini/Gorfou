/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.{html, js}",
    "./src/script/*.{html, js}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ["Ubuntu", "sans-serif"],
      },
    },
  },
  plugins: [
    require("@catppuccin/tailwindcss"),
    require("tw-elements/dist/plugin"),
  ],
};
