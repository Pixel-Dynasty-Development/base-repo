// tailwind.config.js
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: true, // or 'media' or 'class'
  theme: {
    extends: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#111827",
        "primary-hover": "#1f2937",
        secondary: "#3b82f6",
        accent: "#10b981",
        background: "#f9fafb",
        "text-base": "#111827",
        "text-muted": "#6b7280",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
