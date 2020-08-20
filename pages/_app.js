import React from 'react'
import {MDXProvider} from '@mdx-js/react'
import {NextSeo} from 'next-seo'
import '../styles/index.css'
// import '@reach/menu-button/styles.css'
import 'focus-visible'
import mdxComponents from '../components/mdx'

import '../styles/gifplayer.css'

const App = ({Component, pageProps}) => {
  return (
    <>
      <NextSeo
        title="Just JavaScript — a course by Dan Abramov and Maggie Appleton"
        description="Learn the JavaScript Mental Models"
        openGraph={{
          url: 'https://justjavascript.com',
          title: 'Just JavaScript by Dan Abramov & Maggie Appleton',
          description: 'Learn the JavaScript Mental Models',
          images: [
            {
              url: 'https://justjavascript.com/og-image.png?v=20200512',
              width: 600,
              height: 314,
              alt:
                'Just JavaScript — a course by Dan Abramov and Maggie Appleton',
            },
            {
              url: 'https://justjavascript.com/og-image@2x.png?v=20200512',
              width: 1200,
              height: 628,
              alt:
                'Just JavaScript — a course by Dan Abramov and Maggie Appleton',
            },
          ],
          site_name:
            'Just JavaScript — a course by Dan Abramov and Maggie Appleton',
        }}
        twitter={{
          handle: '@dan_abramov',
          cardType: 'summary_large_image',
        }}
      />
      <MDXProvider components={mdxComponents}>
        <Component {...pageProps} />
      </MDXProvider>
    </>
  )
}

export default App
