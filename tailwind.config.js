const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: {
    content: [
      './components/**/*.js',
      './templates/**/*.js',
      './pages/**/*.js',
      './pages/**/*.mdx',
      './data/**/*',
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        serif: ['ff-meta-serif-web-pro', ...defaultTheme.fontFamily.serif],
        display: ['ff-meta-headline-web-pro', ...defaultTheme.fontFamily.sans],
        sans: ['ff-meta-web-pro', ...defaultTheme.fontFamily.sans],
        mono: ['ibm-plex-mono', ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        // Perfect fourth
        base: '1em',
        lg: '1.25em',
        xl: '1.563em',
        '2xl': '2.441em',
        '3xl': '3.052em',
        '4xl': '3.815em',
        '5xl': '4.768em',
      },
      typography: (theme) => ({
        lg: {
          css: {
            fontFamily: theme('fontFamily.sans').join(', '),
            fontSize: theme('fontSize.lg'),
            color: theme('colors.black'),
            'h1, h2, h3, h4': {
              color: theme('colors.black'),
              fontFamily: theme('fontFamily.serif').join(', '),
            },
            h1: {
              fontSize: theme('fontSize.4xl'),
              fontWeight: theme('fontWeight.extrabold'),
            },
            h2: {
              fontSize: theme('fontSize.3xl'),
              fontWeight: theme('fontWeight.extrabold'),
            },
            h3: {
              fontSize: theme('fontSize.2xl'),
              fontWeight: theme('fontWeight.bold'),
            },
            h4: {
              fontSize: theme('fontSize.xl'),
              fontWeight: theme('fontWeight.bold'),
            },
            h5: {
              fontSize: theme('fontSize.lg'),
              fontWeight: theme('fontWeight.bold'),
            },
            code: {
              background: theme('colors.gray.100'),
              borderRadius: 3,
              padding: '1px 5px 3px 5px',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            strong: {fontWeight: theme('fontWeight.extrabold')},
            a: {
              color: theme('colors.indigo.600'),
              textDecoration: 'none',
            },
          },
        },
        DEFAULT: {
          css: {
            fontFamily: theme('fontFamily.sans').join(', '),
            fontSize: theme('fontSize.base'),
            color: theme('colors.black'),
            'h1, h2, h3, h4': {
              color: theme('colors.black'),
              fontFamily: theme('fontFamily.serif').join(', '),
            },
            h1: {
              fontSize: theme('fontSize.3xl'),
              fontWeight: theme('fontWeight.extrabold'),
            },
            h2: {
              fontSize: theme('fontSize.2xl'),
              fontWeight: theme('fontWeight.extrabold'),
            },
            h3: {
              fontSize: theme('fontSize.xl'),
              fontWeight: theme('fontWeight.bold'),
            },
            h4: {
              fontSize: theme('fontSize.lg'),
              fontWeight: theme('fontWeight.bold'),
            },
            h5: {
              fontSize: theme('fontSize.lg'),
              fontWeight: theme('fontWeight.normal'),
            },
            code: {
              background: theme('colors.gray.100'),
              borderRadius: 3,
              padding: '1px 5px 3px 5px',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            strong: {fontWeight: theme('fontWeight.extrabold')},
            a: {
              color: theme('colors.indigo.600'),
              textDecoration: 'none',
            },
          },
        },
      }),
      boxShadow: {
        lg:
          '0 10px 30px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/ui'), require('@tailwindcss/typography')],
}
