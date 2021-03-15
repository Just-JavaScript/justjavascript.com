import cookies from 'js-cookie'
import {isString} from 'lodash'

const cookieUtil = {
  set(name, value, options = {}) {
    const use_secure_cookie = window.location.protocol === 'https:'
    cookies.set(name, isString(value) ? value : JSON.stringify(value), {
      secure: use_secure_cookie,
      path: '/',
      expires: 365,
      ...options,
    })
    return cookies.get(name)
  },
  get(name) {
    const value = cookies.get(name)
    try {
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  },
  remove(name) {
    cookies.remove(name)
  },
}

export default cookieUtil
