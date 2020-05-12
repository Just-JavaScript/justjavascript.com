import React from 'react'
import {MDXProvider} from '@mdx-js/react'
import {ThemeProvider, Styled} from 'theme-ui'
import theme from '../utils/theme'
import Header from '../components/header'
import {NextSeo} from 'next-seo'
import 'focus-visible'

const mdComponents = {
  //h1: props => <h1 style={{color: 'tomato'}} {...props} />,
}

export default ({Component, pageProps}) => (
  <ThemeProvider theme={theme}>
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
    <Styled.root>
      <Header />
      <MDXProvider components={mdComponents}>
        <Component {...pageProps} />
      </MDXProvider>
    </Styled.root>
  </ThemeProvider>
)
