import Link from 'next/link'
import useSellingLive from 'hooks/use-selling-live'
import {useViewer} from 'context/viewer-context'

const Header = ({children, ...props}) => {
  const sellingLive = useSellingLive()
  const {purchased, viewer, logout} = useViewer()

  return (
    <div className="mb-16 sm:mb-24">
      <nav
        className={`flex items-center ${
          sellingLive ? 'justify-between' : 'justify-center'
        } w-full max-w-screen-xl sm:mx-auto`}
      >
        <Link href={purchased ? '/learn' : '/'}>
          <a
            aria-label="Homepage"
            className="py-5 font-serif text-xl font-extrabold leading-tight sm:text-2xl sm:py-8"
          >
            Just JavaScript
          </a>
        </Link>
        <div className="flex items-center justify-center">
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
          {children && (
            <div className="flex items-center px-5 py-3">{children}</div>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Header
