import Link from 'next/link'
import useSellingLive from 'hooks/use-selling-live'
import {useViewer} from 'context/viewer-context'

const Navigation = ({children, className = '', ...props}) => {
  const sellingLive = useSellingLive()
  const {purchased, viewer, logout} = useViewer()

  return (
    <div
      className={`absolute top-0 left-0 z-10 w-full p-5 print:hidden ${className}`}
    >
      <nav
        className={`flex items-center max-w-screen-lg mx-auto ${
          sellingLive
            ? 'justify-between'
            : viewer
            ? 'justify-between'
            : 'justify-center'
        } w-full`}
      >
        <Link href={purchased ? '/learn' : '/'}>
          <a
            aria-label="Homepage"
            className="font-serif text-lg font-bold leading-tight sm:text-2xl"
          >
            Just JavaScript
          </a>
        </Link>
        <div className="flex items-center justify-center space-x-3 text-sm sm:text-base">
          {viewer ? (
            <button
              onClick={() => logout()}
              type="button"
              className="opacity-75 hover:opacity-100"
            >
              Log out
            </button>
          ) : sellingLive ? (
            <Link href="/login">
              <a>Restore purchases</a>
            </Link>
          ) : null}

          {children && <div className="flex items-center p-1">{children}</div>}
        </div>
      </nav>
    </div>
  )
}

export default Navigation
