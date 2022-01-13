const { fontFamily } = require(`tailwindcss/defaultTheme`)
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./content/**/*.md', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Fira Sans', ...fontFamily.sans],
        sans2: ['Archivo', ...fontFamily.sans],
      },
      maxHeight: {
        site: '675px',
      },
      screens: {
        xs: '420px',
        sm: '576px',
        md: '768px',
        lg: '1080px',
      },
      transitionDelay: {
        0: '0ms',
      },
      transitionDuration: {
        0: '0ms',
      },
      typography: theme => ({
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
        50: ' #ffffff',
        100: '#fafdf9',
        200: '#DBEECD',
        300: '#BCDFA1',
        400: '#9CD075',
        500: '#7dc149',
        600: '#49A24C',
        700: '#15824e',
        800: '#175C35',
        900: '#18351c',
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
  plugins: [require('@tailwindcss/typography')],
}
