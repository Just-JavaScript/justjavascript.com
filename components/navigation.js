import Link from 'next/link'
import useSellingLive from 'hooks/use-selling-live'
import {useViewer} from 'context/viewer-context'

const Header = ({children, ...props}) => {
  const sellingLive = useSellingLive()
  const {purchased, viewer, logout} = useViewer()

  return (
    <div className="absolute top-0 left-0 w-full p-5">
      <nav
        className={`flex items-center ${
          sellingLive ? 'justify-between' : 'justify-center'
        } w-full`}
      >
        <Link href={purchased ? '/learn' : '/'}>
          <a
            aria-label="Homepage"
            className="font-serif text-xl font-extrabold leading-tight sm:text-2xl"
          >
            Just JavaScript
          </a>
        </Link>
        <div className="flex items-center justify-center space-x-3">
          {sellingLive && (
            <>
              {viewer ? (
                <button onClick={() => logout} type="button">
                  Log out
                </button>
              ) : (
                <Link href="/login">
                  <a>Restore purchases</a>
                </Link>
              )}
            </>
          )}
          {children && <div className="flex items-center p-1">{children}</div>}
        </div>
      </nav>
    </div>
  )
}

export default Header
