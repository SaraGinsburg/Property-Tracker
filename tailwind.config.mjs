/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      stroke: {
        blue: '#1E40AF', // Add specific colors you want to use
        red: '#EF4444', // Add more colors if necessary
        green: '#10B981', // Example
      },
      colors: {
        customBlue: '#b5c6cc', // your custom blue color
        customLightBlue: '#dfe6e9', // your custom blue color
        customGreen: '#10B981', // your custom green color
        customGray: '#cccbc9', // your custom gray color
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      gridTemplateColumns: {
        '70/30': '70% 28%',
      },
    },
  },
  plugins: [],
};
