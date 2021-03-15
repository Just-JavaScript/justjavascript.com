import {isBrowser} from './is-browser'

function storeUserAnswerInLocalStorage(key, value) {
  return isBrowser() && localStorage.setItem(key, JSON.stringify(value))
}

function getUserAnswerFromLocalStorage(key) {
  return isBrowser() && localStorage.getItem(key) // JSON.parse
}

export {storeUserAnswerInLocalStorage, getUserAnswerFromLocalStorage}
