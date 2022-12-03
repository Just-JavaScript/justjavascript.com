export default {
  defaultTitle: 'Just JavaScript',
  description:
    'Just JavaScript will help you develop a rock-solid understanding of how JavaScript works through intuitive visual explanations and learning challenges.',
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
    description:
      'Just JavaScript will help you develop a rock-solid understanding of how JavaScript works through intuitive visual explanations and learning challenges.',
    type: 'website',
    site_name: 'Just JavaScript',
    profile: {
      firstName: 'Dan',
      lastName: 'Abramov',
    },
    images: [
      {
        // url: 'https://justjavascript.com/og-image-sale-50@2x.png',
        url: 'https://justjavascript.com/og-image@2x.png?v=20221203',
        width: 1200,
        height: 728,
      },
    ],
  },
}
