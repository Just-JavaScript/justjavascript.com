import {useViewer} from 'context/viewer-context'
import {useRouter} from 'next/router'
import React from 'react'
import disableLoginForDev from 'utils/authDisabledForDev'

export default function useLoginRequired() {
  const [isVerifying, setIsVerifying] = React.useState(true)
  const {loading, sitePurchases, isUnclaimedBulkPurchaser} = useViewer()
  const sitePurchasesCount = sitePurchases.length
  const router = useRouter()

  React.useEffect(() => {
    const dispatchRedirect = (loading, isUnclaimedBulkPurchaser) => {
      if (disableLoginForDev || loading) {
        return false
      }

      if (isUnclaimedBulkPurchaser) {
        router.push('/invoice')
      }
    }
    dispatchRedirect(loading, isUnclaimedBulkPurchaser)
    setIsVerifying(false)
  }, [loading, isUnclaimedBulkPurchaser, sitePurchasesCount])

  return isVerifying
}
