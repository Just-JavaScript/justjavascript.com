import {storeUserAnswerInLocalStorage} from 'utils/quiz-answers-in-local-storage'
import axios from './configured-axios'

export const postQuizAnswer = (context) =>
  new Promise((resolve, reject) => {
    const dataToSubmit = {
      question: context.currentQuestionId,
      answer: JSON.stringify(context.userAnswer),
      quiz: {
        id: context.quiz.id,
      },
    }
    console.debug('submitted: ', dataToSubmit)

    axios.post('/api/answer', dataToSubmit).then(() => {
      resolve()
      storeUserAnswerInLocalStorage(
        context.currentQuestionId,
        context.userAnswer
      )
    })
  })
