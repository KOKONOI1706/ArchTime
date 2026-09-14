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
        bg:              '#0d1117',
        surface:         '#161b22',
        panel:           '#1c2128',
        border:          '#21262d',
        'border-bright': '#30363d',
        'text-primary':  '#e6edf3',
        'text-secondary':'#c9d1d9',
        'text-muted':    '#8b949e',
        'text-dim':      '#6e7681',
        'text-faint':    '#484f58',
        accent:          '#388bfd',
        'accent-light':  '#58a6ff',
        'accent-dim':    '#1f4b8e',
        fact:            '#3fb950',
        inference:       '#d29922',
        unknown:         '#8b949e',
      },
      fontSize: {
        '2xs': ['0.65rem',  { lineHeight: '1rem' }],
        xs:    ['0.72rem',  { lineHeight: '1.1rem' }],
        sm:    ['0.8rem',   { lineHeight: '1.25rem' }],
        base:  ['0.88rem',  { lineHeight: '1.4rem' }],
      },
      borderWidth: {
        DEFAULT: '1px',
      },
    },
  },
  plugins: [],
};
