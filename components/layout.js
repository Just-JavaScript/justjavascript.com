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
  maxWidth = 'max-w-4xl',
}) => {
  return (
    <>
      <SEO title={title} />
      <div className={background}>
        <div
          className={`flex flex-col min-h-screen items-center justify-center`}
        >
          <Navigation>{navContent}</Navigation>
          <div className="flex-shrink-0 w-full px-5 pt-16 pb-16 lg:pt-32 sm:pt-24 sm:px-8 sm:pb-24">
            {headerContent}
            {title && (
              <header className="relative flex items-center justify-center pt-24 pb-40 text-center sm:pb-48">
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
