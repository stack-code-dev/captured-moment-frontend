/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8c52ff",
        secundary: "#e8bd48"
      }
    },
  },
  plugins: [],
}

