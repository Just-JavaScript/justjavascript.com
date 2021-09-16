import { useConvertkit } from '@skillrecordings/convertkit'
import Confetti from 'components/confetti'
import Layout from 'components/layout'
import Spinner from 'components/spinner'
import React from 'react'

const ConfirmEmailForFreeEpisode = () => {
  const { subscriber, loadingSubscriber } = useConvertkit()

  return (
    <Layout>
      <Confetti />
      <article className="flex flex-col items-center justify-center text-center max-w-sm mx-auto w-full">
        <h1 className="font-serif text-4xl font-bold">Check your inbox</h1>
        <h2 className="text-lg pt-2 pb-5">
          A link to access <b>The JavaScript Universe</b> episode just got sent
          {loadingSubscriber ? (
            <>.</>
          ) : (
            <>
              {' '}
              to <b>{subscriber?.email_address}</b>.
            </>
          )}
        </h2>
        <p className="opacity-80 text-sm max-w-none">
          If you don't see the email after a few minutes, you might check your
          spam folder or other filters and add{' '}
          <span className="font-semibold">dan@justjavascript.com</span> to your
          contacts.
          <br />
          <br />
          <i>Thanks,</i>
          <br />
          <i>Dan</i>
        </p>
      </article>
    </Layout>
  )
}

export default ConfirmEmailForFreeEpisode
