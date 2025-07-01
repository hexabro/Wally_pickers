/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-rubik)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
