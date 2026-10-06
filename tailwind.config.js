/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        primary: {
          DEFAULT: '#FF9100',
          400: '#FFAD4D',
          500: '#FF9100',
          600: '#CC7400',
        },
        ivory: '#FFFFFF',
        dark: '#000000',
        mint: '#FFFFFF',
        amber: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FFAD4D',
          500: '#FF9100',
          600: '#CC7400',
          700: '#995700',
        },
        slate: {
          50: '#F9FAFB', 
          800: '#111827', 
          900: '#000000', 
        }
      },
      boxShadow: {
        'sm': '2px 2px 0px 0px #000000',
        DEFAULT: '4px 4px 0px 0px #000000',
        'md': '6px 6px 0px 0px #000000',
        'lg': '8px 8px 0px 0px #000000',
        'xl': '12px 12px 0px 0px #000000',
        '2xl': '16px 16px 0px 0px #000000',
        soft: '0 20px 45px -18px rgba(0, 0, 0, 0.35)',
      },
    },
  },
  plugins: [],
};
