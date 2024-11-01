import React from 'react'
import { Element } from 'react-scroll'
import PurchaseBundle from './purchase-bundle'
import Stripe from '../../images/stripe.svg'
import CCs from '../../images/cc.svg'

const Commerce = ({ bundles, children, tierChildren }) => {
  const [basic] = bundles
  return (
    <div className="px-5 py-16 -m-5 bg-gray-50 sm:py-24 relative" id="buy">
      <Element name="buy" />
      {children || (
        <div className="px-5 pb-12 text-center">
          <h2 className="lg:max-w-screen-sm max-w-lg pb-3 mx-auto font-serif text-4xl font-extrabold lg:text-6xl sm:text-5xl leading-tighter">
            Learn my JavaScript Mental Models
          </h2>
          <div className="sm:pb-8 pb-4 max-w-xl mx-auto text-base font-medium text-center md:text-lg sm:text-lg">
            <p>
              Just JavaScript is my distilled mental model of how JavaScript
              works and a collaboration with Maggie Appleton.
            </p>
          </div>
        </div>
      )}
      <PurchaseBundle bundle={basic}>{tierChildren}</PurchaseBundle>
      <div className="flex flex-wrap items-center justify-center w-full transform scale-90 sm:pt-16 pt-10">
        <span className="mx-3 my-2 text-sm text-gray-700">
          30 day money back guarantee
        </span>
        <Stripe className="mx-3 my-2" />
        <CCs className="mx-3 my-2 saturate-0 filter" />
      </div>
    </div>
  )
}

export default Commerce
