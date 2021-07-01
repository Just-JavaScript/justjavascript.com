import get from 'lodash/get'
import Markdown from 'react-markdown'
import Layout from 'components/layout'
import { fetchStripeCheckoutSession } from 'utils/stripe'
import { useRefreshViewer } from 'hooks/use-refresh-viewer'
import Confetti from 'components/confetti'

export default function Thanks({ displayEmail }) {
  useRefreshViewer()
  const emailText =
    displayEmail && displayEmail !== 'undefined' ? `${displayEmail}` : ''

  return (
    <Layout noFooter={true}>
      <Confetti />
      <div className="mx-auto w-full text-center">
        <h1 className="max-w-screen-md mx-auto font-serif text-5xl font-extrabold leading-tight">
          Thank you for purchasing Just JavaScript! Check your inbox.
        </h1>
        <code className="font-sans text-3xl font-bold py-8 inline-block">
          {displayEmail}
        </code>
        <p className="max-w-3xl text-lg mx-auto w-full pt-2 leading-relaxed ">
          As a final step to access the course you need to check your inbox{' '}
          <code className="font-semibold text-base px-2 py-1 bg-white shadow-lg rounded-md">
            {emailText}
          </code>{' '}
          where you will find an email from{' '}
          <code className="font-semibold text-base px-2 py-1 bg-white shadow-lg rounded-md">
            team@justjavascript.com
          </code>{' '}
          with a link to access your purchase and start learning.
        </p>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async ({ query }) => {
  try {
    const { email, session_id } = query
    let displayEmail = email
    if (!displayEmail && session_id) {
      const session = await fetchStripeCheckoutSession(session_id)
      displayEmail = get(session, 'customer.email')
    }

    return {
      props: {
        displayEmail,
      },
    }
  } catch (e) {
    console.error(e.message)
    return {
      props: {
        error: e.message,
      },
    }
  }
}
