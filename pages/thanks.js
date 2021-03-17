import React from 'react'
import get from 'lodash/get'
import Markdown from 'react-markdown'
import Layout from 'components/layout'
import {fetchStripeCheckoutSession} from 'utils/stripe'

export default function Thanks({displayEmail}) {
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
      <div className="min-h-screen flex flex-col justify-center px-8 mx-auto prose lg:prose-lg">
        <Markdown source={instructionText} className="prose lg:prose-lg" />
      </div>
    </Layout>
  )
}

export const getServerSideProps = async ({query}) => {
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
}
