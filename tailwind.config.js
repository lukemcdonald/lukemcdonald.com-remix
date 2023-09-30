import typography from '@tailwindcss/typography'
import colors from 'tailwindcss/colors'

export default {
  content: ['./content/**/*.md', './app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      maxHeight: {
        site: '720px',
      },
      screens: {
        xs: '420px',
        sm: '576px',
        md: '768px',
        lg: '1080px',
      },
      spacing: {
        '30vw': '30vw',
      },
      transitionDelay: {
        0: '0ms',
      },
      transitionDuration: {
        0: '0ms',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.current'),
            },
          },
        },
      }),
    },
    colors: {
      inherit: 'inherit',
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.neutral,
      error: colors.red,
      primary: {
        50: 'var(--color-primary-50)',
        100: 'var(--color-primary-100)',
        200: 'var(--color-primary-200)',
        300: 'var(--color-primary-300)',
        400: 'var(--color-primary-400)',
        500: 'var(--color-primary-500)',
        600: 'var(--color-primary-600)',
        700: 'var(--color-primary-700)',
        800: 'var(--color-primary-800)',
        900: 'var(--color-primary-900)',
      },
    },
  },
  variants: {
    extend: {
      cursor: ['responsive', 'hover'],
      display: ['responsive', 'group-hover', 'last'],
      maxWidth: ['hover', 'focus', 'group-hover'],
      opacity: ['responsive', 'hover', 'focus', 'group-hover'],
      padding: ['hover', 'focus', 'group-hover'],
      transitionDelay: ['hover', 'focus', 'group-hover'],
      transitionDuration: ['hover', 'focus', 'group-hover'],
      visibility: ['responsive', 'group-hover'],
    },
  },
  plugins: [typography],
}
