import React from 'react'
import Document, {Html, Head, Main, NextScript} from 'next/document'
import {InitializeColorMode} from 'theme-ui'
import {TypographyStyle, GoogleFont} from 'react-typography'
import typography from '../utils/typography'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return {...initialProps}
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="stylesheet" href="/styles.css" />
          <link rel="stylesheet" href="/fonts.css" />
          <GoogleFont typography={typography} />
          <TypographyStyle typography={typography} />
        </Head>
        <body>
          <InitializeColorMode />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
