import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
          950: '#042F2E',
        },
        cyan: {
          500: '#06B6D4',
          600: '#0891B2',
          700: '#0E7490',
        },
        gold: {
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
        optical: {
          dark: '#070B14',
          surface: '#0F172A',
          card: '#1E293B',
          lightBg: '#F8FAFC',
          lightSurface: '#FFFFFF',
          lightCard: 'rgba(255, 255, 255, 0.85)',
          lightBorder: 'rgba(226, 232, 240, 0.8)',
          glassBorder: 'rgba(255, 255, 255, 0.12)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Outfit', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glass-sm': '0 4px 16px 0 rgba(0, 0, 0, 0.05)',
        'glass-md': '0 8px 32px 0 rgba(15, 23, 42, 0.08)',
        'glass-lg': '0 16px 48px 0 rgba(15, 23, 42, 0.12)',
        'glass-glow': '0 0 25px -5px rgba(20, 184, 166, 0.25)',
        'glass-glow-gold': '0 0 25px -5px rgba(245, 158, 11, 0.25)',
        'dark-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        'dark-glow': '0 0 30px -5px rgba(6, 182, 212, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
        '2xl': '40px',
        '3xl': '60px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
