import '@reach/dialog/styles.css'
import React from 'react'
import {Formik, Form, Field} from 'formik'
import {DialogOverlay, DialogContent} from '@reach/dialog'
import * as yup from 'yup'

const loginSchema = yup.object().shape({
  email: yup.string().email().required('enter your email'),
})

function ClaimCouponOverlay({onPurchaseComplete, purchaseState, error}) {
  const [isOpen, setIsOpen] = React.useState(true)
  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)
  const handleSubmit = ({email}) => {
    onPurchaseComplete({email})
  }
  return (
    <DialogOverlay className="z-40 px-5 pr-8" isOpen={isOpen}>
      <DialogContent
        style={{width: '100%'}}
        aria-label="enter your email to claim your purchase"
        className="relative z-50 w-full rounded-lg shadow-lg sm:max-w-screen-sm text-text"
      >
        {error ? (
          <>
            <div className="relative flex items-center justify-center -mt-20">
              <svg
                className="p-6 text-white bg-orange-500 rounded-full"
                width="100px"
                height="100px"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                />
              </svg>
            </div>
            <h2 className="mt-8 text-2xl font-semibold leading-tight text-center">
              {'' + error}
            </h2>
            <div className="absolute top-0 right-0 block pt-4 pr-4">
              <button
                onClick={closeModal}
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
          </>
        ) : (
          <>
            <div className="relative flex items-center justify-center -mt-20">
              <svg
                className="p-6 text-black bg-white rounded-full shadow-xl"
                width="100px"
                height="100px"
                version="1.1"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="m1.6133 18.711h96.773c0.64453 0 1.6133 0.64453 1.6133 1.6133v15.805c-7.418 0.32422-12.902 6.4531-12.902 13.871 0 7.0977 5.4844 13.227 12.902 13.871v15.484c0 0.96875-0.96875 1.9336-1.6133 1.9336h-96.773c-0.96875 0-1.6133-0.96875-1.6133-1.9336v-15.484c7.418-0.64453 12.902-6.7734 12.902-13.871 0-7.418-5.8047-13.547-12.902-13.871v-15.805c0-0.96875 0.64453-1.6133 1.6133-1.6133zm48.387 14.516 4.1953 12.902h13.227l-10.969 7.7422 4.1953 12.582-10.645-7.7422-10.969 7.7422 4.1953-12.582-10.645-7.7422h13.227l4.1953-12.902z"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="mt-8 font-serif text-3xl font-extrabold text-center sm:text-4xl leading-tighter">
              Access Just Javascript
            </h2>
            <p className="my-4 text-base text-center text-gray-700 sm:text-lg sm:px-16">
              Enter your email address that will be used to log in to Just
              Javascript and access the content. Please double check that it is
              correct.
            </p>
            <Formik
              initialValues={{email: ''}}
              validationSchema={loginSchema}
              onSubmit={handleSubmit}
            >
              <div>
                <Form>
                  <div className="mx-auto my-8 sm:max-w-sm">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      Email
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <Field
                        className="block w-full pl-10 bg-white border border-gray-200 shadow-xl focus:border-transparent focus:outline-none focus:ring focus:ring-orange-500 form-input focus:shadow-outline-orange sm:leading-8"
                        autoFocus
                        type="email"
                        name="email"
                        id="email"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-center mt-6 mb-6 sm:mb-8">
                    <span className="inline-flex rounded-md shadow-sm">
                      {purchaseState === 'priceLoaded' && (
                        <button
                          type="submit"
                          className="inline-flex items-center px-10 py-3 text-base font-semibold leading-8 text-white transition duration-150 ease-in-out transform bg-black border border-transparent rounded-md focus:ring focus:ring-orange-500 hover:scale-105 hover:shadow-xl hover:bg-gray-800 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray-500 active:bg-gray-500 "
                        >
                          Get Access
                        </button>
                      )}
                      {purchaseState === 'handlePurchase' && (
                        <button
                          disabled
                          className="inline-flex items-center px-5 py-3 text-base font-semibold leading-8 text-white transition duration-150 ease-in-out bg-gray-300 border border-transparent rounded-md cursor-wait o-80 focus:outline-none"
                        >
                          Claiming Coupon...
                        </button>
                      )}
                    </span>
                  </div>
                </Form>

                {purchaseState === 'priceLoaded' && (
                  <div className="absolute top-0 right-0 block pt-4 pr-4">
                    <button
                      onClick={closeModal}
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
                )}
              </div>
            </Formik>
          </>
        )}
      </DialogContent>
    </DialogOverlay>
  )
}

export default ClaimCouponOverlay
