import { storeUserAnswerInLocalStorage } from 'utils/quiz-answers-in-local-storage'

export const postQuizAnswer = async (context) => {
  storeUserAnswerInLocalStorage(context.currentQuestionId, context.userAnswer)
}
