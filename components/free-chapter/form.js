import React from 'react'

const FORM_ID = 2604551

const FreeChapterForm = ({
  styles = {
    form: 'space-y-4 w-full pt-8 sm:pb-16 pb-8 max-w-xs mx-auto',
    input:
      'w-full rounded-md dark:bg-gray-900 dark:text-white dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent',
    label: 'text-sm font-semibold text-left block',
    button:
      'px-12 py-4 hover:scale-105 transition-all ease-in-out duration-150 hover:shadow-xl text-lg font-semibold dark:bg-white dark:text-black bg-black text-white rounded-full',
    comment: 'text-xs italic text-center',
    children: 'pb-4 font-bold sm:text-xl text-lg tracking-tight',
    asterisk: 'opacity-50',
  },
  buttonLabel = 'Get Free Preview',
  children,
}) => {
  return (
    <>
      {children}
      <form
        action={`https://app.convertkit.com/forms/${FORM_ID}/subscriptions`}
        method="post"
        className={styles.form}
      >
        <div>
          <label htmlFor="fields[first_name]" className={styles.label}>
            First Name
          </label>
          <input
            placeholder="Preferred name"
            id="fields[first_name]"
            name="fields[first_name]"
            type="text"
            className={styles.input}
          />
        </div>
        <div>
          <label htmlFor="email_address" className={styles.label}>
            Email
            <abbr title="required" className={styles.asterisk}>
              *
            </abbr>
          </label>
          <input
            placeholder="you@company.com"
            id="email_address"
            type="email"
            name="email_address"
            className={styles.input}
            required
          />
        </div>
        <div className="pt-5 flex items-center justify-center">
          <button type="submit" className={styles.button}>
            {buttonLabel}
          </button>
        </div>
      </form>
    </>
  )
}

export default FreeChapterForm
