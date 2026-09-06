import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    fontSize: {
      tiny:         ['0.58rem',   { lineHeight: '1.4' }],
      micro:        ['0.65rem',   { lineHeight: '1.4' }],
      caption:      ['0.7rem',    { lineHeight: '1.5' }],
      label:        ['0.8rem',    { lineHeight: '1.5' }],
      body:         ['0.825rem',  { lineHeight: '1.5' }],
      'body-md':    ['0.875rem',  { lineHeight: '1.5' }],
      'body-lg':    ['0.9375rem', { lineHeight: '1.5' }],
      ui:           ['1rem',      { lineHeight: '1.5' }],
      'heading-sm': ['1.125rem',  { lineHeight: '1.4' }],
      'heading-md': ['1.25rem',   { lineHeight: '1.4' }],
      'heading-lg': ['1.375rem',  { lineHeight: '1.3' }],
      'title-sm':   ['1.5rem',    { lineHeight: '1.3' }],
      'title-md':   ['1.625rem',  { lineHeight: '1.2' }],
      'title-lg':   ['1.75rem',   { lineHeight: '1.2' }],
      'display-sm': ['2.375rem',  { lineHeight: '1.1' }],
      'display-lg': ['2.75rem',   { lineHeight: '1.1' }]
    },
    extend: {
      colors: {
        bg: {
          primary:   'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          tertiary:  'var(--color-bg-tertiary)',
          elevated:  'var(--color-bg-elevated)'
        },
        border: {
          subtle:   'var(--color-border-subtle)',
          default:  'var(--color-border-default)',
          strong:   'var(--color-border-strong)'
        },
        text: {
          primary:   'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary:  'var(--color-text-tertiary)',
          accent:    'var(--color-text-accent)',
          elevated:  'var(--color-text-elevated)'
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          muted:   'var(--color-accent-muted)'
        },
        teal: {
          DEFAULT: 'var(--color-teal)',
          muted:   'var(--color-teal-muted)'
        },
        risk: {
          critical: 'var(--color-risk-critical)',
          high:     'var(--color-risk-high)',
          medium:   'var(--color-risk-medium)',
          low:      'var(--color-risk-low)'
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace']
      },
      borderRadius: {
        sm:  'var(--radius-sm)',
        md:  'var(--radius-md)',
        lg:  'var(--radius-lg)',
        xl:  'var(--radius-xl)'
      }
    }
  },
  plugins: [typography]
}

export default config