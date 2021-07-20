import React from 'react'
import {motion} from 'framer-motion'
import Countdown from './countdown'
import {isEmpty, get, find, noop} from 'lodash'
import ParityCouponMessage from './parity-coupon-message'
import {useCommerceMachine} from '../../hooks/use-commerce-machine'
import {episodes} from 'components/toc'
import Spinner from 'components/spinner'
import CrystalBall from '../../public/crystal-ball@2x.png'
import Image from 'next/image'

const PurchaseButton = ({purchasing, children, bundle, onClick}) => {
  const purchasingStyles = 'opacity-50 cursor-default'

  return (
    <button
      className={`${
        purchasing ? purchasingStyles : 'hover:scale-105'
      } flex mx-auto text-center rounded-full w-full items-center justify-center border border-transparent font-sans focus:scale-95 bg-black sm:px-10 px-8 sm:py-5 py-4 sm:text-lg font-bold leading-6 text-white transition-all ease-in-out duration-150 transform hover:shadow-container`}
      aria-describedby={`${bundle.title} Tier`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

const PurchaseBundle = ({
  bundle,
  upgradeFromSellable,
  purchasingOtherPackage = false,
  setPurchasingPackage = noop,
}) => {
  const [state, send] = useCommerceMachine({
    sellable: bundle,
    upgradeFromSellable,
  })
  const [planType, setPlanType] = React.useState('individual')
  const [isPPP, setIsPPP] = React.useState(false)

  const isPurchasing =
    state.matches('stripePurchase') ||
    state.matches('handlePurchase') ||
    state.matches('success')
  const isFetchingPrice = state.matches('fetchingPrice')

  const bundleSlug = bundle.slug

  React.useEffect(() => {
    if (isPurchasing) {
      setPurchasingPackage(bundleSlug)
    } else {
      setPurchasingPackage()
    }
  }, [isPurchasing, bundleSlug, setPurchasingPackage])

  if (isEmpty(bundle)) {
    return null
  }

  const availableCoupons = state?.context?.price?.available_coupons || []
  const parityCoupon = find(availableCoupons, {
    coupon_region_restricted: true,
  })
  const countryCode = get(parityCoupon, 'coupon_region_restricted_to')
  const countryName = get(parityCoupon, 'coupon_region_restricted_to_name')
  const displayParityCouponOffer =
    !(isEmpty(countryName) || isEmpty(countryCode) || isEmpty(parityCoupon)) ||
    (state.context.quantity && state.context.quantity > 1)

  const onApplyParityCoupon = () => {
    setIsPPP(true)
    send('APPLY_COUPON', {appliedCoupon: parityCoupon.coupon_code})
  }

  const onDismissParityCoupon = () => {
    setIsPPP(false)
    send('DISMISS_COUPON')
  }

  const setQuantity = ({quantity, bulk}) => {
    send('SET_QUANTITY', {quantity, bulk})
  }

  const createStripeSession = () => {
    send('START_STRIPE_CHECKOUT')
  }

  const currentPrice = state.context?.price?.price
  const fullPrice = state.context?.price?.full_price
  const displayPrice = currentPrice ? currentPrice : '--'
  const displayFullPrice = fullPrice ? fullPrice : '--'

  const getPercentOff = ({price, quantity}) => {
    if (!price) return
    if (isEmpty(price.bulk_discount) && isEmpty(price.coupon)) {
      return
    }

    const fractionOff =
      quantity === 1
        ? Number(price.coupon.coupon_discount)
        : Number(price.bulk_discount)

    if (fractionOff) {
      return 100 - Math.ceil((currentPrice / (fullPrice * quantity)) * 100)
    }
  }

  const displayPercentOff = getPercentOff({
    price: state.context.price,
    quantity: state.context.quantity,
  })

  const expiresAt =
    Number(state.context?.price?.coupon?.coupon_expires_at) * 1000 || false

  const getPurchaseButtonText = () => {
    if (state.matches('purchasing')) {
      return 'Purchasing...'
    } else if (planType === 'team') {
      return 'Level Up Your Team'
    } else {
      return 'Understand JavaScript'
    }
  }

  const disablePurchaseButton =
    state.matches('handlePurchase') ||
    state.matches('success') ||
    state.matches('loadingStripeCheckoutSession') ||
    purchasingOtherPackage

  const teamAvailable = isEmpty(upgradeFromSellable)

  return (
    <>
      <div className="max-w-sm mx-auto w-full bg-white sm:px-8 px-5 sm:pb-8 pb-5 rounded-xl shadow-xl">
        <div>
          <div className="flex items-center justify-center w-full">
            <div className="flex items-center justify-center w-40 p-2 -mt-10 overflow-hidden rounded-full bg-white">
              <Image
                src={CrystalBall}
                alt="a crystal ball"
                placeholder="blur"
              />
            </div>
          </div>
          {state.context.error && (
            <div className="w-full p-4 mt-4 mb-4 bg-white border rounded-lg border-tomato-400">
              <h4 className="w-full text-center text-tomato-600">
                🚨 There was an error processing your card.{' '}
                <strong>{'' + state.context.error}</strong>. Please contact your
                bank. Reload the page to try another card.
              </h4>
            </div>
          )}
          {expiresAt && !parityCoupon && (
            <div className="border-b border-gray-100 pb-8 sm:pt-4 pt-4">
              <Countdown date={expiresAt} />
            </div>
          )}
          <div className="flex items-center justify-center pt-8">
            <div className="relative flex items-start px-3 leading-none tracking-tight text-gray-900 sm:text-6xl">
              <div className="relative font-serif text-6xl font-bold sm:text-7xl tabular-nums">
                <span className="absolute flex right-full mt-1 leading-none font-sans font-semibold tracking-wide">
                  <sup className="text-sm mt-1 font-bold text-gray-400">US</sup>
                  <span className="sm:text-3xl text-2xl text-gray-500">$</span>
                </span>
                <span>{displayPrice}</span>
              </div>
              {((state.context.quantity && state.context.quantity > 4) ||
                displayPercentOff) && (
                <div className="flex flex-col">
                  <span className="ml-2 font-serif text-4xl font-semibold text-gray-700">
                    <div>
                      <span className="relative inline-flex items-center">
                        {typeof displayFullPrice === 'number' &&
                          displayFullPrice * (state.context.quantity || 1)}
                        <div className="absolute w-[130%] h-1 bg-orange-500 -left-1 rotate-[-15deg]" />
                      </span>
                    </div>
                  </span>
                  {displayPercentOff && !isFetchingPrice && (
                    <span className="ml-2 text-base font-bold tracking-normal text-orange-500">
                      {`Save ${displayPercentOff}%`}!
                    </span>
                  )}
                </div>
              )}
              {isFetchingPrice && (
                <div className="absolute -right-3 top-0">
                  <Spinner className="text-black" />
                </div>
              )}
            </div>
          </div>
          <div className="py-2 font-sans text-xs font-semibold tracking-wide text-center uppercase">
            yours forever
          </div>
          <motion.div
            initial={{opacity: 0, margin: '0px 0px'}}
            animate={{opacity: 1, margin: '20px 0px'}}
            exit={{opacity: 0, margin: '0px 0px'}}
            className="flex justify-center"
          >
            <div className="flex items-center space-x-3">
              <label htmlFor="quantity" className="text-sm text-gray-800">
                Quantity
              </label>
              <input
                value={state.context.quantity}
                onChange={(event) => {
                  const newQuantity = Number(event.target.value)
                  const isBulk = newQuantity > 1
                  if (isBulk) {
                    setIsPPP(false)
                  }
                  setQuantity({quantity: newQuantity, bulk: isBulk})
                }}
                className="flex px-2 rounded-full w-14 py-2 text-sm font-semibold leading-tight text-center border-gray-200 form-input focus:ring-orange-500 focus:ring-2 focus:outline-none focus:border-white"
                name="quantity"
                type="number"
                min="1"
                max="1000"
              />
            </div>
          </motion.div>
        </div>
        <div className="rounded-lg sm:pb-8 pb-4">
          {disablePurchaseButton ? (
            <PurchaseButton purchasing bundle={bundle}>
              Navigating to checkout...
            </PurchaseButton>
          ) : (
            <PurchaseButton onClick={createStripeSession} bundle={bundle}>
              {getPurchaseButtonText()}
            </PurchaseButton>
          )}
        </div>
        <div className="sm:p-0 p-5">
          <p className="font-semibold pb-4">
            Includes all 10 episodes + quiz exercises.
          </p>
          <ul>
            {episodes.map((e) => {
              return (
                <li key={e.title} className="-ml-1 pb-1">
                  {'・'} {e.title}
                </li>
              )
            })}
          </ul>
        </div>
        {/* {teamAvailable && (
          <motion.div layout className="flex justify-center w-full mt-10">
            <TeamPlanToggle
              planType={planType}
              activateIndividualPlan={activateIndividualPlan}
              activateTeamPlan={activateTeamPlan}
            />
          </motion.div>
        )} */}
      </div>

      {displayParityCouponOffer &&
        state.context.quantity === 1 &&
        !isEmpty(parityCoupon) &&
        planType === 'individual' && (
          <div className="pt-8">
            <ParityCouponMessage
              coupon={parityCoupon}
              countryName={countryName}
              onApply={onApplyParityCoupon}
              onDismiss={onDismissParityCoupon}
              isPPP={isPPP}
            />
          </div>
        )}
    </>
  )
}

const Feature = ({children, size = 'normal', className = ''}) => {
  const sizes = {
    normal: 'text-base',
    large: 'text-xl',
  }

  return (
    <li className={`flex items-center justify-start ${className}`}>
      <p
        className={`px-4 ${sizes[size]} leading-6 font-large text-gray-700 py-2`}
      >
        {children}
      </p>
    </li>
  )
}

export default PurchaseBundle
