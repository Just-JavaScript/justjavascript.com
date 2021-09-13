import React from 'react'
import { useConvertkit } from '@skillrecordings/convertkit'
import { convertkitAxios } from '@skillrecordings/axios'
import axios from 'axios'
import { useFormik } from 'formik'
import Spinner from 'components/spinner'
import * as Yup from 'yup'
import { useRouter } from 'next/router'

const ConvertkitSubscribeAndTagForm = ({ tag, children }) => {
  const { subscriber } = useConvertkit()
  const [submitting, setSubmitting] = React.useState(false)
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      email_address: '',
      first_name: '',
    },
    validationSchema: Yup.object().shape({
      email_address: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      first_name: Yup.string(),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      setSubmitting(true)
      axios
        .post('/api/convertkit/subscribe', { ...values, tag })
        .catch((err) => {
          formik.setStatus('error')
          console.log(err)
        })
        .finally(() => {
          // setSubmitting(false)
          // formik.setStatus('submitted')
          router.push(`${router.pathname}?continue=true`)
        })
    },
    validateOnChange: false,
  })

  React.useEffect(() => {
    formik.setValues({
      first_name: subscriber?.first_name || '',
      email_address: subscriber?.email_address || '',
    })
  }, [subscriber])

  const inputClassName =
    'focus:outline-none py-2 border border-gray-100 focus:border-transparent shadow-md focus:ring-2 focus:ring-orange-300 rounded-lg text-black placeholder-coolGray-400 w-full'
  const labelClassName = 'block pb-1 font-medium'

  return (
    <>
      {formik.status === 'submitted' ? (
        <div className="text-lg py-4">Thanks!</div>
      ) : (
        <>
          {children}
          <form
            onSubmit={formik.handleSubmit}
            className="max-w-xs mx-auto space-y-4"
          >
            <div>
              <label htmlFor="first_name" className={labelClassName}>
                First Name
              </label>
              <div className="relative mt-1 rounded-md">
                <input
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  id="first_name"
                  name="first_name"
                  className={inputClassName}
                  placeholder="Preferred name"
                  type="text"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email_address" className={labelClassName}>
                Email<span className="opacity-80">*</span>
              </label>
              <div className="relative mt-1 rounded-md ">
                <input
                  value={formik.values.email_address}
                  onChange={formik.handleChange}
                  id="email_address"
                  name="email_address"
                  className={inputClassName}
                  placeholder="Your email address"
                  type="email"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col items-center w-full pt-2 justify-center">
              <button
                type="submit"
                className="px-6 py-3 shadow-xl hover:scale-105 rounded-full outline-none focus:outline-none focus:ring-2 focus:ring-orange-400 border focus:border-black border-white text-lg font-semibold mt-4 transition-all duration-300 ease-in-out bg-white text-black"
              >
                {submitting ? (
                  <div className="px-14">
                    <span className="sr-only">Submitting</span>
                    <Spinner />
                  </div>
                ) : (
                  'Continue Reading'
                )}
              </button>
              <div className="text-gray-200 opacity-60 text-sm pt-10 italic text-center">
                No spam, unsubscribe any time.
              </div>
            </div>
          </form>
        </>
      )}
      {formik.status === 'error' && (
        <div className="text-lg py-4">
          Something went wrong.{' '}
          <span aria-label="grinning face with sweat" role="img">
            😅
          </span>
        </div>
      )}
    </>
  )
}

export default ConvertkitSubscribeAndTagForm
