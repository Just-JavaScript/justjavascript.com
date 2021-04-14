import {storeUserAnswerInLocalStorage} from 'utils/quiz-answers-in-local-storage'
import axios from './configured-axios'

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

    axios.post('/api/answer', dataToSubmit)
    storeUserAnswerInLocalStorage(context.currentQuestionId, context.userAnswer)

    if (true) {
      setTimeout(() => resolve(), 800)
    } else {
      reject()
    }
  })
