import React from 'react'
import {motion} from 'framer-motion'
import Header from './header'
import SEO from './seo'

const Layout = ({
  children,
  title,
  navContent,
  headerContent,
  className,
  episode,
  background,
  maxWidth = 'max-w-4xl',
}) => {
  return (
    <>
      <SEO title={title} />
      <div className={`sm:px-8 px-5 sm:pb-24 pb-16 ${background}`}>
        <Header>{navContent}</Header>
        {headerContent}
        {title && (
          <div className="pt-24 sm:pb-48 pb-40 relative flex items-center justify-center text-center">
            <h1 className="overflow-hidden relative lg:text-9xl md:text-6xl sm:text-5xl text-5xl font-extrabold font-serif leading-tighter mb-8 z-10">
              {title}
            </h1>
            {episode && (
              <span className="absolute z-0 sm:text-8xl text-6xl transform scale-[3] text-gray-100 font-extrabold font-serif">
                {('0' + episode).slice(-2)}
              </span>
            )}
          </div>
        )}
        <article className={`${maxWidth} ${className} mx-auto`}>
          {children}
        </article>
      </div>
    </>
  )
}

export default Layout
