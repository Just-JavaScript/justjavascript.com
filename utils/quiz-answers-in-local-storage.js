import {isBrowser} from './is-browser'

function storeUserAnswerInLocalStorage(key, value) {
  try {
    return isBrowser() && localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Quizzes remain usable when browser storage is unavailable.
  }
}

function getUserAnswerFromLocalStorage(key) {
  try {
    return isBrowser() && localStorage.getItem(key) // JSON.parse
  } catch {
    return null
  }
}

function removeQuizAnswersFromLocalStorage(questions) {
  return (
    isBrowser() &&
    questions.forEach((q) => {
      localStorage.removeItem(q.id)
      q.questions &&
        q.questions.forEach((q) => {
          localStorage.removeItem(q.id)
        })
    })
  )
}

export {
  storeUserAnswerInLocalStorage,
  getUserAnswerFromLocalStorage,
  removeQuizAnswersFromLocalStorage,
}
