// tailwind.config.js
module.exports = {
  purge: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./src/pages/**/*.html",
    "./src/components/**/*.html",
    "./src/portals/**/*.html",
  ],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
