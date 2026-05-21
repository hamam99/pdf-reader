/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-red': {
          DEFAULT: '#ff0000',
          light: '#ff6666',
          dark: '#cc0000',
        },
      },
    },
  },
  plugins: [],
}
