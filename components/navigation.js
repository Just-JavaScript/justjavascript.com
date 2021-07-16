import Link from 'next/link'
import useSellingLive from 'hooks/use-selling-live'
import { useViewer } from 'context/viewer-context'
import { useCommerceMachine } from 'hooks/use-commerce-machine'
import getBundles from 'utils/get-bundles'
import MessageBar from 'components/message-bar'
import { useRouter } from 'next/router'
import Tippy from '@tippyjs/react'

const Navigation = ({ children, className = '', displayLogout, ...props }) => {
  const router = useRouter()
  const sellingLive = useSellingLive()
  const sellable = getBundles()[0]
  const { purchased, viewer, logout } = useViewer()
  const [state] = useCommerceMachine({ sellable })

  const displayPrice =
    state.matches('priceLoaded') || state.matches('purchasing')
      ? state.context.price.price
      : '--'
  const displayFullPrice =
    state.matches('priceLoaded') || state.matches('purchasing')
      ? state.context.price.full_price
      : '--'

  const noDiscountAvailable =
    state.matches('priceLoaded') && displayPrice / displayFullPrice === 1

  const showDiscountBar =
    state.matches('priceLoaded') &&
    !noDiscountAvailable &&
    sellingLive &&
    !viewer &&
    !location.pathname.includes('modules')

  return (
    <div
      className={`absolute top-0 transition-all duration-700 ease-in-out left-0 z-10 w-full ${
        showDiscountBar ? 'p-5 sm:pt-16 pt-14' : 'p-5'
      } print:hidden ${className}`}
    >
      {sellingLive && showDiscountBar && (
        <MessageBar
          state={state}
          displayPrice={displayPrice}
          displayFullPrice={displayFullPrice}
        />
      )}
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
            className="font-serif text-lg font-bold leading-none sm:text-xl"
          >
            Just JavaScript
          </a>
        </Link>
        <div className="flex items-center justify-center text-sm sm:text-sm">
          {viewer && router.pathname === '/' && (
            <Link href="/learn">
              <a className="mr-2 flex-shrink-0 px-3 py-2 bg-gray-900 hover:bg-gray-300 hover:bg-opacity-20 rounded-full ease-in-out duration-200 transition-all">
                Access Content
              </a>
            </Link>
          )}
          {viewer ? (
            displayLogout && (
              <>
                <div className="sm:hidden block sm:ml-0 ml-5">
                  <Tippy
                    content="Log out"
                    className="px-2 py-1 bg-gray-800 flex rounded-sm text-white text-sm"
                  >
                    <button
                      onClick={() => logout()}
                      type="button"
                      className="opacity-90 hover:opacity-100 py-1 inline-flex items-center justify-center transition-colors ease-in-out duration-100"
                    >
                      <i className="gg-log-out rotate-180 block scale-90" />
                    </button>
                  </Tippy>
                </div>
                <div className="sm:block hidden">
                  <button
                    onClick={() => logout()}
                    type="button"
                    className="flex-shrink-0 px-3 py-2 hover:bg-gray-300 hover:bg-opacity-20 rounded-full ease-in-out duration-200 transition-all"
                  >
                    Log out
                  </button>
                </div>
              </>
            )
          ) : sellingLive ? (
            <Link href="/login">
              <a className="px-3 py-2 hover:bg-gray-300 hover:bg-opacity-20 rounded-full ease-in-out duration-200 transition-all">
                Access Purchases
              </a>
            </Link>
          ) : null}

          {children && <div>{children}</div>}
        </div>
      </nav>
    </div>
  )
}

export default Navigation
