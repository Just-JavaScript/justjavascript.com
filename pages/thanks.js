import get from 'lodash/get'
import Markdown from 'react-markdown'
import Layout from 'components/layout'
import {fetchStripeCheckoutSession} from 'utils/stripe'
import {useRefreshViewer} from 'hooks/use-refresh-viewer'

export default function Thanks({displayEmail}) {
  useRefreshViewer()
  const emailText =
    displayEmail && displayEmail !== 'undefined' ? `**${displayEmail}**` : ''
  const instructionText = `# Thank you for purchasing Just JavaScript. Please check your inbox.
${emailText ? `## ${emailText}` : ''}
As a final step to access the course you need
to check your inbox ${
    emailText ? `(${emailText})` : ''
  } where you will find an email from \`${
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL
  }\`
with a link to access your purchase and start learning.

`

  return (
    <Layout>
      <Markdown
        source={instructionText}
        className="prose lg:prose-lg max-w-screen-lg mx-auto text-center"
      />
    </Layout>
  )
}

export const getServerSideProps = async ({query}) => {
  try {
    const {email, session_id} = query
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
