import React from 'react'

const Subscribe = (props) => (
  <div className="py-10 sm:px-12 px-8 bg-gray-100 rounded-lg">
    <div className="text-4xl font-bold mb-6 text-center leading-tight">
      {props.children}
    </div>
    <form
      action={`https://app.convertkit.com/forms/1152408/subscriptions`}
      method="post"
    >
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="first_name"
            className="block text-base font-medium leading-5 text-gray-700"
          >
            First name
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              id="first_name"
              name="fields[first_name]"
              className="form-input focus:shadow-outline-indigo focus:border-indigo-300 block w-full sm:text-base sm:leading-5"
              placeholder="Preferred name"
              type="text"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-base font-medium leading-5 text-gray-700"
          >
            Email
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              required
              id="email_address"
              name="email_address"
              className="form-input focus:shadow-outline-indigo focus:border-indigo-300 block w-full sm:text-base sm:leading-5"
              placeholder="you@example.com"
              type="email"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-5">
        <span className="inline-flex rounded-md shadow-sm">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
          >
            Join Now
          </button>
        </span>
      </div>
    </form>
  </div>
)

export default Subscribe
