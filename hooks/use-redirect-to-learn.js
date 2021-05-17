import {useViewer} from 'context/viewer-context'
import React from 'react'
import router from 'next/router'
import {isBrowser} from 'utils/is-browser'

export default function useRedirectToLearn() {
  const {sitePurchases, loading} = useViewer()
  React.useEffect(() => {
    if (!loading && isBrowser() && sitePurchases.length > 0) {
      router.push('/learn')
    }
  }, [sitePurchases, loading])
}
