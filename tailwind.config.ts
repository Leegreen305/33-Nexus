import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'nexus-void': '#000000',
        'nexus-surface': '#0D0D0D',
        'nexus-border': 'rgba(255,255,255,0.06)',
        'nexus-text': '#FFFFFF',
        'nexus-muted': '#555555',
        'nexus-accent': '#7DF9FF',
        'nexus-accent-2': '#BF5AF2',
      },
      fontFamily: {
        heading: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Cormorant Garamond', 'serif'],
      },
      screens: {
        md: '833px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
