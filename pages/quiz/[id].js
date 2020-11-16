import Head from 'next/head'
import {Element as ScrollElement} from 'react-scroll'
import {useRouter} from 'next/router'
import {map, first, get, find} from 'lodash'
import Editor from 'components/quiz/editor'
import useEggheadQuiz from 'hooks/useEggheadQuiz'
import QuestionToShow from 'components/quiz/questionToShow'
import quizzes from 'data/quizzes'

function Quiz({quiz}) {
  const router = useRouter()

  const [currentQuestion, setCurrentQuestion] = React.useState({
    index: 0,
    id: get(first(get(quiz, 'questions')), 'id'),
  })

  return (
    <>
      <Head>
        <title>{quiz.title}</title>
      </Head>
      <main className="flex flex-col items-center justify-start min-h-screen w-full bg-cool-gray-50">
        <code className="z-10 opacity-25 fixed text-right right-5 top-5 font-mono text-sm">
          {JSON.stringify(currentQuestion)}
        </code>
        {map(quiz.questions, (question, index) => {
          const {
            state,
            handleSkip,
            isAnswered,
            isDisabled,
            handleSubmit,
            currentAnswer,
            handleContinue,
            isLastQuestion,
            showExplanation,
            number,
          } = useEggheadQuiz(quiz, question, setCurrentQuestion)

          return state.matches('initializing') ? (
            'loading...'
          ) : (
            <div key={`${quiz.id}-${question.id}`}>
              {router.query.edit ? (
                <Editor idx={index} question={question} />
              ) : (
                <div className="w-full mx-auto max-w-screen-sm">
                  <ScrollElement name={question.id} />
                  {index <= currentQuestion.index && (
                    <QuestionToShow
                      question={question}
                      number={number}
                      currentAnswer={currentAnswer}
                      isLastQuestion={isLastQuestion}
                      state={state}
                      handleSubmit={handleSubmit}
                      handleContinue={handleContinue}
                      isDisabled={isDisabled}
                      handleSkip={handleSkip}
                      showExplanation={showExplanation}
                      isAnswered={isAnswered}
                      currentQuestion={currentQuestion}
                    />
                  )}
                </div>
              )}
            </div>
          )
        })}
      </main>
    </>
  )
}

export async function getStaticPaths() {
  // const res = await fetch(`${AUTH_DOMAIN}/api/quizzes`)
  // const quizzes = await res.json()

  const paths = quizzes.map((quiz) => ({
    params: {
      id: quiz.id,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const id = context.params.id
  // const res = await fetch(`${AUTH_DOMAIN}/api/quizzes/${id}`)
  // const quiz = await res.json()
  const quiz = find(quizzes, {id: id})

  return {
    props: {
      id,
      quiz,
    },
  }
}

export default Quiz
