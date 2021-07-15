import React from 'react'
import { scroller } from 'react-scroll'
import { useRouter } from 'next/router'
import ReactCountdown, { zeroPad } from 'react-countdown'
import { motion } from 'framer-motion'

const Countdown = ({ date }) => {
  const numberOf = (number, label) => {
    return (
      <div className="flex flex-row items-baseline">
        <div className="sm:text-sm text-xs leading-[100%] tabular-nums">
          {zeroPad(number)}
        </div>
        <div className="sm:text-xs text-[0.7rem] pl-px opacity-80 leading-[100%]">
          {label}
        </div>
      </div>
    )
  }
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return null
    } else {
      return (
        <div className="flex sm:flex-row flex-col sm:space-x-1.5 sm:items-center justify-center">
          <div className="sm:text-xs text-[0.7rem] flex items-center font-semibold">
            Ending in:
          </div>
          <div className="grid grid-flow-col gap-1 items-center justify-center">
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
    <motion.div
      animate={{ top: ['-100%', '0%'] }}
      className="absolute space-x-2 top-0 left-0 flex items-center sm:justify-center justify-between px-3 sm:py-0 py-3 sm:h-10 h-12 w-full bg-white text-black"
    >
      <div className="flex items-center sm:py-2 sm:flex-grow-0 flex-grow">
        <div className="text-sm font-semibold flex items-center space-x-1">
          <span role="img" aria-label="crystal ball" className="text-lg">
            🔮
          </span>{' '}
          <span>Launch discount</span>
        </div>
      </div>
      <div className="flex items-center justify-center sm:space-x-2 sm:flex-row flex-row-reverse">
        <button
          className="bg-black py-1 sm:ml-0 ml-3 hover:shadow-xl transform hover:scale-105 focus:scale-95 transition-all ease-in-out duration-200 text-white rounded-full px-4 text-sm font-semibold"
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
    </motion.div>
  )
}
