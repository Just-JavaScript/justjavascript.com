import * as React from 'react'
import QuestionToShow from 'components/quiz/question-to-show'
import {Element as ScrollElement} from 'react-scroll'
import useEggheadQuiz from 'hooks/use-egghead-quiz'
import {map, filter, first, indexOf, isEmpty, last, find, get} from 'lodash'
import getChoiceLabelByIndex from 'utils/get-choice-label-by-index'
import {getUserAnswerFromLocalStorage} from 'utils/quiz-answers-in-local-storage'
import Layout from 'components/layout'
import resetQuizAnswers from 'utils/reset-quiz-answers'
import ResetProgress from '../../reset-progress'

function getQuestions(questions, quizId, quizVersion) {
  const items = questions.map((question, questionIndex) => {
    const {kind, children, required, version, canComment} = question.props
    let id = quizId + '~' + quizVersion + '~' + questionIndex
    if (question.props.desc) {
      id += '(' + question.props.desc + ')'
    }
    const isMultipart = kind === 'QuestionSet'
    const prompt =
      find(children, {props: {mdxType: 'Prompt'}}) || (!isMultipart && children)
    const answer = find(children, {props: {mdxType: 'Answer'}})

    // choices for MultipleChoiceQuestion
    const choicesNodes = filter(
      children,
      (child) => child.props.mdxType === 'Choice'
    )
    function getChoices(choices) {
      const choicesFromMdx =
        choices &&
        map(choices, (choice, index) => {
          const children = React.Children.toArray(choice.props.children)
          const imageUrl = get(
            find(children, {props: {mdxType: 'img'}}),
            'props.src'
          )
          const imageAlt = get(
            find(children, {props: {mdxType: 'img'}}),
            'props.alt'
          )
          const isCorrect = choice.props.correct || false
          const label = imageUrl
            ? getChoiceLabelByIndex(index)
            : filter(children, (ch) => ch.props.mdxType !== 'img')

          return {
            id: `${index}`,
            value: `${index}`,
            label,
            imageUrl,
            imageAlt,
            isCorrect,
          }
        })
      const correctChoice = find(choicesFromMdx, {isCorrect: true})

      return {
        choicesFromMdx,
        correctChoices: [correctChoice],
      }
    }

    // nested questions
    const nestedQuestionsNodes = filter(
      question.props.children,
      (q) => q.props.mdxType !== 'Prompt'
    )
    const nestedQuestions = isMultipart
      ? nestedQuestionsNodes.map((q, childIndex) => {
          const {kind, children, required, version, canComment} = q.props
          let childId = id + '.' + childIndex
          const prompt =
            find(children, {props: {mdxType: 'Prompt'}}) || children
          const answer = find(children, {props: {mdxType: 'Answer'}})
          const ch = React.Children.toArray(children)
          const choicesNodes = filter(
            ch,
            (child) => child?.props?.mdxType === 'Choice'
          )
          return {
            id: childId,
            kind,
            prompt,
            answer: {
              description: answer,
            },
            choices: getChoices(choicesNodes).choicesFromMdx,
            correctChoices: getChoices(choicesNodes).correctChoices,
            required,
            version,
            canComment,
          }
        })
      : []

    // assemble the final structure that useEggheadQuiz expects
    return {
      id,
      kind,
      prompt,
      // userAnswer,
      answer: {
        description: answer,
      },
      choices: getChoices(choicesNodes).choicesFromMdx,
      correctChoices: getChoices(choicesNodes).correctChoices,
      required,
      version,
      canComment,
      questions: [...nestedQuestions],
    }
  })
  return items
}

const Quiz = ({children, title, version, slug, id}) => {
  const childrenArr = React.Children.toArray(children)
  const questions = getQuestions(childrenArr, id, version)

  // put it all together
  const quiz = {
    id,
    title,
    slug,
    version,
    questions,
  }

  // Persist answers in local storage

  const ids = questions.map((q) => q.id)
  // Get answered questions in current quiz
  const completedQuestions = filter(ids, (id) =>
    getUserAnswerFromLocalStorage(id)
  )

  // Start from last answered question
  // todo: might actually want to start from the question after that
  const defaultCurrentQuestionId = !isEmpty(completedQuestions)
    ? get(find(questions, {id: last(completedQuestions)}), 'id')
    : get(first(get(quiz, 'questions')), 'id')

  const defaultCurrentQuestionIndex =
    indexOf(ids, defaultCurrentQuestionId) || 0

  const [currentQuestion, setCurrentQuestion] = React.useState({
    id: defaultCurrentQuestionId,
    index: defaultCurrentQuestionIndex,
  })

  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Layout maxWidth="" background="bg-gray-100">
      <header className="flex flex-col items-center justify-center py-24 text-center">
        <h1 className="font-serif font-extrabold tracking-tight lg:text-8xl sm:text-7xl text-7xl">
          Quiz
        </h1>
        <h2 className="font-sans text-lg font-semibold">
          {quiz.title.slice(7)}
        </h2>
        {!isEmpty(completedQuestions) && (
          <div className="pt-8">
            <ResetProgress
              questions={[
                ...get(quiz, 'questions'),
                {id: `${get(quiz, 'id')}~feedback`},
              ]}
            />
          </div>
        )}
      </header>
      <div className="flex flex-col items-center justify-start w-full min-h-screen">
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
            nextQuestionIdx,
            nextQuestionId,
            number,
          } = useEggheadQuiz(
            quiz,
            question,
            setCurrentQuestion,
            defaultCurrentQuestionId,
            defaultCurrentQuestionIndex
          )

          return state.matches('initializing') ? (
            'loading...'
          ) : (
            <div className="w-full max-w-screen-md mx-auto" key={question.id}>
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
                  nextQuestionIdx={nextQuestionIdx}
                  nextQuestionId={nextQuestionId}
                  setCurrentQuestion={setCurrentQuestion}
                  quiz={quiz}
                />
              )}
            </div>
          )
        })}
        {mounted && process.env.NODE_ENV === 'development' && (
          <div className="fixed font-mono text-xs opacity-50 left-5 bottom-5">
            currentQuestion: {JSON.stringify(currentQuestion, null, 2)}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Quiz
