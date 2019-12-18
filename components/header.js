/** @jsx jsx */
import {jsx} from 'theme-ui'
import Link from 'next/link'
import {useColorMode} from 'theme-ui'

const Header = () => {
  const [colorMode, setColorMode] = useColorMode()
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
      <button
        aria-label={`Toggle ${colorMode === 'default' ? 'dark' : 'light'} mode`}
        sx={{
          px: 2,
          outlineColor: 'primary',
          border: 'none',
          bg: 'transparent',
          color: 'text',
        }}
        onClick={e => {
          setColorMode(colorMode === 'default' ? 'dark' : 'default')
        }}
      >
        {colorMode === 'default' ? (
          <svg
            height="16"
            width="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="currentColor">
              <path
                d="M6,0C2.5,0.9,0,4.1,0,7.9C0,12.4,3.6,16,8.1,16c3.8,0,6.9-2.5,7.9-6C9.9,11.7,4.3,6.1,6,0z"
                fill="currentColor"
              />
            </g>
          </svg>
        ) : (
          <svg
            height="16"
            width="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="currentColor">
              <rect height="2" width="2" x="7" />
              <rect
                height="2"
                width="2"
                transform="matrix(0.7069 0.7074 -0.7074 0.7069 5.9537 -8.2658)"
                x="11.9"
                y="2.1"
              />
              <rect height="2" width="2" x="14" y="7" />
              <rect
                height="2"
                width="2"
                transform="matrix(-0.7074 -0.7069 0.7069 -0.7074 12.956 31.2634)"
                x="11.9"
                y="11.9"
              />
              <rect height="2" width="2" x="7" y="14" />
              <rect
                height="2"
                width="2"
                transform="matrix(-0.7069 -0.7074 0.7074 -0.7069 -3.9536 24.261)"
                x="2.1"
                y="11.9"
              />
              <rect height="2" width="2" y="7" />
              <rect
                height="2"
                width="2"
                transform="matrix(0.7074 0.7069 -0.7069 0.7074 3.0488 -1.2635)"
                x="2.1"
                y="2.1"
              />
              <path
                d="M8,4C5.8,4,4,5.8,4,8s1.8,4,4,4s4-1.8,4-4S10.2,4,8,4z"
                fill="currentColor"
              />
            </g>
          </svg>
        )}
      </button>
    </div>
  )
}

export default Header
