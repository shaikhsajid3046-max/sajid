import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#080808',
        white: '#F0EDE8',
        accent: '#BFA46D',
        surface: '#111111',
        muted: '#545454',
        border: '#1C1C1C',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Playfair Display', 'serif'],
        body: ['var(--font-body)', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(96px, 12vw, 180px)', { lineHeight: '0.9', fontWeight: '300' }],
        'display-lg': ['clamp(64px, 7vw, 120px)', { lineHeight: '0.95', fontWeight: '300' }],
        'display-md': ['clamp(40px, 4.5vw, 72px)', { lineHeight: '1.0', fontWeight: '300' }],
        'body-xl': ['24px', { lineHeight: '1.5', fontWeight: '300' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.6', fontWeight: '400' }],
        label: ['11px', { lineHeight: '1', fontWeight: '500', letterSpacing: '0.15em' }],
      },
      spacing: {
        xs: '8px',
        sm: '16px',
        md: '32px',
        lg: '64px',
        xl: '120px',
        'nav-h': '64px',
      },
      zIndex: {
        base: '1',
        card: '10',
        preview: '40',
        nav: '100',
        menu: '200',
        cursor: '300',
        preloader: '400',
      },
      transitionTimingFunction: {
        'out-power3': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'inout-power1': 'cubic-bezier(0.76, 0, 0.24, 1)',
        'inout-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
    },
  },
  plugins: [],
}

export default config
