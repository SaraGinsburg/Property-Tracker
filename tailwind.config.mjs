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
        customBlue: '#bac2c7', // your custom blue color
        customLightBlue: '#d6dbde', // your custom blue color  #e4e7e9
        customMedBlue: '#c8cfd1', // your custom blue color
        customDarkBlue: '#94999b', // your custom blue color
        customGreen: '#10B981', // your custom green color
        customDarkGreen: '#006c7f', // your custom green color
        customGray: '#E4E5E5', // your custom gray color
        customMedGray: '#b6b7b7',
        customPink: ' #a8516e',
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
