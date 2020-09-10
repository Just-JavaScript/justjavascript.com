module.exports = {
  purge: [
    './components/**/*.js',
    './templates/**/*.js',
    './pages/**/*.js',
    './pages/**/*.mdx',
  ],
  theme: {
    fontFamily: {
      serif: ['"ff-meta-serif-web-pro"', 'system-ui', 'serif'],
      display: ['"ff-meta-headline-web-pro"', 'system-ui', 'sans'],
      mono: ['"ibm-plex-mono"', 'monospace'],
    },
    typography: (theme) => ({
      default: {
        css: {
          fontFamily: 'ff-meta-web-pro, system-ui, sans-serif',
          'h1,h2,h3,h4,h5': {
            fontFamily: 'ff-meta-serif-web-pro, system-ui, serif',
          },
          color: theme('colors.gray.800'),
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
          a: {
            color: theme('colors.indigo.600'),
            textDecoration: 'none',
          },
        },
      },
    }),
    extend: {},
  },
  variants: {},
  future: {removeDeprecatedGapUtilities: true, purgeLayersByDefault: true},
  plugins: [require('@tailwindcss/ui'), require('@tailwindcss/typography')],
}
