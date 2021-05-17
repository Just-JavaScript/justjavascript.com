import React from 'react'
import ClaimCouponOverlay from './claim-coupon-overlay'
import {useCommerceMachine} from 'hooks/use-commerce-machine'
import get from 'lodash/get'
import getBundles from 'utils/get-bundles'

function ClaimCoupon() {
  const sellable = getBundles()[0]
  const [state, send] = useCommerceMachine({sellable})
  const couponError = get(state, 'context.error')
  const showClaimCoupon = get(state, 'context.price.price') === 0 || couponError
  return showClaimCoupon ? (
    <ClaimCouponOverlay
      error={couponError}
      purchaseState={state.value}
      onPurchaseComplete={({email}) => {
        send('CLAIM_COUPON', {email})
      }}
    />
  ) : null
}

export default ClaimCoupon
