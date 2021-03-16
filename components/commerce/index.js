import React from 'react'
import {Element} from 'react-scroll'
import PurchaseBundle from './purchase-bundle'
import Image from 'next/image'
import Stripe from '../../images/stripe.svg'
import CCs from '../../images/cc.svg'

const Commerce = ({bundles, children, className}) => {
  const [basic] = bundles
  return (
    <div className={className} id="buy">
      <Element name="buy" />
      <div className="text-center px-5">
        <Image
          src="/package@2x.png"
          width={617}
          height={471}
          alt="Preview of the De-Coding the Technical Interview Process eBook by Emma Bostian"
        />
        <h1 className="pb-5 pt-10 text-3xl font-extrabold text-text sm:text-4xl sm:leading-10 lg:text-5xl leading-tight max-w-screen-md mx-auto">
          Learn How to Nail Every Aspect of Your Next Tech Interview
        </h1>
        <div className="text-center font-medium sm:text-lg text-base max-w-lg mx-auto">
          <p>
            Includes <strong>PDF</strong> in light and{' '}
            <span className="bg-gray-900 text-white px-1 py-px rounded-sm">
              dark mode
            </span>
            , EPUB to read on your favorite ebook reader, and{' '}
            <strong>full access to the book online</strong>.{' '}
          </p>
        </div>
        {/* <p className="uppercase font-semibold tracking-wide text-brand">
          Start Today
        </p> */}
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
