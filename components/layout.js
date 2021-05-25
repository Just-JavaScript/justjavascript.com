import React from 'react'
import Navigation from './navigation'
import SEO from './seo'

const Layout = ({
  children,
  title,
  navContent,
  headerContent,
  className,
  episode,
  background = '',
  maxWidth = 'max-w-screen-lg',
}) => {
  return (
    <>
      <SEO title={title} />
      <div className={background}>
        <div className="flex flex-col items-center justify-center min-h-screen print:h-auto">
          <Navigation>{navContent}</Navigation>
          <div className="flex-shrink-0 w-full px-5 pt-16 pb-16 lg:pt-24 sm:pt-16 sm:px-8 sm:pb-24 print:pt-0">
            {headerContent}
            {title && (
              <header className="relative flex items-center justify-center py-24 min-h-[65vh] text-center">
                <h1 className="relative z-10 mb-8 overflow-hidden font-serif text-5xl font-extrabold lg:text-9xl md:text-6xl sm:text-5xl leading-tighter">
                  {title}
                </h1>
                {episode && (
                  <span className="absolute z-0 sm:text-8xl text-6xl transform scale-[3] text-gray-100 font-extrabold font-serif">
                    {('0' + episode).slice(-2)}
                  </span>
                )}
              </header>
            )}
            <article className={`${maxWidth} ${className} mx-auto`}>
              {children}
            </article>
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
