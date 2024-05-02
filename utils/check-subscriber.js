import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import find from 'lodash/find'

const convertkitBaseUrl =
  process.env.CONVERTKIT_BASE_URL || 'https://api.convertkit.com/v3/'

async function fetchSubscriber(convertkitId) {
  if (!process.env.CONVERTKIT_API_SECRET) {
    console.warn('set CONVERTKIT_API_SECRET')
    return
  }

  let subscriber

  if (convertkitId) {
    const subscriberUrl = `${convertkitBaseUrl}subscribers/${convertkitId}?api_secret=${process.env.CONVERTKIT_API_SECRET}`
    subscriber = await fetch(subscriberUrl)
      .then((res) => res.json())
      .then(({ subscriber }) => {
        return subscriber
      })
  }

  if (isEmpty(subscriber)) return

  const tagsApiUrl = `${convertkitBaseUrl}/subscribers/${
    subscriber.id
  }/tags?api_key=${
    process.env.NEXT_PUBLIC_CONVERTKIT_TOKEN ||
    process.env.CONVERTKIT_PUBLIC_TOKEN
  }`
  const tags = await fetch(tagsApiUrl).then((res) => res.json())

  return { ...subscriber, tags }
}

export default async function checkSubscriber(context, tagId) {
  const convertKitId =
    get(context.query, process.env.NEXT_PUBLIC_CONVERTKIT_SUBSCRIBER_KEY) ||
    get(context.req.cookies, process.env.NEXT_PUBLIC_CONVERTKIT_SUBSCRIBER_KEY)

  const subscriber = await fetchSubscriber(convertKitId)

  const subscribed = tagId
    ? !isEmpty(find(subscriber?.tags?.tags, { id: tagId }))
    : !isEmpty(subscriber)

  return subscribed
}
