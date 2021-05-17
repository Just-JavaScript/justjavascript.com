import * as React from 'react'
import queryString from 'query-string'

const SELLING_LIVE = process.env.NEXT_PUBLIC_SELLING_LIVE === 'true'

export default function useSellingLive() {
  const [sellingLive, setSellingLive] = React.useState(SELLING_LIVE)

  React.useEffect(() => {
    const {live} = queryString.parse(window.location.search)
    console.log(queryString.parse(window.location.search))
    setSellingLive(SELLING_LIVE || live === 'true')
  }, [])

  return sellingLive
}
