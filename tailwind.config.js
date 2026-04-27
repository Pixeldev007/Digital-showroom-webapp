/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#F8FAFC',
        surface: '#FFFFFF',
        primary: {
          DEFAULT: '#2563EB',
          dark: '#0F1B35',
        },
        accent: '#F97316',
        success: '#16A34A',
        warning: '#D97706',
        danger: '#DC2626',
        text: {
          primary: '#1C1C1E',
          secondary: '#64748B',
        },
        border: '#E2E8F0',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        heading: ['"Sora"', 'sans-serif'],
        mono: ['"Geist Mono"', 'monospace'],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [],
}
