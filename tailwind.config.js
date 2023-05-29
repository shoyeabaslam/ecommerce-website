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
      "navbar-color":'#B5F3D4',
      "customrosered":'#ff5a83',
    },
    
    },
  },
  plugins: [],
}
