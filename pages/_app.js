import React from 'react'
import {MDXProvider} from '@mdx-js/react'
import {ThemeProvider, Styled, ColorMode} from 'theme-ui'
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
      description="Learn the JavaScript Mental Models" // TODO
    />
    <ColorMode />
    <Styled.root>
      <Header />
      <MDXProvider components={mdComponents}>
        <Component {...pageProps} />
      </MDXProvider>
    </Styled.root>
  </ThemeProvider>
)
