/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"IBM Plex Mono"', 'Consolas', 'monospace'],
      },
      colors: {
        bg:             '#080b0f',
        surface:        '#0c1117',
        panel:          '#0f161d',
        border:         '#141c25',
        'border-bright':'#1a2332',
        'text-primary': '#e2e8f0',
        'text-secondary':'#718096',
        'text-muted':   '#4a5568',
        'text-dim':     '#2d3748',
        accent:         '#4299e1',
        'accent-dim':   '#2b6cb0',
        'accent-muted': '#1a3a5c',
        fact:           '#68d391',
        inference:      '#f6ad55',
        unknown:        '#718096',
      },
      fontSize: {
        '2xs': ['0.6rem',  { lineHeight: '0.9rem' }],
        xs:    ['0.68rem', { lineHeight: '1.05rem' }],
        sm:    ['0.75rem', { lineHeight: '1.15rem' }],
        base:  ['0.82rem', { lineHeight: '1.3rem' }],
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
