import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import find from 'lodash/find'
import { ACCESS_TOKEN_KEY } from 'utils/auth'
import { fetchConvertkitSubscriberFromServerCookie } from '@skillrecordings/convertkit'

export default async function checkSubscriber(context, tagId) {
  const cookieHeader = context.req.headers.cookie
  const eggheadToken = get(context.req.cookies, ACCESS_TOKEN_KEY)
  const convertkitId = get(
    context.req.cookies,
    process.env.NEXT_PUBLIC_CONVERTKIT_SUBSCRIBER_KEY
  )

  const [subscriber] =
    convertkitId || eggheadToken
      ? await fetchConvertkitSubscriberFromServerCookie(cookieHeader)
      : [null]

  // test
  // const subscriber = {
  //   tags: [
  //     {
  //       id: '123456',
  //     },
  //   ],
  // }

  // if tagId is passed then check if subscriber is tagged
  // if not, simply check if they're subscribed
  const subscribed = tagId
    ? (subscriber && !isEmpty(find(subscriber.tags, { id: tagId }))) || false
    : !isEmpty(subscriber)

  return subscribed
}
