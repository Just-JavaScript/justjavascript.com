const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
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
      colors: {
        ...colors,
      },
      screens: {
        print: { raw: 'print' },
      },
      fontFamily: {
        sans: ['Adelle Sans', ...defaultTheme.fontFamily.sans],
        serif: ['Recoleta', ...defaultTheme.fontFamily.serif],
        mono: ['Adelle Mono', ...defaultTheme.fontFamily.mono],
      },
      lineHeight: {
        tighter: 1.2,
      },
      fontSize: {
        // Minor third
        '9xl': '6.192rem',
        '8xl': '5.16rem',
        '7xl': '4.3rem',
        '6xl': '3.583rem',
        '5xl': '2.986rem',
        '4xl': '2.488rem',
        '3xl': '2.074rem',
        '2xl': '1.728rem',
        xl: '1.44rem',
        lg: '1.2rem',
        base: '1rem',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            fontFamily: theme('fontFamily.sans').join(', '),
            fontSize: theme('fontSize.base'),
            color: theme('colors.black'),
            'h1, h2': {
              textAlign: 'center',
              padding: '1em 0',
            },
            'h1, h2, h3, h4': {
              color: theme('colors.black'),
              lineHeight: theme('lineHeight.tighter'),
              // fontFamily: theme('fontFamily.serif').join(', '),
              code: {
                fontSize: '90%',
              },
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

            strong: { fontWeight: theme('fontWeight.bold') },
            a: {
              color: theme('colors.orange.500'),
              textDecoration: 'underline',
              transition: 'all 150ms ease-in-out',
              '&:hover': {
                color: theme('colors.orange.500'),
                transition: 'all 150ms ease-in-out',
              },
            },
          },
        },
        xl: {
          css: {
            fontSize: theme('fontSize.xl'),
            'h1, h2, h3, h4, h5': {
              lineHeight: theme('lineHeight.tighter'),
            },
            h1: {
              fontSize: theme('fontSize.8xl'),
              fontWeight: theme('fontWeight.extrabold'),
            },
            h2: {
              fontSize: theme('fontSize.7xl'),
              fontWeight: theme('fontWeight.extrabold'),
            },
            h3: {
              fontSize: theme('fontSize.5xl'),
              fontWeight: theme('fontWeight.semibold'),
            },
            h4: {
              fontSize: theme('fontSize.3xl'),
              fontWeight: theme('fontWeight.extrabold'),
            },
            h5: {
              fontSize: theme('fontSize.2xl'),
              fontWeight: theme('fontWeight.bold'),
            },
          },
        },
        lg: {
          css: {
            fontFamily: theme('fontFamily.sans').join(', '),
            fontSize: theme('fontSize.lg'),
            color: theme('colors.black'),
            'h1, h2, h3, h4': {
              color: theme('colors.black'),
              lineHeight: theme('lineHeight.tighter'),
              fontFamily: theme('fontFamily.serif').join(', '),
              code: {
                fontSize: '80%',
              },
            },
            h1: {
              fontSize: theme('fontSize.5xl'),
              fontWeight: theme('fontWeight.extrabold'),
            },
            h2: {
              fontSize: theme('fontSize.4xl'),
              fontWeight: theme('fontWeight.extrabold'),
            },
            h3: {
              fontSize: theme('fontSize.3xl'),
              fontWeight: theme('fontWeight.extrabold'),
            },
            h4: {
              fontSize: theme('fontSize.2xl'),
              fontWeight: theme('fontWeight.extrabold'),
            },
            h5: {
              fontSize: theme('fontSize.xl'),
              fontWeight: theme('fontWeight.extrabold'),
            },
            code: {
              background: theme('colors.gray.100'),
              borderRadius: 3,
              padding: '1px 5px 3px 5px',
            },
          },
        },
        serif: {
          css: {
            fontFamily: theme('fontFamily.sans').join(', '),
            fontSize: theme('fontSize.base'),
            color: theme('colors.black'),
            'h1, h2, h3, h4': {
              color: theme('colors.black'),
              lineHeight: theme('lineHeight.tighter'),
              fontFamily: theme('fontFamily.serif').join(', '),
              code: {
                fontSize: '90%',
              },
            },
            h1: {
              fontSize: theme('fontSize.5xl'),
              fontWeight: theme('fontWeight.extrabold'),
            },
            h2: {
              fontSize: theme('fontSize.4xl'),
              fontWeight: theme('fontWeight.extrabold'),
            },
            h3: {
              fontSize: theme('fontSize.3xl'),
              fontWeight: theme('fontWeight.bold'),
            },
            h4: {
              fontSize: theme('fontSize.2xl'),
              fontWeight: theme('fontWeight.bold'),
            },
            h5: {
              fontSize: theme('fontSize.xl'),
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
            strong: { fontWeight: theme('fontWeight.bold') },
            a: {
              color: theme('colors.blue.500'),
              textDecoration: 'underline',
              transition: 'all 150ms ease-in-out',
              '&:hover': {
                color: theme('colors.blue.600'),
                transition: 'all 150ms ease-in-out',
              },
            },
          },
        },
        sans: {
          css: {
            fontFamily: theme('fontFamily.sans').join(', '),
            fontSize: theme('fontSize.lg'),
            color: theme('colors.black'),
            'h1, h2, h3': {
              textAlign: 'left',
              padding: 'inherit',
            },
            'h1, h2, h3, h4': {
              color: theme('colors.black'),
              code: {
                fontSize: '90%',
              },
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
            strong: { fontWeight: theme('fontWeight.bold') },
            a: {
              color: theme('colors.orange.500'),
              textDecoration: 'underline',
              transition: 'all 150ms ease-in-out',
              '&:hover': {
                color: theme('colors.orange.600'),
                transition: 'all 150ms ease-in-out',
              },
            },
          },
        },
        'sans-lg': {
          css: {
            fontFamily: theme('fontFamily.sans').join(', '),
            fontSize: theme('fontSize.lg'),
            color: theme('colors.black'),
            'h1, h2, h3': {
              textAlign: 'left',
              padding: 'inherit',
            },
            'h1, h2, h3, h4': {
              color: theme('colors.black'),
              code: {
                fontSize: '80%',
              },
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
            strong: { fontWeight: theme('fontWeight.bold') },
            a: {
              color: theme('colors.blue.500'),
              textDecoration: 'underline',
              transition: 'all 150ms ease-in-out',
              '&:hover': {
                color: theme('colors.blue.600'),
                transition: 'all 150ms ease-in-out',
              },
            },
          },
        },
      }),
      boxShadow: {
        lg: '0 10px 30px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  variants: { scale: ['hover', 'group-hover'] },
  plugins: [
    require('@tailwindcss/ui'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
