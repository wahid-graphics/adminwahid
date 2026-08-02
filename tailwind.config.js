/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        or:   { DEFAULT:'#F97316', light:'#FFF7ED', dark:'#ea6c0a' },
        ink:  { DEFAULT:'#1a1a1a', soft:'#3a3a3a', muted:'#6b6560', faint:'#9a9590' },
        cr:   { DEFAULT:'#F5F0E8', dark:'#ece7de' },
        bd:   { DEFAULT:'#e8e4de', strong:'#d4cfc8' },
      },
      fontFamily: {
        serif: ['"DM Serif Display"','Georgia','serif'],
        sans:  ['"DM Sans"','system-ui','sans-serif'],
      },
    }
  },
  plugins: [],
}
