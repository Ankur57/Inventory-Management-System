/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif'],
        Crimson_Text: ['Crimson Text', 'sans-serif'],
        Playfair: ['Playfair Display', 'sans-serif'],
        Edu: ['Edu NSW ACT Hand Cursive', 'cursive'],
      },
    },
  },
  plugins: [],
}

