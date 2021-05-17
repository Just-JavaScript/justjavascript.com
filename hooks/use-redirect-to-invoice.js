import {useRouter} from 'next/router'
import React from 'react'

const useRedirectToInvoice = (shouldRedirect = false) => {
  const router = useRouter()

  React.useEffect(() => {
    if (shouldRedirect) {
      router.push('/invoice')
    }
  }, [shouldRedirect])
}

export default useRedirectToInvoice
