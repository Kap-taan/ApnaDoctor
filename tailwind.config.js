/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(236, 101, 61)',
        bodyBG: 'rgb(20, 20, 22)',
        navText: 'rgb(117, 123, 138)',
        btnBorder: 'rgb(108, 112, 127)',
        hoverText: 'rgb(231, 231, 231)',
        border: 'rgb(36, 38, 44)',
        inputContainer: 'rgb(10, 10, 10)',
        inputBorder: 'rgb(37, 36, 36)',
        bubble: {
          100: '#4671F6',
          200: '#8E5AD0',
          300: '#DD5471',
          400: '#64B072'
        },
        cardSmallFont: 'rgb(109, 117, 140)',
        cardBackground: 'rgb(26, 26, 26)',
        infoBackground: 'rgb(39, 39, 39)',
        infoField: 'rgb(26, 26, 26)',
        infoLabel: 'rgb(133, 133, 133)',
        borderColor: 'rgb(40,40,40)'
      },
      fontFamily: {
        body: ['Nunito']
      }
    },
  },
  plugins: [],
}
