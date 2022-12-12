/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#272527',
        secondary: '#f3f1ec',
      },
      maxWidth: {
        '7xl': '1920px',
      },
    },
  },
  plugins: [],
}
