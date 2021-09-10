import React from 'react'
import Navigation from './navigation'
import { NextSeo } from 'next-seo'
import Footer from 'components/footer'
import { SkipNavLink, SkipNavContent } from '@reach/skip-nav'
import { Toaster } from 'react-hot-toast'

const Layout = ({
  children,
  navClassName,
  navChildren,
  noIndex,
  noFooter = false,
  meta,
  background = 'bg-gray-100',
  displayLogout = true,
}) => {
  const {
    title,
    description,
    titleAppendSiteName = false,
    url,
    ogImage,
  } = meta || {}
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          url,
          images: ogImage ? [ogImage] : undefined,
        }}
        canonical={url}
        noindex={noIndex}
      />
      <Toaster />
      <div className={background}>
        <div className="flex flex-col items-center justify-center min-h-screen print:min-h-full print:h-auto">
          <SkipNavLink />
          <Navigation className={navClassName} displayLogout={displayLogout}>
            {navChildren}
          </Navigation>
          <div className="flex-shrink-0 w-full px-5">
            <SkipNavContent />
            {children}
          </div>
        </div>
        {!noFooter && <Footer />}
      </div>
    </>
  )
}

export default Layout
