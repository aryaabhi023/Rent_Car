/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      customGray: '#a3a3a3'
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}

