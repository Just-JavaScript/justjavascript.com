import getChoiceLabelByIndex from './get-choice-label-by-index'
import {StoreUserAnswerInLocalStorage} from 'utils/quiz-answers-in-local-storage'

export const postQuizAnswer = (context) =>
  new Promise((resolve, reject) => {
    const dataToSubmit = {
      answer: context.userAnswer,
      // answer: getChoiceLabelByIndex(context.userAnswer),
      quiz: {
        id: context.quiz.id,
        title: context.quiz.title,
        question: {id: context.currentQuestionId},
      },
    }
    console.debug('submitted: ', dataToSubmit)

    StoreUserAnswerInLocalStorage(context.currentQuestionId, context.userAnswer)

    if (true) {
      setTimeout(() => resolve(), 800)
    } else {
      reject()
    }
  })
