import React from 'react'
import * as yup from 'yup'
import {Formik} from 'formik'
import {useViewer} from 'context/viewer-context'
import Layout from 'components/layout'

const loginSchema = yup.object().shape({
  email: yup.string().email().required('enter your email'),
})

const LoginForm = ({
  image,
  className = 'flex flex-col items-center justify-center w-full mx-auto text-gray-900',
  children,
  button = 'Email a login link',
  label = 'Email address',
  formClassName = '',
  track,
}) => {
  const [isSubmitted, setIsSubmitted] = React.useState(false) // false
  const [isError, setIsError] = React.useState(false)
  const {requestSignInEmail} = useViewer()

  return (
    <Layout background="bg-gray-100">
      <div className={className}>
        {image}
        <div className={`w-full mx-auto rounded-lg ${image ? 'mt-5' : ''}`}>
          {isSubmitted && (
            <h2 className="font-serif text-3xl font-bold leading-9 text-center">
              Email Sent
            </h2>
          )}
          {isError && (
            <h2 className="font-serif text-3xl font-bold leading-9 text-center">
              Something went wrong!
            </h2>
          )}
          {!isSubmitted &&
            !isError &&
            (children ? (
              children
            ) : (
              <>
                <h2 className="font-serif text-6xl font-extrabold text-center leading-tighter">
                  Log in
                </h2>
                <p></p>
              </>
            ))}
          <div className="mt-4 sm:mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
            <div className="pb-8">
              {!isSubmitted && !isError && (
                <Formik
                  initialValues={{email: ''}}
                  validationSchema={loginSchema}
                  onSubmit={(values) => {
                    setIsSubmitted(true)
                    requestSignInEmail(values.email)
                      .then(() => {
                        track && track(values.email)
                      })
                      .catch(() => {
                        setIsSubmitted(false)
                        setIsError(true)
                      })
                  }}
                >
                  {(props) => {
                    const {
                      values,
                      isSubmitting,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                    } = props
                    return (
                      <>
                        <form onSubmit={handleSubmit} className={formClassName}>
                          <div className="w-full text-center">
                            <label
                              htmlFor="email"
                              className="block pb-2 leading-5 text-gray-700"
                            >
                              {label}
                            </label>
                            <div className="relative">
                              <input
                                required
                                id="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="block w-full max-w-sm py-4 mx-auto font-sans text-center placeholder-gray-400 border-0 shadow-lg form-input sm:text-lg sm:leading-5"
                                placeholder="you@example.com"
                                type="email"
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-center w-full">
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="inline-flex items-center px-16 py-4 mt-8 text-base font-bold leading-6 text-white transition-transform duration-150 ease-in-out transform bg-black border border-transparent rounded-md hover:scale-105"
                            >
                              {button}
                            </button>
                          </div>
                        </form>
                      </>
                    )
                  }}
                </Formik>
              )}
              {isSubmitted && (
                <div className="space-y-4 leading-tight text-center">
                  <h3 className="text-xl font-semibold leading-tighter">
                    Please check your inbox for your sign in link.
                  </h3>
                  <p>
                    Sometimes this can land in SPAM! While we hope that isn't
                    the case if it doesn't arrive in a minute or three, please
                    check.
                  </p>
                </div>
              )}
              {isError && (
                <div className="text-text">
                  <p>
                    Login Link Not Sent{' '}
                    <span role="img" aria-label="sweating">
                      😅
                    </span>
                  </p>
                  <p className="pt-3">
                    Are you using an aggressive ad blocker such as Privacy
                    Badger? Please disable it for this site and reload the page
                    to try again.
                  </p>
                  <p className="pt-3">
                    If you <strong>aren't</strong> running aggressive adblocking
                    please check the console for errors and email
                    support@egghead.io with any info and we will help you ASAP.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default LoginForm
