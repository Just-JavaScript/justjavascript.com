import React from 'react'

const Subscribe = (props) => (
  <div className="px-0 py-8 my-8 text-black bg-white rounded-lg sm:px-16 sm:py-14 sm:my-16">
    <div className="sm:-mx-5 mx-auto mb-16 font-serif text-4xl font-extrabold text-center transform sm:text-6xl leading-tighter">
      {props.children}
    </div>
    <form
      action={`https://app.convertkit.com/forms/1152408/subscriptions`}
      method="post"
    >
      <div className="flex flex-col items-center w-full max-w-md mx-auto space-y-8">
        <div className="w-full">
          <label
            htmlFor="first_name"
            className="block text-base leading-5 text-gray-700"
          >
            First name
          </label>
          <div className="relative mt-1">
            <input
              id="first_name"
              name="fields[first_name]"
              className="block w-full px-5 py-4 font-sans text-lg placeholder-gray-500 bg-white border border-gray-100 rounded-lg shadow-xl focus:border-transparent focus:outline-none focus:ring-orange-500 focus:ring"
              placeholder="Preferred name"
              type="text"
            />
          </div>
        </div>
        <div className="w-full">
          <label
            htmlFor="email"
            className="block text-base leading-5 text-gray-700"
          >
            Email*
          </label>
          <div className="relative mt-1">
            <input
              required
              id="email_address"
              name="email_address"
              className="block w-full px-5 py-4 font-sans text-lg placeholder-gray-500 bg-white border border-gray-100 rounded-lg shadow-xl focus:border-transparent focus:outline-none focus:ring-orange-500 focus:ring"
              placeholder="you@example.com"
              type="email"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full mt-5">
        <span className="inline-flex rounded-md shadow-sm">
          <button
            type="submit"
            className="inline-flex items-center px-16 py-4 mt-8 font-sans text-lg font-bold leading-6 text-white transition-all duration-150 ease-in-out transform bg-black border border-transparent rounded-md hover:shadow-xl hover:scale-105"
          >
            Join Now
          </button>
        </span>
      </div>
    </form>
  </div>
)

export default Subscribe
