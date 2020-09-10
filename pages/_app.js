import React from 'react'
import {MDXProvider} from '@mdx-js/react'
import 'focus-visible'
import mdxComponents from '../components/mdx'
import '../styles/output.css'

import '../styles/gifplayer.css'

const App = ({Component, pageProps}) => {
  return (
    <MDXProvider components={mdxComponents}>
      <Component {...pageProps} />
    </MDXProvider>
  )
}

export default App
