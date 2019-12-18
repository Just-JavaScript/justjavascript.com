import Typography from 'typography'
import funstonTheme from 'typography-theme-funston'

const typography = new Typography(
  {
    baseFontSize: '22px',
    baseLineHeight: 1.5,
    headerFontFamily: ['ff-meta-headline-web-pro', 'system-ui', 'sans-serif'],
    bodyFontFamily: ['ff-meta-serif-web-pro', 'system-ui', 'serif'],
    bodyFontWeight: '400',
  },
  funstonTheme
)

export default typography
