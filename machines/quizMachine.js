import {createMachine, assign} from 'xstate'
import {get, find, first, isEmpty} from 'lodash'
import {fetchQuizData} from 'utils/fetchQuizData'
import axios from 'axios'

// questionMachine or quizQuestionMachine
// might be more appropriate name?
// it's handling question
// quizMachine could be one that handles navigation?
export const quizMachine = createMachine(
  {
    id: 'quiz',
    initial: 'initializing',
    title: 'Demo Quiz',
    context: {
      currentQuestionId: null,
      quizId: null,
      questions: [],
      answers: [],
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
                // console.log(data)
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
            }),
          },
        },
        always: [{target: 'answered', cond: 'isAnswered'}],
      },
      answering: {
        invoke: {
          id: 'postingAnswer',
          src: (context, _event) => {
            const {answers, currentQuestionId} = context
            const answer = find(answers, {id: currentQuestionId})
            // axios.post(`http://localhost:8080/quizzes`, {
            //   ...answer,
            // })

            // faking a promise
            // use axios.post() etc
            return new Promise((resolve, reject) => {
              if (true) {
                setTimeout(() => resolve(), 800)
              } else {
                reject()
              }
            })
          },

          onDone: {
            target: 'answered',
          },
          onError: {target: 'failure'}, // todo
        },
      },
      answered: {
        // on: {
        // NEXT_QUESTION: {
        // target: 'idle',
        // actions: assign({
        //   currentQuestionId: (_context, event) => {
        //     return event.nextQuestionId
        //   },
        // }),
        // },
        // },
      },
      failure: {
        always: [{target: 'idle'}], // todo
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
          get(
            find(context.questions, {id: context.currentQuestionId}),
            'answer',
          ),
        )
      },
    },
    services: {
      fetchQuizData: (context) => fetchQuizData(context.quizId),
    },
  },
)
