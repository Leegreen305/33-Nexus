import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'nexus-void': '#080808',
        'nexus-deep': '#0D0D0D',
        'nexus-surface': '#141414',
        'nexus-border': '#1F1F1F',
        'nexus-gold': '#C9A84C',
        'nexus-gold-light': '#E8C97A',
        'nexus-gold-dark': '#8B6914',
        'nexus-crimson': '#8B0000',
        'nexus-electric': '#00D4FF',
        'nexus-text': '#F5F0E8',
        'nexus-muted': '#6B6560',
        'nexus-glow': 'rgba(201,168,76,0.15)',
      },
      fontFamily: {
        display: ['Cormorant Garamond', ...fontFamily.serif],
        heading: ['Bebas Neue', ...fontFamily.sans],
        body: ['DM Sans', ...fontFamily.sans],
        mono: ['JetBrains Mono', ...fontFamily.mono],
        accent: ['Playfair Display', ...fontFamily.serif],
      },
      fontSize: {
        'display': ['9.9rem', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'h1': ['6.6rem', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'h2': ['3.3rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'h3': ['2.2rem', { lineHeight: '1.2', letterSpacing: '-0.005em' }],
        'body': ['1.1rem', { lineHeight: '1.7' }],
        'small': ['0.88rem', { lineHeight: '1.5' }],
        'micro': ['0.66rem', { lineHeight: '1.4', letterSpacing: '0.05em' }],
      },
      spacing: {
        '8px': '8px',
        '33': '33px',
        '66': '66px',
        '88': '88px',
        '99': '99px',
        '333': '333px',
        '888': '888px',
      },
      borderRadius: {
        'sacred': '3.3rem',
        'card': '1.1rem',
        'button': '33px',
        'sm': '0.33rem',
      },
      boxShadow: {
        'gold': '0 0 33px rgba(201,168,76,0.33)',
        'gold-lg': '0 0 66px rgba(201,168,76,0.33)',
        'gold-sm': '0 0 16px rgba(201,168,76,0.15)',
        'card': '0 8px 33px rgba(0,0,0,0.5)',
        'card-hover': '0 16px 66px rgba(0,0,0,0.8), 0 0 33px rgba(201,168,76,0.15)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #E8C97A 33%, #C9A84C 66%, #8B6914 100%)',
        'void-gradient': 'radial-gradient(ellipse at 33% 33%, rgba(201,168,76,0.03) 0%, transparent 70%)',
        'surface-gradient': 'linear-gradient(180deg, #0D0D0D 0%, #080808 100%)',
        'card-gradient': 'linear-gradient(135deg, #141414 0%, #0D0D0D 100%)',
      },
      animation: {
        'float': 'float 6.6s ease-in-out infinite',
        'pulse-gold': 'pulseGold 3.3s ease-in-out infinite',
        'shimmer': 'shimmer 2.2s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'draw-line': 'drawLine 0.99s ease-out forwards',
        'fade-up': 'fadeUp 0.66s ease-out forwards',
        'scale-in': 'scaleIn 0.33s ease-out forwards',
        'glow-pulse': 'glowPulse 3.3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGold: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        drawLine: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 16px rgba(201,168,76,0.15)' },
          '50%': { boxShadow: '0 0 33px rgba(201,168,76,0.4)' },
        },
      },
      transitionDuration: {
        '33': '33ms',
        '66': '66ms',
        '330': '330ms',
        '660': '660ms',
        '990': '990ms',
        '3300': '3300ms',
      },
      zIndex: {
        '33': '33',
        '66': '66',
        '99': '99',
        '333': '333',
      },
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '833px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      gridTemplateColumns: {
        '8': 'repeat(8, minmax(0, 1fr))',
      },
      gap: {
        '33': '33px',
      },
      height: {
        '88vh': '88vh',
        'screen-88': '88vh',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
