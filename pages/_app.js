import React from 'react'
import {MDXProvider} from '@mdx-js/react'
import 'focus-visible'
import {ViewerProvider} from 'context/viewer-context'
import {ProgressProvider} from 'context/progress-context'
import mdxComponents from '../components/mdx'
import '../styles/index.css'
import '../styles/gifplayer.css'

const App = ({Component, pageProps}) => {
  return (
    <ViewerProvider>
      <ProgressProvider>
        <MDXProvider components={mdxComponents}>
          <Component {...pageProps} />
        </MDXProvider>
      </ProgressProvider>
    </ViewerProvider>
  )
}

export default App
