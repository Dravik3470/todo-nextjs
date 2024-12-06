/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#1e293b", // Background
        secondary: "#334155", // Card background
        accent: "#94a3b8", // Lighter text and borders
      },
    },
  },
  plugins: [],
};
