import React from 'react'
import {MDXProvider} from '@mdx-js/react'
import 'focus-visible'
import {ViewerProvider} from 'context/viewer-context'
import mdxComponents from '../components/mdx'
import '../styles/index.css'
import '../styles/gifplayer.css'

const App = ({Component, pageProps}) => {
  return (
    <ViewerProvider>
      <MDXProvider components={mdxComponents}>
        <Component {...pageProps} />
      </MDXProvider>
    </ViewerProvider>
  )
}

export default App
