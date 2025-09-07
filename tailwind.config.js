/** @type {import('tailwindcss').Config} */
const config = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class", // enables manual dark mode using `dark` class
    theme: {
      extend: {},
    },
    plugins: [],
  };
  
  export default config;