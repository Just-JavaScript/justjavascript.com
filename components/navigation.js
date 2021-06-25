import Link from 'next/link'
import useSellingLive from 'hooks/use-selling-live'
import { useViewer } from 'context/viewer-context'
import { useMedia } from 'react-use'
import { useCommerceMachine } from 'hooks/use-commerce-machine'
import getBundles from 'utils/get-bundles'
import MessageBar from 'components/message-bar'

const Navigation = ({ children, className = '', ...props }) => {
  const isTablet = useMedia('(max-width: 920px)')
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
    !isTablet &&
    !location.pathname.includes('modules')

  return (
    <div
      className={`absolute top-0 left-0 z-10 w-full ${
        showDiscountBar ? 'p-5 pt-16' : 'p-5'
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
              <a className="px-2 py-1 hover:bg-gray-300 hover:bg-opacity-20 rounded-md ease-in-out duration-200 transition-all">
                Login
              </a>
            </Link>
          ) : null}

          {children && <div className="flex items-center p-1">{children}</div>}
        </div>
      </nav>
    </div>
  )
}

export default Navigation
