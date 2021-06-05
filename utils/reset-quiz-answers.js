import {removeQuizAnswersFromLocalStorage} from 'utils/quiz-answers-in-local-storage'

export default async function resetQuizAnswers({questions}) {
  removeQuizAnswersFromLocalStorage(questions)
  window.location.reload()
}
