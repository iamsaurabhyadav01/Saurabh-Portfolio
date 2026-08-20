/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(30, 41, 59, 0.08), 0 1px 2px -1px rgba(30, 41, 59, 0.06)',
        cardHover: '0 8px 20px -4px rgba(30, 41, 59, 0.12), 0 4px 8px -4px rgba(30, 41, 59, 0.08)',
      },
    },
  },
  plugins: [],
};
