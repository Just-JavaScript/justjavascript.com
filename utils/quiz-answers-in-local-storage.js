import {isBrowser} from './is-browser'

function StoreUserAnswerInLocalStorage(key, value) {
  return isBrowser() && localStorage.setItem(key, JSON.stringify(value))
}

function GetUserAnswerFromLocalStorage(key) {
  return isBrowser() && JSON.parse(localStorage.getItem(key))
}

export {StoreUserAnswerInLocalStorage, GetUserAnswerFromLocalStorage}
