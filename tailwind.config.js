/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/tw-elements/dist/js/**/*.js"
    ],
    theme: {
      extend: {
        backgroundImage: {
          'clouds': "url('/src/assets/travelPhotos/billy-huynh-v9bnfMCyKbg-unsplash.jpg')",
          'blackbg': "url('/src/assets/travelPhotos/klim-musalimov-rDMacl1FDjw-unsplash.jpg')"
        }
      },
    },
    darkMode: "class",
    plugins: [require("tw-elements/dist/plugin.cjs")]
  }