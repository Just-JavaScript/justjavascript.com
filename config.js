export default {
  defaultTitle: 'Just JavaScript',
  description: 'Learn the JavaScript Mental Models',
  author: 'Dan Abramov',
  email: 'dan@overreacted.io',
  siteUrl: 'justjavascript.com',
  favicon: '/favicon.ico',
  titleTemplate: '%s | Just JavaScript',
  additionalMetaTags: [
    { property: 'author', content: 'Dan Abramov' },
    {
      property: 'keywords',
      content:
        'JavaScript, Dan Abramov, Maggie Appleton, Mental Models, Learn, JS',
    },
  ],
  twitter: {
    cardType: 'summary_large_image',
    handle: 'dan_abramov',
    site: 'dan_abramov',
  },
  openGraph: {
    title: 'Just JavaScript',
    description: 'Learn the JavaScript Mental Models.',
    type: 'website',
    site_name: 'Just JavaScript',
    profile: {
      firstName: 'Dan',
      lastName: 'Abramov',
    },
    images: [
      {
        url: 'https://justjavascript.com/og-image@2x.png?v=20210623',
        width: 1200,
        height: 728,
      },
    ],
  },
}
