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
        // customVeryLightBlue: '#f0f6fa', // your custom blue color  #e4e7e9
        customVeryLightBlue: '#FAFCFE', // your custom blue color  #e4e7e9
        customVeryLightBluePlus: '#e1ebf5', // your custom blue color  #e4e7e9
        customMedBlue: '#c8cfd1', // your custom blue color
        customDarkBlue: '#94999b', // your custom blue color
        customGreen: '#219e75', // your custom green color
        // customGreen: '#10B981', // your custom green color
        customDarkGreen: '#006c7f', // your custom green color
        customMedGreen: '#66C9A3', // your custom green color
        customGray: '#E4E5E5', // your custom gray color
        customMedGray: '#b6b7b7',
        customDarkGray: '#9b9e9e',
        customVeryDarkGray: '#5a5c5c', // your custom gray color
        customRed: '#ed7474',
        customDarkRed: '#e64949',
        customPink: ' #a8516e',
        customLightPink: '#d1829c',
        customVeryLightPink: '#d6b2be',
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
