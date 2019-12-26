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
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(f, a, t, h, o, m){
a[h]=a[h]||function(){
(a[h].q=a[h].q||[]).push(arguments)
};
o=f.createElement('script'),
m=f.getElementsByTagName('script')[0];
o.async=1; o.src=t; o.id='fathom-script';
m.parentNode.insertBefore(o,m)
})(document, window, 'https://cdn.usefathom.com/tracker.js', 'fathom');
fathom('set', 'siteId', 'YXFBENCN');
fathom('trackPageview')`,
            }}
          />
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
