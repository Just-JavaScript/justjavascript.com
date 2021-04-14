import * as serverCookie from 'cookie'
import {ACCESS_TOKEN_KEY} from './auth'

export default function getTokenFromCookieHeaders(serverCookies) {
  const parsedCookie = serverCookie.parse(serverCookies)
  const eggheadToken = parsedCookie[ACCESS_TOKEN_KEY] || ''
  const convertkitId = parsedCookie['ck_subscriber_id'] || ''
  return {convertkitId, eggheadToken, loginRequired: eggheadToken.length <= 0}
}
