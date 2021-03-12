import {isBrowser} from './is-browser'

function StoreUserAnswerInLocalStorage(key, value) {
  return isBrowser() && localStorage.setItem(key, JSON.stringify(value))
}

function GetUserAnswerFromLocalStorage(key) {
  return isBrowser() && localStorage.getItem(key) // JSON.parse
}

export {StoreUserAnswerInLocalStorage, GetUserAnswerFromLocalStorage}
