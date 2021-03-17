import * as React from 'react'
import DevBundles from 'data/bundles.development.json'
import ProdBundles from 'data/bundles.production.json'
import Layout from 'components/layout'
import Commerce from 'components/commerce'

const Buy = ({bundles}) => {
  return (
    <Layout>
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
