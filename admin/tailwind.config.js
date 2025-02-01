/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'inner-down': 'inset 0 0 4px rgba(0, 0, 0, 0.8)', // Inner shadow with downward direction
      },
      colors: {
        primary: "green",
        'primary-dark': "#e6ffe6",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none', /* Internet Explorer 11 */
          'scrollbar-width': 'none', /* Firefox */
          '&::-webkit-scrollbar': {
            display: 'none !important', /* Chrome, Safari, Edge, Brave */
          },
        },
      });
    },
  ],
};
