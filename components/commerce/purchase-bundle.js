import React from 'react'

import {motion, AnimatePresence} from 'framer-motion'
import TeamPlanToggle from './team-plan-toggle'
import Countdown from './countdown'
import {isEmpty, get, find, noop} from 'lodash'
import ParityCouponMessage from './parity-coupon-message'
import {useCommerceMachine} from '../../hooks/use-commerce-machine'

const PurchaseButton = ({purchasing, children, bundle, onClick}) => {
  const purchasingStyles = 'opacity-50 cursor-default'

  return (
    <button
      className={`${
        purchasing ? purchasingStyles : 'hover:scale-105'
      } flex mx-auto text-center rounded-lg border border-transparent font-sans  focus:scale-90 bg-black px-10 py-5 text-lg font-bold leading-6 text-white transition-all ease-in-out duration-150 transform hover:shadow-xl`}
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

  const setTeamQuantity = ({quantity}) => {
    setQuantity({quantity, bulk: true})
  }

  const activateIndividualPlan = () => {
    setQuantity({quantity: 1, bulk: false})
    setPlanType('individual')
  }

  const activateTeamPlan = () => {
    setTeamQuantity({quantity: 5})
    setPlanType('team')
    setIsPPP(false)
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
      return fractionOff * 100
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
      <div className="py-10">
        <div>
          {state.context.error && (
            <div className="w-full p-4 mt-4 mb-4 bg-white border rounded-lg border-tomato-400">
              <h4 className="w-full text-center text-tomato-600">
                🚨 There was an error processing your card.{' '}
                <strong>{'' + state.context.error}</strong>. Please contact your
                bank. Reload the page to try another card.
              </h4>
            </div>
          )}
          {expiresAt && !isPPP && <Countdown date={expiresAt} />}
          <div className="flex items-center justify-center">
            <span className="flex items-start px-3 leading-none tracking-tight text-gray-900 sm:text-6xl">
              <span className="mt-1 mr-1 font-mono text-2xl font-semibold tracking-wide text-gray-500 sm:text-3xl">
                US$
              </span>
              <span className="font-serif text-6xl font-bold sm:text-7xl tabular-nums">
                {displayPrice}
              </span>
              {((state.context.quantity && state.context.quantity > 4) ||
                displayPercentOff) && (
                <div className="flex flex-col">
                  <span className="ml-2 font-serif text-4xl font-semibold text-gray-700 line-through">
                    {typeof displayFullPrice === 'number' &&
                      displayFullPrice * (state.context.quantity || 1)}
                  </span>
                  {displayPercentOff && (
                    <span className="ml-2 text-base font-semibold tracking-normal text-rose-500">
                      {`Save ${displayPercentOff}%`}
                    </span>
                  )}
                </div>
              )}
            </span>
          </div>
          <div className="py-2 font-mono text-base font-semibold tracking-wide text-center uppercase">
            yours forever
          </div>
          <motion.div
            initial={{opacity: 0, margin: '0px 0px'}}
            animate={{opacity: 1, margin: '20px 0px'}}
            exit={{opacity: 0, margin: '0px 0px'}}
            className="flex justify-center"
          >
            <div className="flex items-center space-x-3">
              <label htmlFor="quantity" className="">
                Quantity
              </label>
              <input
                value={state.context.quantity}
                onChange={(event) => {
                  const newQuantity = event.target.value
                  setTeamQuantity({quantity: Number(newQuantity)})
                }}
                className="flex w-16 text-lg font-semibold leading-tight text-center border-gray-200 form-input"
                name="quantity"
                type="number"
                min="1"
                max="1000"
              />
            </div>
          </motion.div>
        </div>
        <div className="rounded-lg">
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
          <div className="max-w-screen-sm mx-auto">
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
