import React from 'react'
import QuestionWrapper from 'components/quiz/questionWrapper'
import AnswerWrapper from 'components/quiz/answerWrapper'
import Explanation from 'components/quiz/explanation'
import QuizWrapper from 'components/quiz/wrapper'
import Submit from 'components/quiz/submit'
import SubmitAndContinue from 'components/quiz/submitAndContinue'
import Markdown from 'components/quiz/markdown'
import useEggheadQuestion from 'hooks/useEggheadQuestion'
import {isEmpty} from 'lodash'
import {motion, AnimatePresence, AnimateSharedLayout} from 'framer-motion'

const MultipleChoice = (props) => {
  const {
    question,
    state,
    handleContinue,
    handleSubmit,
    isDisabled,
    currentAnswer,
    number,
    isLastQuestion,
    showExplanation,
    nested,
  } = props
  const {formik} = useEggheadQuestion(question, handleSubmit)
  const hasAnsweredCorrectly =
    question.correctChoices[0]?.value === formik.values.value
  const hasImages = question.choices[0]?.imageUrl
  const explanation = question.answer?.description
  const isMDX = typeof question.prompt !== 'string'

  return (
    <QuizWrapper {...props}>
      <QuestionWrapper number={number} nested={nested}>
        {isMDX ? (
          <div className="prose max-w-none">{question.prompt}</div>
        ) : (
          <Markdown>{question.prompt}</Markdown>
        )}
      </QuestionWrapper>
      <AnswerWrapper>
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          <div
            role="group"
            aria-labelledby="choices"
            className={
              hasImages && 'grid gap-2 sm:grid-cols-2 grid-cols-1 py-4'
            }
          >
            {question.choices &&
              question.choices.map((choice, i) => {
                const hasAnswered =
                  question?.correctChoices[0]?.value &&
                  (state.matches('answered') || question.value)
                const correctAnswer =
                  hasAnswered &&
                  question?.correctChoices[0]?.value === choice.value
                const incorrectAnswer =
                  hasAnswered &&
                  formik.values.value === choice.value &&
                  !correctAnswer
                return (
                  <div
                    className={`${
                      hasImages ? '' : 'border-b'
                    } bg-white rounded-lg ${
                      isDisabled ? '' : 'hover:bg-cool-gray-50'
                    } ${
                      question.choices.length === i + 1
                        ? 'border-transparent'
                        : 'border-cool-gray-100'
                    } ${correctAnswer ? 'bg-green-100' : ''}
                         ${incorrectAnswer ? 'bg-rose-100' : ''}`}
                    key={choice.value}
                  >
                    <label
                      className={`block px-3 pb-3 pt-2 ${
                        isDisabled ? '' : 'cursor-pointer'
                      }`}
                    >
                      <input
                        disabled={isDisabled}
                        type="radio"
                        name="value"
                        value={choice.value}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={
                          formik.values.value === choice.value ||
                          (currentAnswer
                            ? choice.value === currentAnswer.value
                            : false)
                        }
                        className="mr-2 -mt-1 form-radio bg-cool-gray-100 border border-cool-gray-200"
                      />
                      {isMDX ? (
                        <span className="prose max-w-none">{choice.label}</span>
                      ) : (
                        <Markdown className="inline-block prose md:prose-lg text-gray-900">
                          {choice.label}
                        </Markdown>
                      )}
                      {choice.imageUrl && (
                        <img
                          src={choice.imageUrl}
                          alt={choice.label}
                          className="border border-gray-200 rounded-lg mt-1"
                        />
                      )}
                    </label>
                  </div>
                )
              })}
            {formik.submitCount > 0 && formik.errors.value}
          </div>
          <div>
            {question.canComment === true && (
              <>
                <label htmlFor="comment" className="block mt-2">
                  {question.commentPrompt && (
                    <Markdown>{question.commentPrompt}</Markdown>
                  )}
                </label>
                {state.matches('answered') ? (
                  <Markdown className="p-3 mt-4">
                    {formik.values.comment}
                  </Markdown>
                ) : (
                  <>
                    <textarea
                      className="w-full p-3 bg-cool-gray-100 border border-gray-200 prose max-w-none rounded-md h-24 mt-4"
                      disabled={isDisabled}
                      id="comment"
                      name="comment"
                      placeholder="Write your answer..."
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.comment}
                    />
                    {formik.submitCount > 0 && formik.errors.comment}
                  </>
                )}
              </>
            )}
          </div>

          {state.matches('answered') && question?.correctChoices[0]?.value && (
            <motion.div
              layout
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              className={`w-full text-center mt-4 px-3 py-3 rounded-md font-semibold ${
                hasAnsweredCorrectly
                  ? 'bg-green-100 text-green-700'
                  : 'bg-rose-100 text-rose-600 '
              } transition-colors ease-in-out duration-300`}
            >
              {hasAnsweredCorrectly ? 'Correct! 🎉' : 'Incorrect'}
            </motion.div>
          )}

          {explanation ? (
            <Submit
              isDisabled={isDisabled}
              isSubmitting={state.matches('answering')}
              explanation={explanation}
            />
          ) : (
            isEmpty(question.value) &&
            !state.matches('answered') && (
              <SubmitAndContinue
                isLastQuestion={isLastQuestion}
                state={state}
                handleContinue={handleContinue}
                isDisabled={state.matches('answering')}
                isSubmitting={state.matches('answering')}
              />
            )
          )}
        </form>
      </AnswerWrapper>
      <AnimateSharedLayout>
        <AnimatePresence>
          {showExplanation && (
            <Explanation>{question.answer.description}</Explanation>
          )}
        </AnimatePresence>
      </AnimateSharedLayout>
    </QuizWrapper>
  )
}

export default MultipleChoice
