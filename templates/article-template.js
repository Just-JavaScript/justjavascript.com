import React from 'react'
import {useLocalStorage} from 'react-use'
import ToC from '../components/toc'
import Layout from '../components/layout'

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
        <Layout
          headerContent={<ToC />}
          className="prose lg:prose-xl max-w-none"
          title={title}
          {...props}
        >
          {children}
        </Layout>
      )
    } else {
      return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
          <div className="text-4xl text-center mb-2">🔒</div>
          <form
            onSubmit={(e) => {
              authenticate()
              e.preventDefault()
            }}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-base font-medium leading-5 text-gray-700 text-center"
              >
                Enter Password
              </label>
              <div className="mt-3 relative rounded-md shadow-sm">
                <input
                  required
                  value={value || ''}
                  onChange={(e) => setValue(e.target.value)}
                  id={'password'}
                  className={
                    'form-input focus:shadow-outline-indigo focus:border-indigo-300 block w-full text-2xl sm:leading-5 text-center'
                  }
                  placeholder="••••"
                  type={'password'}
                  autoComplete={'new-password'}
                  autoFocus={true}
                />
              </div>
            </div>

            <div className="w-full flex items-center justify-center mt-5">
              <span className="inline-flex rounded-md shadow-sm">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                >
                  Continue
                </button>
              </span>
            </div>
          </form>
        </div>
      )
    }
  } else return null
}

export default Article
