module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], // Adding Poppins font to Tailwind
      },
      backgroundImage: {
        'custom-bg': "url('/public/images/tt.png')", // Correct path to public folder
      },
    },
  },
  plugins: [],
};
