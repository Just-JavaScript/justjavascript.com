import getChoiceLabelByIndex from './getChoiceLabelByIndex'

export const postQuizAnswer = (context) =>
  new Promise((resolve, reject) => {
    const dataToSubmit = {
      answer: getChoiceLabelByIndex(context.userAnswer),
      quiz: {
        id: context.quiz.id,
        title: context.quiz.title,
        question: {id: context.currentQuestionId},
      },
    }
    console.debug('submitted: ', dataToSubmit)
    if (true) {
      setTimeout(() => resolve(), 800)
    } else {
      reject()
    }
  })
