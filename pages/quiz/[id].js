import Head from 'next/head'
import {Element} from 'react-scroll'
import {useRouter} from 'next/router'
import {map, first, get} from 'lodash'
import {AUTH_DOMAIN} from 'utils/auth'
import Editor from 'components/quiz/editor'
import useEggheadQuiz from 'hooks/useEggheadQuiz'
import QuestionToShow from 'components/quiz/questionToShow'

function Quiz({id, quiz}) {
  const router = useRouter()

  const [current, setCurrent] = React.useState({
    index: 99,
    id: get(first(get(quiz, 'questions')), 'id'),
  })

  return (
    <>
      <Head>
        <title>{quiz.title}</title>
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen w-full">
        <code className="fixed text-right right-5 top-5 font-mono text-sm">
          {JSON.stringify(current)}
        </code>
        {map(quiz.questions, (question, index) => {
          const {
            state,
            handleContinue,
            handleSubmit,
            handleSkip,
            isDisabled,
            currentAnswer,
            currentQuestionIdx,
            isAnswered,
            isLastQuestion,
            showExplanation,
          } = useEggheadQuiz(id, quiz, question, setCurrent)

          console.log(state)

          return state.matches('initializing') ? (
            'loading...'
          ) : (
            <div key={`${quiz.id}-${question.id}`}>
              {router.query.edit ? (
                <Editor idx={index} question={question} />
              ) : (
                <div className="w-full mx-auto max-w-screen-lg">
                  <Element name={question.id} />
                  {index <= current.index && (
                    <QuestionToShow
                      question={question}
                      currentQuestionIdx={currentQuestionIdx}
                      currentAnswer={currentAnswer}
                      isLastQuestion={isLastQuestion}
                      state={state}
                      handleSubmit={handleSubmit}
                      handleContinue={handleContinue}
                      isDisabled={isDisabled}
                      handleSkip={handleSkip}
                      showExplanation={showExplanation}
                      isAnswered={isAnswered}
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
  const res = await fetch(`${AUTH_DOMAIN}/api/quizzes`)
  const quizzes = await res.json()
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
  const res = await fetch(`${AUTH_DOMAIN}/api/quizzes/${id}`)
  const quiz = await res.json()

  return {
    props: {
      id,
      quiz,
    },
  }
}

export default Quiz
