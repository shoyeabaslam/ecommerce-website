/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        extraSmall: '10px',
      },
      boxShadow:{
        'shadow1':'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;',
        'shadow2':'rgba(0, 0, 0, 0.1) 0px 10px 50px;'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily:{
        'Roboto': ['Roboto', 'sans-serif'],
        'Alegreya': ['Alegreya', 'serif'],
        'Eczar': ['Eczar', 'serif'],
      }
      ,
    colors:{
      'bold-green': '#22AC56   ',
      "white":"#ffffff",
      "lightred":'#EC2657',
      "lightredhover":'#FF0040',
      "primaryProductCartColor":'#F9FFF6',
      "maron":'#173334',
      "navbar-color":'#002e54',
      "customrosered":'#ff5a83',
    },
    
    },
  },
  plugins: [],
}
