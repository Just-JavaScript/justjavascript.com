import React from 'react'
import {Element} from 'react-scroll'
import PurchaseBundle from './purchase-bundle'
import Stripe from '../../images/stripe.svg'
import CCs from '../../images/cc.svg'

const Commerce = ({bundles, children, className}) => {
  const [basic] = bundles
  return (
    <div className={className} id="buy">
      <Element name="buy" />
      <div className="text-center px-5">
        <h1 className="pb-5 pt-10 text-3xl font-extrabold font-serif sm:text-4xl sm:leading-10 lg:text-5xl leading-tight max-w-screen-md mx-auto">
          Learn my JavaScript Mental Models
        </h1>
        <div className="text-center font-medium sm:text-lg text-base max-w-lg mx-auto">
          <p>
            Just JavaScript is my distilled mental model of how JavaScript works
            and a collaboration with Maggie Appleton.
          </p>
        </div>
        {children}
      </div>
      <PurchaseBundle bundle={basic} />
      <div className="mt-14 w-full flex items-center py-8 border-cool-gray-100 border-t flex-wrap  justify-center">
        <span className="text-sm text-gray-700 mx-3 my-2">
          30 day money back guarantee
        </span>
        <Stripe className="mx-3 my-2" />
        <CCs className="mx-3 my-2" />
      </div>
    </div>
  )
}

export default Commerce
