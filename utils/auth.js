export const AUTH_DOMAIN = process.env.NEXT_PUBLIC_AUTH_DOMAIN
import OAuthClient from 'client-oauth2'
import configuredAxios from './configured-axios'
import get from 'lodash/get'
import cookie from 'utils/cookies'
import getAccessTokenFromCookie from './get-access-token-from-cookie'
import * as serverCookie from 'cookie'

const AUTH_CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID
const AUTH_REDIRECT_URL = process.env.NEXT_PUBLIC_REDIRECT_URI

export const USER_KEY = 'jjs_user'
export const ACCESS_TOKEN_KEY = 'jjs_sellable_access_token'
export const EXPIRES_AT_KEY = 'jjs_sellable_expires_at'
export const VIEWING_AS_USER_KEY = 'jjs_sellable_viewing_as_user'

export function getTokenFromCookieHeaders(serverCookies = '') {
  const parsedCookie = serverCookie.parse(serverCookies)
  const eggheadToken = parsedCookie[ACCESS_TOKEN_KEY] || ''
  const convertkitId = parsedCookie['ck_subscriber_id'] || ''
  return { convertkitId, eggheadToken, loginRequired: eggheadToken.length <= 0 }
}

export const getAuthorizationHeader = () => {
  const token = getAccessTokenFromCookie()
  const authorizationHeader = token && {
    Authorization: `Bearer ${token}`,
  }

  return authorizationHeader
}

const SIXTY_DAYS_IN_SECONDS = 5184000

export default class Auth {
  eggheadAuth

  constructor(redirectUri) {
    this.eggheadAuth = new OAuthClient({
      clientId: AUTH_CLIENT_ID,
      authorizationUri: `${AUTH_DOMAIN}/oauth/authorize`,
      accessTokenUri: `${AUTH_DOMAIN}/oauth/token`,
      redirectUri: redirectUri || AUTH_REDIRECT_URL,
    })
    this.requestSignInEmail = this.requestSignInEmail.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.refreshUser = this.refreshUser.bind(this)
    this.getAuthToken = this.getAuthToken.bind(this)
    this.monitor = this.monitor.bind(this)
  }

  becomeUser(email, accessToken) {
    if (typeof localStorage === 'undefined') {
      return
    }
    return configuredAxios
      .post(
        `${AUTH_DOMAIN}/api/v1/users/become_user?email=${email}&client_id=${AUTH_CLIENT_ID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(({ data }) => {
        const expiresAt = JSON.stringify(
          data.access_token.expires_in * 1000 + new Date().getTime()
        )
        const user = data.user

        localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token.token)
        localStorage.setItem(EXPIRES_AT_KEY, expiresAt)
        localStorage.setItem(USER_KEY, JSON.stringify(user))
        localStorage.setItem(VIEWING_AS_USER_KEY, get(user, 'email'))

        cookie.set(ACCESS_TOKEN_KEY, data.access_token.token, {
          expires: parseInt(expiresAt, 10),
        })
        return user
      })
      .catch((error) => {
        this.logout()
      })
  }

  requestSignInEmail(email) {
    return configuredAxios.post(
      `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/users/send_token`,
      {
        email,
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      }
    )
  }

  login() {
    window.open(this.eggheadAuth.token.getUri())
  }

  logout() {
    this.clearLocalStorage()
  }

  monitor(onInterval, delay = 2000) {
    if (this.isAuthenticated()) {
      return window.setInterval(onInterval, delay)
    }
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      if (typeof localStorage === 'undefined') {
        reject('no localstorage')
      }
      if (typeof window !== 'undefined') {
        this.eggheadAuth.token.getToken(window.location).then(
          (authResult) => {
            this.setSession(authResult).then(
              (user) => {
                resolve(user)
              },
              (error) => {
                console.error(error)
                this.logout()
                reject(error)
              }
            )
          },
          (error) => {
            console.error(error)
            this.logout()
            reject(error)
          }
        )
      }
    })
  }

  clearLocalStorage() {
    if (typeof localStorage === 'undefined') {
      return
    }
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(EXPIRES_AT_KEY)
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(VIEWING_AS_USER_KEY)

    cookie.remove(ACCESS_TOKEN_KEY)
  }

  isAuthenticated() {
    if (typeof localStorage === 'undefined' || typeof window === 'undefined') {
      return
    }
    const storedExpiration = localStorage.getItem(EXPIRES_AT_KEY) || '0'
    const expiresAt = JSON.parse(storedExpiration)
    const expired = new Date().getTime() > expiresAt
    if (expired) {
      this.logout()
    }
    return !expired
  }

  refreshUser(accessToken, loadFullUser = false, authDomain = AUTH_DOMAIN) {
    return new Promise((resolve, reject) => {
      if (typeof localStorage === 'undefined') {
        reject('no local storage')
      }
      const token = accessToken || cookie.get(ACCESS_TOKEN_KEY)
      configuredAxios
        .get(`${authDomain}/api/v1/users/current?minimal=${!loadFullUser}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
          localStorage.setItem(USER_KEY, JSON.stringify(data))
          resolve(data)
        })
        .catch((error) => {
          this.logout()
          reject(error)
        })
    })
  }

  setSession(authResult, authDomain = AUTH_DOMAIN) {
    return new Promise((resolve, reject) => {
      if (typeof localStorage === 'undefined') {
        reject('localStorage is not defined')
      }
      const expiresInSeconds = get(
        authResult,
        'data.expires_in',
        SIXTY_DAYS_IN_SECONDS
      )
      const expiresInDays = Number(expiresInSeconds) / 60 / 60 / 24
      const expiresAt = JSON.stringify(
        expiresInSeconds * 1000 + new Date().getTime()
      )

      localStorage.setItem(ACCESS_TOKEN_KEY, authResult.accessToken)
      localStorage.setItem(EXPIRES_AT_KEY, expiresAt)
      cookie.set(ACCESS_TOKEN_KEY, authResult.accessToken, {
        expires: expiresInDays,
      })
      resolve(this.refreshUser(authResult.accessToken, false, authDomain))
    })
  }

  getAuthToken() {
    if (typeof localStorage === 'undefined') {
      return
    }
    if (this.isAuthenticated()) {
      return cookie.get(ACCESS_TOKEN_KEY)
    }
  }

  getUser() {
    return this.getLocalUser()
  }

  getLocalUser() {
    if (typeof localStorage === 'undefined') {
      return
    }
    const user = localStorage.getItem(USER_KEY)
    if (user) {
      const parsedUser = JSON.parse(user)
      return parsedUser
    }
  }

  getUserName() {
    if (this.getLocalUser()) {
      return this.getLocalUser().name
    }
  }
}
