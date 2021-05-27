import React from 'react'
import Navigation from './navigation'
import SEO from './seo'

const Layout = ({
  children,
  title,
  navClassName,
  navChildren,
  background = 'bg-gray-100',
}) => {
  return (
    <>
      <SEO title={title} />
      <div className={background}>
        <div className="flex flex-col items-center justify-center min-h-screen print:min-h-full print:h-auto">
          <Navigation className={navClassName}>{navChildren}</Navigation>
          <div className="flex-shrink-0 w-full px-5">{children}</div>
        </div>
      </div>
    </>
  )
}

export default Layout
