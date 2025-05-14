/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0066cc",
          light: "#3399ff",
          dark: "#004c99",
        },
        secondary: {
          DEFAULT: "#00a1ff",
          light: "#66c7ff",
          dark: "#0081cc",
        },
      },
    },
  },
  plugins: [],
};
