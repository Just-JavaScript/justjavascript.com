import {createMachine, assign} from 'xstate'
import {get, find, first, isEmpty} from 'lodash'
import {fetchQuizData} from 'utils/fetchQuizData'
import {postQuizAnswer} from 'utils/postQuizAnswer'

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
        invoke: {
          id: 'fetch-questions',
          src: 'fetchQuizData',
          onDone: {
            target: 'idle',
            actions: assign({
              questions: (_context, event) => {
                const {data} = event
                const questions = get(data, 'questions')
                return questions
              },
              currentQuestionId: (_context, event) => {
                const {data} = event
                const questions = get(data, 'questions')
                const firstQuestionId = get(first(questions), 'id')
                return firstQuestionId
              },
            }),
          },
        },
        always: [{target: 'idle', cond: 'questionsLoaded'}],
      },
      idle: {
        on: {
          SUBMIT: {
            target: 'answering',
            actions: assign({
              answers: (context, event) => {
                const {answers} = context
                return [...answers, event.answer]
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
        get(
          find(context.questions, {id: context.currentQuestionId}),
          'answer'
        ) !== ''
      },
    },
    services: {
      fetchQuizData: (context) => fetchQuizData(context.quiz.id),
      postQuizAnswer: (context) => postQuizAnswer(context),
    },
  }
)
