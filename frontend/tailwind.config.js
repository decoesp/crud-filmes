/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Radix Colors - Dark theme
        dark: {
          bg: {
            base: '#111113',
            subtle: '#18181b',
            ui: '#212124',
            hover: '#272729',
            active: '#2e2e32',
          },
          border: {
            subtle: '#38383d',
            ui: '#434348',
            hover: '#504f57',
          },
          text: {
            primary: '#ededef',
            secondary: '#b4b4b9',
            tertiary: '#8e8e93',
          },
        },
        // Radix Colors - Light theme
        light: {
          bg: {
            base: '#ffffff',
            subtle: '#fcfcfc',
            ui: '#f8f8f8',
            hover: '#f3f3f3',
            active: '#ededed',
          },
          border: {
            subtle: '#e8e8e8',
            ui: '#dcdcdc',
            hover: '#c7c7c7',
          },
          text: {
            primary: '#111113',
            secondary: '#60606c',
            tertiary: '#8e8e93',
          },
        },
        // Accent colors
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
