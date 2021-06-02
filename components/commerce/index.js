import React from 'react'
import {Element} from 'react-scroll'
import PurchaseBundle from './purchase-bundle'
import Stripe from '../../images/stripe.svg'
import CCs from '../../images/cc.svg'
import Image from 'next/image'

const Commerce = ({bundles, children}) => {
  const [basic] = bundles
  return (
    <div className="px-5 py-16 -mx-5 bg-gray-100 sm:py-24" id="buy">
      <Element name="buy" />
      <div className="flex items-center justify-center w-full pb-10">
        <Image
          src="/cover-and-chapters@2x.png"
          width={760}
          height={530}
          alt="Just JavaScript by Dan Abramov and Maggie Appleton, 10 chapters"
          quality={100}
        />
      </div>
      <div className="px-5 pb-8 text-center">
        <h2 className="max-w-screen-md pb-5 mx-auto font-serif text-4xl font-extrabold lg:text-7xl sm:text-6xl leading-tighter">
          Learn my JavaScript Mental Models
        </h2>
        <div className="max-w-screen-sm mx-auto text-base font-medium text-center md:text-xl sm:text-lg">
          <p>
            Just JavaScript is my distilled mental model of how JavaScript works
            and a collaboration with Maggie Appleton.
          </p>
        </div>
        {children}
      </div>
      <PurchaseBundle bundle={basic} />
      <div className="flex flex-wrap items-center justify-center w-full py-8 transform scale-90 mt-14">
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
