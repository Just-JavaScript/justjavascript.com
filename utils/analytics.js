import isFunction from 'lodash/isFunction'
import isUndefined from 'lodash/isUndefined'
import get from 'lodash/get'
import axios from 'axios'

const getUser = () => {
  const user = localStorage.getItem('user')
  if (user) {
    const parsedUser = JSON.parse(localStorage.getItem('user'))
    return parsedUser
  }
}

export const track = (event, paramsOrCallback, potentialCallback) => {
  let wasCalled = false
  let callback = potentialCallback
  const currentUser = getUser() || {}
  const timeout = 1250

  const politelyExit = () => {
    if (isFunction(callback) && !wasCalled) {
      wasCalled = true
      callback.apply(null, [event, wasCalled])
    }
  }

  const params = isFunction(paramsOrCallback) ? {} : paramsOrCallback

  if (isUndefined(callback) && isFunction(paramsOrCallback)) {
    callback = paramsOrCallback
  }

  setTimeout(politelyExit, timeout)

  const userParams = {...currentUser, ...params}

  if (get(window, 'analytics.track')) {
    window.analytics.track(event, userParams, politelyExit)
  } else {
    politelyExit()
  }
}

export const signupAfterPurchase = (title, email) => {
  const api_key = process.env.CONVERTKIT_PUBLIC_KEY
  const form = process.env.CONVERTKIT_SIGNUP_FORM
  const tagHash = {
    'purchased testing js': 746923,
    'purchased Basic Testing': 746932,
    'purchased Full Testing': 746933,
    'purchased Pro Testing': 746922,
    'purchased Standard Testing': 746934,
    purchased: 746921,
  }
  const tags = [
    tagHash.purchased,
    tagHash['purchased testing js'],
    tagHash[`purchased ${title}`],
  ]

  return axios({
    method: 'post',
    url: `https://api.convertkit.com/v3/forms/${form}/subscribe`,
    data: {
      email,
      api_key,
      tags,
    },
  })
}

export const identify = (user) => {
  if (get(window, 'analytics.identify') && user) {
    if (user.id) {
      window.analytics.identify(user.id, {
        email: user.email,
        avatar: user.avatar_url,
        eggheadPro: user.is_pro,
        favorites: user.favorites,
      })
    } else {
      window.analytics.identify({
        email: user.email,
        avatar: user.avatar_url,
        eggheadPro: user.is_pro,
        favorites: user.favorites,
      })
    }
  }
}
