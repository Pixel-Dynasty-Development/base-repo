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
    colors: {
      primary: "#111827",
      test: {
        light: "#6b7280",
        DEFAULT: "#374151",
        dark: "#1f2937",
      },
      secondary: "#3b82f6",
      accent: "#10b981",
      background: "#f9fafb",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
