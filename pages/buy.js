import * as React from 'react'
import DevBundles from 'data/bundles.development.json'
import ProdBundles from 'data/bundles.production.json'
import Layout from 'components/layout'
import Commerce from 'components/commerce'
import ClaimCoupon from 'components/commerce/claim-coupon'
const Buy = ({bundles}) => {
  return (
    <Layout>
      <ClaimCoupon />
      <Commerce bundles={bundles} />
    </Layout>
  )
}

export async function getStaticProps() {
  const bundles =
    process.env.NODE_ENV === 'production' ? ProdBundles : DevBundles
  return {
    props: {bundles},
  }
}

export default Buy
