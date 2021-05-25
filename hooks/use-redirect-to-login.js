import {useViewer} from 'context/viewer-context'
import React from 'react'
import router from 'next/router'
import {isBrowser} from 'utils/is-browser'
import {disableLoginForDev} from 'hooks/use-login-required'

export default function useRedirectToLogin() {
  const {sitePurchases, loading} = useViewer()
  React.useEffect(() => {
    if (
      !loading &&
      isBrowser() &&
      sitePurchases.length === 0 &&
      !disableLoginForDev()
    ) {
      router.push('/login')
    }
  }, [sitePurchases, loading])
}
