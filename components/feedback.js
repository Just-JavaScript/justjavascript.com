import React from 'react'
import {postQuizAnswer} from 'utils/post-quiz-answer'
import Spinner from 'components/spinner'
import {getUserAnswerFromLocalStorage} from 'utils/quiz-answers-in-local-storage'
import isEmpty from 'lodash/isEmpty'

const Feedback = ({quiz}) => {
  const {id: quizId} = quiz
  const key = `${quizId}~feedback`
  const answer = JSON.parse(getUserAnswerFromLocalStorage(key))
  const answered = !isEmpty(answer)
  const [value, setValue] = React.useState(answer)
  const [error, setError] = React.useState()
  const [submitted, setSubmitted] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)
  const disabled = !submitting && (submitted || answered)
  const context = {
    userAnswer: value,
    currentQuestionId: key,
    quiz: {
      id: quizId,
    },
  }
  function handleSubmitFeedback() {
    if (!isEmpty(value)) {
      setError('')
      setSubmitting(true)
      postQuizAnswer(context)
        .then(() => {
          setSubmitting(false)
          setSubmitted(true)
          setError('')
        })
        .catch((err) => setError(err))
    } else {
      setError("Can't stay empty.")
    }
  }

  return (
    <div>
      <span className="px-2 py-1 text-sm font-semibold text-white uppercase bg-black rounded-md">
        Feedback
      </span>
      <h4 className="py-4 text-2xl font-bold leading-tight sm:text-3xl">
        Tell me what you think of this module and Just JavaScript so far.
      </h4>
      <div className="prose sm:prose-lg max-w-none">
        <p>
          Was anything particularly insightful? Or confusing? I want to know!
        </p>
        <p>
          There's no character limit for this question. I personally read every
          response, whether it's a few words or many paragraphs.
        </p>
        <p>
          Cheers, <br />
          Dan
        </p>
      </div>
      <form
        className="py-4"
        onSubmit={(e) => {
          handleSubmitFeedback()
          e.preventDefault()
        }}
      >
        <textarea
          disabled={disabled}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          rows={5}
          className="w-full p-3 prose border border-gray-200 rounded-md bg-gray-50 prose-sans max-w-none focus:shadow-outline-orange focus:ring-orange-500 focus:border-transparent"
          placeholder="Type your feedback here..."
        />
        {!isEmpty(error) && error}
        <button
          disabled={disabled}
          className={`flex items-center justify-center w-full px-3 py-3 mt-4 font-semibold transition-colors duration-300 ease-in-out  rounded-md  focus:outline-none focus:ring focus:ring-orange-500 ${
            disabled
              ? 'cursor-not-allowed bg-white text-black'
              : 'cursor-hand bg-black text-white hover:bg-gray-900'
          }`}
          type="submit"
        >
          {submitted ? (
            'Sent. Thanks!'
          ) : submitting ? (
            <Spinner className="text-white" />
          ) : (
            'Send feedback'
          )}
        </button>
      </form>
    </div>
  )
}

export default Feedback
