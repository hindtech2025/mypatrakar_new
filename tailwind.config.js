/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  safelist: [
    { pattern: /bg-(red|blue|green|yellow)-(100|200|300|400|500)/ },
    { pattern: /text-(.*)-(.*)/ },
  ],
  plugins: [],
};
