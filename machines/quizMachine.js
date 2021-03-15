import {createMachine, assign} from 'xstate'
import {isEmpty} from 'lodash'
import {postQuizAnswer} from 'utils/post-quiz-answer'
import {getUserAnswerFromLocalStorage} from 'utils/quiz-answers-in-local-storage'

export const quizMachine = createMachine(
  {
    id: 'quizMachine',
    initial: 'initializing',
    title: 'Quiz Machine',
    context: {
      currentQuestionId: null,
      questions: [],
      answers: [],
      userAnswer: null,
      quiz: {
        id: null,
        title: null,
        slug: null,
        version: 1,
      },
    },
    states: {
      initializing: {
        always: [{target: 'idle', cond: 'questionsLoaded'}],
      },
      idle: {
        on: {
          SUBMIT: {
            target: 'answering',
            actions: assign({
              answers: (context, event) => {
                const {answers} = context
                return [...answers, event.userAnswer]
              },
              userAnswer: (_, event) => {
                return event.userAnswer
              },
            }),
          },
        },
        always: [{target: 'answered', cond: 'isAnswered'}],
      },
      answering: {
        invoke: {
          id: 'post-answer',
          src: 'postQuizAnswer',

          onDone: {
            target: 'answered',
          },
          onError: {target: 'failure'},
        },
      },
      answered: {},
      failure: {
        always: [{target: 'idle'}], // TODO
      },
    },
  },
  {
    guards: {
      questionsLoaded: (context, _event) => {
        return !isEmpty(context.questions)
      },
      isAnswered: (context, _event) => {
        return !isEmpty(
          getUserAnswerFromLocalStorage(context.currentQuestionId)
        )
      },
    },
    services: {
      postQuizAnswer: (context) => postQuizAnswer(context),
    },
  }
)
