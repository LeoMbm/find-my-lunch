/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './resources/**/*.{edge,js,ts,vue,jsx,tsx}' // 👈
    ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')]
}