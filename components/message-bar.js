import React from 'react'
import { scroller } from 'react-scroll'
import { useRouter } from 'next/router'
import ReactCountdown, { zeroPad } from 'react-countdown'

const Countdown = ({ date }) => {
  const numberOf = (number, label) => {
    return (
      <div className="flex flex-row items-baseline ">
        <div className="text-sm leading-[100%] tabular-nums">
          {zeroPad(number)}
        </div>
        <div className="text-xs pl-px opacity-80 leading-[100%]">{label}</div>
      </div>
    )
  }
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return null
    } else {
      return (
        <div className="flex space-x-3 itesm-center justify-center">
          <div className="text-xs flex items-center">Ending in:</div>
          <div className="grid grid-flow-col gap-2 items-center justify-center">
            {days > 0 && numberOf(days, 'd')}
            {numberOf(hours, 'h')}
            {numberOf(minutes, 'm')}
            {numberOf(seconds, 's')}
          </div>
        </div>
      )
    }
  }
  return (
    <ReactCountdown zeroPadTime={2} date={Number(date)} renderer={renderer} />
  )
}

export default function MessageBar({ state, displayFullPrice, displayPrice }) {
  const router = useRouter()
  const savings = (
    <strong className="font-semibold">
      {state.matches('priceLoaded') ? (
        100 - Math.ceil((displayPrice / displayFullPrice) * 100)
      ) : (
        <span style={{ width: 19 }} className="inline-block">
          —
        </span>
      )}
      %
    </strong>
  )
  return (
    <div className="absolute space-x-2 top-0 left-0 flex items-center sm:justify-center justify-between sm:px-3 px-1 h-10 w-full bg-white text-black">
      <div className="flex items-center py-2 ">
        <div className="text-sm">
          <span role="img" aria-label="crystal ball">
            🔮
          </span>{' '}
          Launch discount
        </div>
      </div>

      <button
        className="bg-black py-1 transform hover:scale-105 transition-all ease-in-out duration-200 text-white rounded-sm px-4 text-sm font-semibold"
        onClick={() =>
          router.pathname !== '/'
            ? router.push('/?buy')
            : scroller.scrollTo('buy', {
                duration: 400,
                smooth: 'easeIn',
                offset: -30,
              })
        }
      >
        Save {savings}
      </button>
      <div>
        {state?.context?.price?.coupon?.coupon_expires_at && (
          <Countdown
            date={Number(
              `${state.context.price.coupon.coupon_expires_at}` + '000'
            )}
          />
        )}
      </div>
    </div>
  )
}
