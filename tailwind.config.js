/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4361EE',
          hover: '#3451D1',
          50: '#EEF1FD',
        },
        danger: '#FA5252',
        surface: '#FFFFFF',
        muted: '#868E96',
        border: '#E9ECEF',
        page: '#F6F6F6',
        login: '#474747',
        'table-row-active': '#F0F3FF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 12px rgba(0,0,0,0.06)',
        'card-lg': '0 4px 24px rgba(0,0,0,0.10)',
      },
      borderRadius: {
        card: '12px',
      },
      keyframes: {
        loading: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(400%)' },
        },
      },
      animation: {
        loading: 'loading 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
