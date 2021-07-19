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
  const tweet = `https://twitter.com/intent/tweet/?text=I'm about to start learning JustJavaScript.com by @dan_abramov and @mappletons`

  return (
    <Layout noFooter={true}>
      <Confetti />
      <div className="mx-auto w-full text-center py-24">
        <h1 className="max-w-screen-md mx-auto font-serif md:text-5xl sm:text-3xl text-2xl font-extrabold leading-tight">
          Thank you for purchasing Just JavaScript! Check your inbox.
        </h1>
        <code className="font-sans lg:text-3xl sm:text-2xl font-bold py-8 inline-block">
          {displayEmail}
        </code>
        <p className="max-w-3xl sm:text-lg mx-auto w-full pt-2 sm:leading-relaxed leading-[2em] sm:text-center text-left">
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
        <div className="max-w-lg mx-auto">
          <hr className="sm:my-10 my-8" />

          <div className="pb-4 sm:text-lg">
            Please consider telling your friends about Just JavaScript, it would
            help us to get a word out. :)
          </div>
          <a
            href={tweet}
            rel="noopener noreferrer"
            target="_blank"
            className="text-white rounded-md inline-flex items-center px-3 py-2"
            style={{ background: '#2c90dc' }}
          >
            <TwitterIcon />{' '}
            <span className="pl-2 font-medium">Share with your friends!</span>
          </a>
        </div>
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

const TwitterIcon = () => (
  <svg
    height="16"
    width="16"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="#fff">
      <path d="M16,3c-0.6,0.3-1.2,0.4-1.9,0.5c0.7-0.4,1.2-1,1.4-1.8c-0.6,0.4-1.3,0.6-2.1,0.8c-0.6-0.6-1.5-1-2.4-1 C9.3,1.5,7.8,3,7.8,4.8c0,0.3,0,0.5,0.1,0.7C5.2,5.4,2.7,4.1,1.1,2.1c-0.3,0.5-0.4,1-0.4,1.7c0,1.1,0.6,2.1,1.5,2.7 c-0.5,0-1-0.2-1.5-0.4c0,0,0,0,0,0c0,1.6,1.1,2.9,2.6,3.2C3,9.4,2.7,9.4,2.4,9.4c-0.2,0-0.4,0-0.6-0.1c0.4,1.3,1.6,2.3,3.1,2.3 c-1.1,0.9-2.5,1.4-4.1,1.4c-0.3,0-0.5,0-0.8,0c1.5,0.9,3.2,1.5,5,1.5c6,0,9.3-5,9.3-9.3c0-0.1,0-0.3,0-0.4C15,4.3,15.6,3.7,16,3z" />
    </g>
  </svg>
)
