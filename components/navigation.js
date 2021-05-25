import Link from 'next/link'
import useSellingLive from 'hooks/use-selling-live'
import {useViewer} from 'context/viewer-context'
import useLoginRequired from 'hooks/use-login-required'

const Header = ({children, ...props}) => {
  const sellingLive = useSellingLive()
  const {purchased, viewer, logout} = useViewer()
  const {disableLoginForDev} = useLoginRequired()

  return (
    <div className="absolute top-0 left-0 w-full p-5 print:hidden">
      <nav
        className={`flex items-center max-w-screen-lg mx-auto ${
          sellingLive ? 'justify-between' : 'justify-center'
        } w-full`}
      >
        <Link
          href={purchased ? '/learn' : disableLoginForDev() ? '/learn' : '/'}
        >
          <a
            aria-label="Homepage"
            className="font-serif text-lg font-extrabold leading-tight sm:text-2xl"
          >
            Just JavaScript
          </a>
        </Link>
        <div className="flex items-center justify-center space-x-3 text-sm sm:text-base">
          {sellingLive && (
            <>
              {viewer ? (
                <button
                  onClick={() => logout}
                  type="button"
                  className="opacity-75 hover:opacity-100"
                >
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
