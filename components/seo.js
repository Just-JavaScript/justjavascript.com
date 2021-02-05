import React from 'react'
import PropTypes from 'prop-types'
import {NextSeo} from 'next-seo'
import {useRouter} from 'next/router'

const SEO = ({title}) => {
  const router = useRouter()
  const isHomePage = router.pathname === '/'

  return (
    <NextSeo
      title={
        title || 'Just JavaScript | A Course by Dan Abramov and Maggie Appleton'
      }
      titleTemplate={
        isHomePage
          ? '%s | A Course by Dan Abramov and Maggie Appleton'
          : '%s | Just JavaScript'
      }
      description="Learn the JavaScript Mental Models"
      openGraph={{
        url: 'https://justjavascript.com',
        title: '',
        description: 'Learn the JavaScript Mental Models',
        images: [
          {
            url: 'https://justjavascript.com/og-image.png?v=20200512',
            width: 600,
            height: 314,
            alt: 'Just JavaScript: A Course by Dan Abramov and Maggie Appleton',
          },
          {
            url: 'https://justjavascript.com/og-image@2x.png?v=20200512',
            width: 1200,
            height: 628,
            alt: 'Just JavaScript: A Course by Dan Abramov and Maggie Appleton',
          },
        ],
        site_name:
          'Just JavaScript: A Course by Dan Abramov and Maggie Appleton',
      }}
      twitter={{
        handle: '@dan_abramov',
        cardType: 'summary_large_image',
      }}
    />
  )
}

SEO.propTypes = {
  title: PropTypes.string,
}

export default SEO
