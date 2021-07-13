import React from 'react'
import { useViewer } from 'context/viewer-context'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import axios from 'utils/configured-axios'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import Spinner from 'components/spinner'
import CertificateThumbnail from 'components/certificate-thumbnail'

const GetCertificate = () => {
  const { authToken, viewer: user, reloadViewer } = useViewer()
  React.useEffect(() => {
    reloadViewer()
  }, [])
  const [state, setState] = React.useState({
    firstName: get(user, 'name') || '',
    lastName: '',
    loading: false,
    success: false,
    errorMessage: null,
  })
  const [showForm, setShowForm] = React.useState(false)
  const nameIsPresent = !isEmpty(get(user, 'full_name'))

  function handleClick() {
    if (nameIsPresent) {
      const [firstName, lastName, rest] = get(user, 'full_name').split(' ')

      if (isEmpty(lastName)) {
        setState({
          firstName: firstName,
          lastName: `${lastName}${rest ? ` ${rest}` : ''}`,
          ...state,
        })

        setShowForm(true)
      } else {
        window.open(
          `${
            process.env.NEXT_PUBLIC_COMPLETION_CERTIFICATE_URI
          }?name=${decodeURI(
            `${firstName} ${lastName}${!isEmpty(rest) ? ` ${rest}` : ''}`
          )}`,
          '_blank'
        )
      }
    } else {
      setShowForm(true)
    }
  }

  const authHeaders = authToken
    ? {
        Authorization: `Bearer ${authToken()}`,
      }
    : {}

  function handleUpdate(values, actions) {
    setState({ ...state, loading: true })
    axios
      .put(
        get(user, 'user_url'),
        {
          first_name: values.firstName,
          last_name: values.lastName,
        },
        { headers: authHeaders }
      )

      .then(({ data }) => {
        setState({
          ...state,
          firstName: values.firstName,
          lastName: values.lastName,
          success: true,
          loading: false,
        })
        window.open(
          `${
            process.env.NEXT_PUBLIC_COMPLETION_CERTIFICATE_URI
          }?name=${decodeURI(get(data, 'full_name'))}`,
          '_blank'
        )
        actions.setSubmitting(false)
        setShowForm(false)
        actions.resetForm()
        reloadViewer()
      })
      .catch((err) => {
        actions.setSubmitting(false)
        setState({ success: false, errorMessage: err.message })
      })
  }

  const formik = useFormik({
    initialValues: {
      firstName: state.firstName,
      lastName: state.lastName,
    },
    validationSchema: yup.object().shape({
      firstName: yup.string().required('Required'),
      lastName: yup.string().required('Required'),
    }),
    onSubmit: (values, actions) => {
      if (formik.isValid) {
        handleUpdate(values, actions)
      }
    },
  })

  const inputClassName =
    'border-gray-300 bg-white shadow-sm rounded-md focus:border-orange-500 focus:ring-orange-500'

  return (
    <>
      {showForm && (
        <DialogOverlay
          isOpen={showForm}
          onDismiss={() => setShowForm(false)}
          className="z-40 px-5 pr-8"
        >
          <DialogContent
            style={{ width: '100%' }}
            aria-label="enter your name to download a certificate"
            className="relative z-50 w-full rounded-lg shadow-lg sm:max-w-md flex flex-col items-center"
          >
            <CertificateThumbnail
              firstName={formik.values.firstName}
              lastName={formik.values.lastName}
            />

            <h3 className="text-xl font-bold text-text pt-6 pb-4 leading-tight text-center">
              Enter your name
            </h3>
            <form
              className="grid grid-cols-1 gap-4  w-full mx-auto"
              onSubmit={formik.handleSubmit}
            >
              <div className="flex flex-col">
                <label htmlFor="firstName">First Name</label>
                <input
                  className={inputClassName}
                  id="firstName"
                  name="firstName"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                />
                <div className="text-xs opacity-75">
                  {formik.errors.firstName &&
                    formik.touched.firstName &&
                    formik.errors.firstName}
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName">Last Name</label>
                <input
                  className={inputClassName}
                  id="lastName"
                  name="lastName"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                />
                <div className="text-xs opacity-75">
                  {formik.errors.lastName &&
                    formik.touched.lastName &&
                    formik.errors.lastName}
                </div>
              </div>
              <button
                className="flex items-center justify-center py-3 px-4 bg-black text-white rounded-full focus:outline-none focus:ring-orange-500 focus:ring-2 text-medium hover:scale-105 transition-all duration-200 ease-in-out hover:shadow-xl"
                type="submit"
              >
                {state.loading ? (
                  <Spinner className="text-white" />
                ) : (
                  <>
                    {/* prettier-ignore */}
                    <svg aria-hidden="true" className="mr-2 text-white" width="18" height="18" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g fill="none" ><path fillRule="evenodd" clipRule="evenodd" d="M3 17a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm3.293-7.707a1 1 0 0 1 1.414 0L9 10.586V3a1 1 0 1 1 2 0v7.586l1.293-1.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z" fill="currentColor"/></g></svg>
                    Download Certificate
                  </>
                )}
              </button>
            </form>
            <div className="absolute top-0 right-0 block pt-4 pr-4">
              <button
                onClick={() => setShowForm(false)}
                type="button"
                className="text-gray-400 transition duration-150 ease-in-out hover:text-gray-500 focus:outline-none focus:text-gray-500"
                aria-label="Close"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </DialogContent>
        </DialogOverlay>
      )}
      <button
        onClick={() => handleClick()}
        type="button"
        className="flex items-center font-medium rounded-full px-5 py-3 bg-black text-white hover:scale-105 transition-all ease-in-out hover:shadow-xl"
      >
        {/* prettier-ignore */}
        <svg aria-hidden="true" className="mr-2 text-white" width="18" height="18" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g fill="none" ><path fillRule="evenodd" clipRule="evenodd" d="M3 17a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm3.293-7.707a1 1 0 0 1 1.414 0L9 10.586V3a1 1 0 1 1 2 0v7.586l1.293-1.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z" fill="currentColor"/></g></svg>
        Download Certificate
      </button>
    </>
  )
}

export default GetCertificate
