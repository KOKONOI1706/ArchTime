/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', '"IBM Plex Mono"', 'Consolas', 'monospace'],
      },
      colors: {
        bg: '#050505',
        surface: '#0a0a0a',
        panel: '#0f0f0f',
        border: '#1a1a1a',
        'border-bright': '#2a2a2a',
        'text-primary': '#f0f0f0',
        'text-secondary': '#888888',
        'text-muted': '#444444',
        'text-dim': '#2a2a2a',
        accent: '#d0d0d0',
        'accent-dim': '#606060',
        dot: '#ffffff',
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
        xs: ['0.7rem', { lineHeight: '1.1rem' }],
        sm: ['0.75rem', { lineHeight: '1.2rem' }],
      },
      borderWidth: {
        DEFAULT: '1px',
      },
      spacing: {
        px: '1px',
      },
    },
  },
  plugins: [],
};
