import * as React from 'react'
import QuestionToShow from 'components/quiz/questionToShow'
import {Element as ScrollElement} from 'react-scroll'
import useEggheadQuiz from '../../../hooks/useEggheadQuiz'
import {map, filter, first, find, get} from 'lodash'
import getChoiceLabelByIndex from '../../../utils/getChoiceLabelByIndex'

function getQuestions(questions) {
  const items = questions.map((question) => {
    const {id, type, children, required, version, canComment} = question.props
    const isMultipart = type === 'QuestionSet'
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
          const isCorrect = choice.props.correct || false
          const label = imageUrl
            ? getChoiceLabelByIndex(index)
            : filter(children, (ch) => ch.props.mdxType !== 'img')

          return {
            id: `${index}`,
            value: `${index}`,
            label,
            imageUrl,
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
      ? nestedQuestionsNodes.map((q) => {
          const {id, type, children, required, version, canComment} = q.props
          const prompt =
            find(children, {props: {mdxType: 'Prompt'}}) || children
          const answer = find(children, {props: {mdxType: 'Answer'}})
          const ch = React.Children.toArray(children)
          const choicesNodes = filter(
            ch,
            (child) => child?.props?.mdxType === 'Choice'
          )
          return {
            id,
            __typename: type,
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
      __typename: type,
      prompt,
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
  const questions = getQuestions(childrenArr)

  // put it all together
  const quiz = {
    id,
    title,
    slug,
    version,
    questions,
  }

  const [currentQuestion, setCurrentQuestion] = React.useState({
    index: 0,
    id: get(first(get(quiz, 'questions')), 'id'),
  })

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full bg-gray-50">
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
        } = useEggheadQuiz(quiz, question, setCurrentQuestion)

        return state.matches('initializing') ? (
          'loading...'
        ) : (
          <div className="w-full mx-auto max-w-screen-sm" key={question.id}>
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
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Quiz
