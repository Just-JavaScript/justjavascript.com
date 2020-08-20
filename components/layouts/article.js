import React from 'react'
import Header from '../header'
import {motion} from 'framer-motion'
import {useLocalStorage} from 'react-use'
import ToC from '../toc'

const Article = ({children, title, series, episode, ...props}) => {
  const [value, setValue] = useLocalStorage('pswrd', null)
  const [isAuthenticated, setAuthenticated] = React.useState(false)
  const [hasMounted, setMounted] = React.useState(false)

  function authenticate() {
    value === process.env.PASSWORD && setAuthenticated(true)
  }

  React.useEffect(() => {
    authenticate()
    setMounted(true)
  }, [])

  if (hasMounted) {
    if (isAuthenticated) {
      return (
        <div className="max-w-screen-md mx-auto pb-24 sm:px-8 px-5" {...props}>
          <div className="grid grid-cols-3 relative">
            <Header className="flex items-center justify-center py-16 col-start-2" />
            <div className="col-start-3 relative flex items-center justify-end">
              <ToC />
            </div>
          </div>
          <h1 className="overflow-hidden relative sm:text-6xl text-5xl text-center font-bold font-serif leading-tight mb-8">
            <motion.span
              initial={{y: '105%'}}
              animate={{y: '0%'}}
              transition={{
                type: 'spring',
                mass: 0.25,
                damping: 80,
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
              mass: 0.2,
              damping: 80,
              delay: 0.2,
            }}
          >
            {/* prettier-ignore */}
            <motion.svg animate={{x: [0, -16]}}  transition={{loop: Infinity, duration: 1.5}} className="mb-24 text-gray-400 mx-auto w-24" width="123" height="16" viewBox="0 0 123 16"><polyline fill="none" stroke="currentColor" strokeWidth="4" points="652.5 379 662.5 369 672.5 379 682.5 369 692.5 379 702.5 369 712.5 379 722.5 369 732.5 379 742.5 369 752.5 379 762.5 369 772.5 379" transform="translate(-651 -366)"/></motion.svg>
          </motion.div>
          <article className="prose lg:prose-xl max-w-none">{children}</article>
        </div>
      )
    } else {
      return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
          <div className="text-4xl text-center mb-4">😊</div>
          <form
            onSubmit={(e) => {
              authenticate()
              e.preventDefault()
            }}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-base font-medium leading-5 text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  required
                  value={value || ''}
                  onChange={(e) => setValue(e.target.value)}
                  id="password"
                  className="form-input focus:shadow-outline-indigo focus:border-indigo-300 block w-full sm:text-base sm:leading-5"
                  placeholder="•••••••••"
                  type="password"
                />
              </div>
            </div>

            <div className="w-full flex items-center justify-center mt-5">
              <span className="inline-flex rounded-md shadow-sm">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                >
                  Let Me In
                </button>
              </span>
            </div>
          </form>
        </div>
      )
    }
  }
  return null
}

export default Article
