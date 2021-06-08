import Stripe from 'stripe'

export const fetchStripeCheckoutSession = async (id) => {
  if (!process.env.STRIPE_SECRET_TOKEN) {
    throw new Error('STRIPE_SECRET_TOKEN not found')
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_TOKEN, {
    apiVersion: '2020-08-27',
  })

  return await stripe.checkout.sessions.retrieve(id, {
    expand: ['customer'],
  })
}
