import React from 'react'

const Subscribe = (props) => (
  <div className="sm:p-16 p-10 bg-white  text-black rounded-lg sm:my-16 my-8">
    <div className="sm:text-3xl text-2xl font-serif transform scale-110 font-extrabold mb-8 text-center leading-tight max-w-md mx-auto">
      {props.children}
    </div>
    <form
      action={`https://app.convertkit.com/forms/1152408/subscriptions`}
      method="post"
    >
      <div className="flex flex-col space-y-5 items-center text-center w-full">
        <div className="w-full">
          <label
            htmlFor="first_name"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            First name
          </label>
          <div className="mt-1 relative border-b-2 border-gray-200">
            <input
              id="first_name"
              name="fields[first_name]"
              className="form-input placeholder-gray-600 block w-full sm:text-lg sm:leading-5 text-center font-serif font-semibold"
              placeholder="Preferred name"
              type="text"
            />
          </div>
        </div>
        <div className="w-full">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            Email
          </label>
          <div className="mt-1 relative border-b-2 border-gray-200">
            <input
              required
              id="email_address"
              name="email_address"
              className="form-input placeholder-gray-600 block w-full sm:text-lg sm:leading-5 text-center font-serif font-semibold"
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
            className="mt-8 inline-flex items-center px-16 py-4 border border-transparent text-base leading-6 font-bold font-serif rounded-md text-white bg-black transition-transform transform hover:scale-105 ease-in-out duration-150"
          >
            Join Now
          </button>
        </span>
      </div>
    </form>
  </div>
)

export default Subscribe
