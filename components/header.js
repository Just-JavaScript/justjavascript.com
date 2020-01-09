/** @jsx jsx */
import {jsx} from 'theme-ui'
import Link from 'next/link'
import {useColorMode, useThemeUI} from 'theme-ui'

const Header = () => {
  const [colorMode, setColorMode] = useColorMode()
  const context = useThemeUI()
  const {theme} = context

  return (
    <div
      sx={{
        width: '100%',
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'center',
        mb: [4, 5],
      }}
    >
      <Link href="/">
        <a aria-label="Homepage">
          <svg
            sx={{
              width: '42px',
              height: 'auto',
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="105"
            viewBox="0 0 80 105"
          >
            <g fill="none">
              <path
                sx={{fill: 'text'}}
                d="M0,0 L80,0 L80,72 C80,90.2253967 65.2253967,105 47,105 L14,105 L14,18 C14,14.1340068 10.8659932,11 7,11 L7,11 L0,11 L0,0 Z"
              />
              <path
                sx={{fill: 'background'}}
                d="M30.1190399 92.2396774C37.1345595 90.9054375 40.9220792 88.2799977 40.9220792 81.3075182L40.9220792 61.1647996C40.9220792 58.7115198 41.6107191 58.1089598 43.934879 58.0659198L43.934879 56 31.1519999 56 31.1519999 58.0659198C33.4331197 58.1089598 34.1647997 58.7115198 34.1647997 61.1647996L34.1647997 81.6087982C34.1647997 86.3862378 33.5622397 88.1078377 29 90.3028776L30.1190399 92.2396774zM56.5548793 86.9887978C63.8716788 86.9887978 67.9604785 83.5455981 67.9604785 77.3478385 67.9604785 72.0108789 64.7755188 69.3423991 59.9119991 68.0942392L56.9852793 67.3625592C53.8863995 66.5878393 52.8534396 65.2105594 52.8534396 62.8863995 52.8534396 60.3470397 54.2307195 58.7545598 57.0713593 58.7545598 60.5575991 58.7545598 61.676639 60.8204797 62.063999 64.0484794L66.4540787 64.0484794 66.4540787 58.1089599C65.0337588 57.2911999 62.2361589 56 57.5878393 56 51.3039997 56 47.2152 59.1849598 47.2152 65.2966393 47.2152 70.418399 49.8406398 72.6995188 54.3598395 73.9046387L57.4156793 74.7223987C60.858879 75.6692786 62.020959 77.0035185 62.020959 79.6719983 62.020959 82.9430381 60.1702391 84.449438 56.9422393 84.449438 53.6281595 84.449438 51.9495997 82.8139181 51.5191997 78.8542384L47 78.8542384 47 84.578558C48.9367999 85.6975979 51.6052797 86.9887978 56.5548793 86.9887978z"
              />
            </g>
          </svg>
        </a>
      </Link>
      <ColorModeToggle
        colorMode={colorMode}
        setColorMode={setColorMode}
        theme={theme}
      />
    </div>
  )
}

const ColorModeToggle = ({colorMode, setColorMode, theme}) => {
  return (
    <button
      onClick={() => {
        setColorMode(colorMode === 'default' ? 'dark' : 'default')
      }}
      aria-label={`Activate ${colorMode === 'default' ? 'dark' : 'light'} mode`}
      title={`Activate ${colorMode === 'default' ? 'dark' : 'light'} mode`}
      sx={{
        position: 'relative',
        alignItems: 'center',
        bg: 'transparent',
        border: 0,
        borderRadius: '5px',
        display: ['inline-flex', 'flex'],
        cursor: 'pointer',
        justifyContent: 'center',
        opacity: 0.6,
        transition: 'opacity 0.3s ease',
        width: '40px',
        height: '40px',
        transform: 'scale(0.8)',
        ':focus': {
          outline: '2px solid',
          outlineColor: 'primary',
          outlineOffset: '1px',
        },
        ':hover, :focus': {
          opacity: '1',
        },
      }}
    >
      <div
        sx={{
          bg: 'text',
          borderRadius: '50%',
          overflow: colorMode === 'default' ? 'hidden' : 'visible',
          position: 'relative',
          transform: `scale(${colorMode === 'default' ? 1 : 0.55})`,
          transition: 'all 0.45s ease',
          width: '24px',
          height: '24px',
          '&::before': {
            bg: 'background',
            border: '2px solid ',
            borderColor: 'background',
            borderRadius: '50%',
            content: '""',
            width: '24px',
            height: '24px',
            opacity: colorMode === 'default' ? 1 : 0,
            position: 'absolute',
            right: '-9px',
            top: '-9px',
            transform: `translate(${
              colorMode === 'default' ? '0, 0' : '14px, -14px'
            })`,
            transition: 'transform 0.45s ease',
          },
          '&::after': {
            borderRadius: '50%',
            boxShadow: `0 -23px 0 ${theme.colors.text},
          0 23px 0 ${theme.colors.text},
          23px 0 0 ${theme.colors.text},
          -23px 0 0 ${theme.colors.text},
          15px 15px 0 ${theme.colors.text},
          -15px 15px 0 ${theme.colors.text},
          15px -15px 0 ${theme.colors.text},
          -15px -15px 0 ${theme.colors.text}`,
            content: '""',
            width: '8px',
            height: '8px',
            left: '50%',
            margin: '-4px 0 0 -4px',
            position: 'absolute',
            top: '50%',
            transform: `scale(${colorMode === 'default' ? 0 : 1})`,
            transition: 'all 0.35s ease',
          },
        }}
      />
      <div
        sx={{
          position: 'absolute',
          right: '-1px',
          top: '-8px',
          height: '24px',
          width: '24px',
          borderRadius: '50%',
          border: '0',
          backgroundColor: 'background',
          transform: `translate(${
            colorMode === 'default' ? '0, 0' : '14px, -14px'
          })`,
          opacity: colorMode === 'default' ? 1 : 0,
          transition: 'transform 0.45s ease',
        }}
      />
    </button>
  )
}

export default Header
