import React from 'react'
import ReactCountdown, { zeroPad } from 'react-countdown'

const Countdown = ({ children, date }) => {
  const numberOf = (number, label) => {
    return (
      <div>
        <div className="sm:text-3xl text-2xl font-semibold font-mono leading-tight">
          {zeroPad(number)}
        </div>
        <div className="text-sm opacity-75">{label}</div>
      </div>
    )
  }
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <>{children}</>
    } else {
      return (
        <div className="text-center max-w-sm mx-auto">
          <div className="flex items-center justify-center mb-5">
            <h3 className="text-base font-medium leading-tight ">
              Limited offer! Price goes up in:
            </h3>
          </div>
          <div className="grid grid-flow-col sm:gap-8 gap-5 items-center justify-center mx-auto">
            {days > 0 && numberOf(days, 'days')}
            {numberOf(hours, 'hours')}
            {numberOf(minutes, 'mins')}
            {numberOf(seconds, 'secs')}
          </div>
        </div>
      )
    }
  }
  return (
    <ReactCountdown zeroPadTime={2} date={Number(date)} renderer={renderer} />
  )
}

export default Countdown
