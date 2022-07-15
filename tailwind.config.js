module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      dropShadow: {
        'sm': '0 35px 35px rgba(255, 255, 255, 0.25)'
      },
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
    screens: {
      //custom
      xm: '350px',
      // default
      sm: '640px',

      md: '768px',

      lg: '1024px',

      xl: '1280px',

      '2xl': '1536px',
    },
  },
  plugins: [],
}
