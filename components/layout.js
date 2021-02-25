import React from 'react'
import {motion} from 'framer-motion'
import Header from './header'
import SEO from './seo'

const Layout = ({
  children,
  title,
  navContent,
  navClassName,
  headerContent,
  className,
}) => {
  return (
    <>
      <SEO title={title} />

      <div className="max-w-screen-md mx-auto pb-24 sm:px-8 px-5">
        <div className="grid grid-cols-3 relative">
          <Header
            className={
              navClassName
                ? navClassName
                : 'relative z-10 flex items-center justify-center py-16 col-start-2'
            }
          />
          <div className="col-start-3 relative flex items-center justify-end">
            {navContent}
          </div>
        </div>
        {headerContent}
        {title && (
          <>
            <h1 className="overflow-hidden relative lg:text-5xl sm:text-4xl text-3xl text-center font-extrabold font-serif leading-tight mb-8">
              <motion.span
                initial={{y: '105%'}}
                animate={{y: '0%'}}
                transition={{
                  type: 'spring',
                  mass: 0.25,
                  damping: 10,
                  stiffness: 100,
                  delay: 0.05,
                }}
                className="inline-block"
              >
                {title}
              </motion.span>
            </h1>
            <motion.div
              className="overflow-hidden w-10 mx-auto rounded-lg"
              initial={{opacity: 0, y: 40}}
              animate={{opacity: 1, y: 0}}
              transition={{
                type: 'spring',
                mass: 0.25,
                damping: 10,
                stiffness: 100,
                delay: 0.2,
              }}
            >
              {/* prettier-ignore */}
              <motion.svg animate={{x: [0, -16]}}  transition={{ease: 'linear', repeat: Infinity, duration: 1.5}} className="mb-24 text-gray-400 mx-auto w-24" width="123" height="16" viewBox="0 0 123 16"><polyline fill="none" stroke="currentColor" strokeWidth="4" points="652.5 379 662.5 369 672.5 379 682.5 369 692.5 379 702.5 369 712.5 379 722.5 369 732.5 379 742.5 369 752.5 379 762.5 369 772.5 379" transform="translate(-651 -366)"/></motion.svg>
            </motion.div>
          </>
        )}
        <article className={className}>{children}</article>
      </div>
    </>
  )
}

export default Layout
