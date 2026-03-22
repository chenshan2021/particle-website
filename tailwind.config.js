import tailwindcssAnimate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
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
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        border: 'hsl(var(--border))',
      },
      borderRadius: {
        '4xl': '9999px',
      },
      screens: {
        '3xl': '1920px',
      },
    },
  },
  plugins: [tailwindcssAnimate],
}
