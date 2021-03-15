import React, {FunctionComponent} from 'react'
import * as yup from 'yup'
import {Formik} from 'formik'
import {useViewer} from 'context/viewer-context'

const loginSchema = yup.object().shape({
  email: yup.string().email().required('enter your email'),
})

const LoginForm = ({
  image,
  className,
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
    <div
      className={
        className
          ? className
          : 'w-full mx-auto md:py-32 py-16 flex flex-col items-center justify-center text-gray-900'
      }
    >
      {image}
      <div className={`sm:mx-auto rounded-lg ${image ? 'mt-5' : ''}`}>
        {isSubmitted && (
          <h2 className="text-center text-3xl leading-9 font-bold font-serif">
            Email Sent
          </h2>
        )}
        {isError && (
          <h2 className="text-center text-3xl leading-9 font-bold font-serif">
            Something went wrong!
          </h2>
        )}
        {!isSubmitted &&
          !isError &&
          (children ? (
            children
          ) : (
            <>
              <h2 className="text-center text-3xl leading-9 font-bold font-serif">
                Log in to Just JavaScript
              </h2>
              <p></p>
            </>
          ))}
        <div className="sm:mt-8 mt-4 sm:mx-auto sm:w-full sm:max-w-xl">
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
                            className="block text-sm font-large leading-5 text-gray-700"
                          >
                            {label}
                          </label>
                          <div className="mt-1 relative border-b-2 border-gray-200">
                            <input
                              required
                              id="email"
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="form-input placeholder-gray-600 block w-full sm:text-lg sm:leading-5 text-center font-serif font-semibold"
                              placeholder="you@example.com"
                              type="email"
                              />
                            </div>
                          </div>
                        <div className="flex justify-center items-center w-full">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-8 inline-flex items-center px-16 py-4 border border-transparent text-base leading-6 font-bold rounded-md text-white bg-black transition-transform transform hover:scale-105 ease-in-out duration-150"

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
              <div className="text-center leading-tight space-y-4">
                <h3 className="text-xl leading-tighter font-semibold">
                  Please check your inbox for your sign in link.
                </h3>
                <p>
                  Sometimes this can land in SPAM! While we hope that isn't the
                  case if it doesn't arrive in a minute or three, please check.
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
                  Are you using an aggressive ad blocker such as Privacy Badger?
                  Please disable it for this site and reload the page to try
                  again.
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
  )
}

export default LoginForm
