/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{html, js}", "./src/script/*.{html, js}"],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ["Ubuntu", "sans-serif"],
      },
    },
  },
  plugins: [require("@catppuccin/tailwindcss")],
};
