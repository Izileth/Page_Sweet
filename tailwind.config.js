/*@type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "index.html",
  ],
  theme: {
    fontFamily: {
      "body": ["Raleway", "system-ui", "Arial", "sans-serif"],
      "heading": ["Raleway", "system-ui", "Arial", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        "home": "url('/assets/bg.png')",
      }
    },
  },
  plugins: [],
}
