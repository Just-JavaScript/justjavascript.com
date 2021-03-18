import {useRouter} from 'next/router'
import React from 'react'
import {useViewer} from 'context/viewer-context'
import isEmpty from 'lodash/isEmpty'

const disableLoginForDev = () =>
  process.env.NODE_ENV === 'development' &&
  process.env.NEXT_PUBLIC_DISABLE_LOGIN_FOR_DEV === 'true'

export default function useRedirectUnclaimedBulkToInvoice() {
  const {isUnclaimedBulkPurchaser, canViewContent, viewer} = useViewer()
  const [isVerifying, setIsVerifying] = React.useState(true)
  const router = useRouter()
  React.useEffect(() => {
    if (
      !isEmpty(viewer) &&
      !canViewContent &&
      isUnclaimedBulkPurchaser &&
      !disableLoginForDev()
    ) {
      router.push('/invoice')
    } else {
      setIsVerifying(false)
    }
  }, [isUnclaimedBulkPurchaser])

  return isVerifying
}
