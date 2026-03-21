export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Instrument Serif"', 'serif'],
        body: ['"Barlow"', 'sans-serif'],
      },
      colors: {
        background: 'rgb(213 45% 67%)',
        foreground: 'rgb(0 0% 100%)',
        primary: 'rgb(0 0% 100%)',
        'primary-foreground': 'rgb(213 45% 67%)',
        border: 'rgb(0 0% 100% / 0.2)',
      },
      borderRadius: {
        '4xl': '9999px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
