import React from 'react'
import * as yup from 'yup'
import { postQuizAnswer } from 'utils/post-quiz-answer'
import Spinner from 'components/spinner'
import { getUserAnswerFromLocalStorage } from 'utils/quiz-answers-in-local-storage'
import isEmpty from 'lodash/isEmpty'
import { useFormik } from 'formik'

const Feedback = ({ quiz }) => {
  const { id: quizId } = quiz
  const key = `${quizId}~feedback`
  const answer = JSON.parse(getUserAnswerFromLocalStorage(key)) || ''
  const [submitted, setSubmitted] = React.useState(false)

  const formik = useFormik({
    initialValues: {
      feedback: answer,
    },
    validationSchema: yup.object().shape({
      feedback: yup.string().required(`Can't stay empty`),
    }),
    onSubmit: (values, actions) => {
      const dataToSubmit = {
        userAnswer: values.feedback,
        currentQuestionId: key,
        quiz: {
          id: quizId,
        },
      }
      postQuizAnswer(dataToSubmit)
        .then(() => {
          setSubmitted(true)
        })
        .catch((err) => {
          setSubmitted(false)
          actions.setErrors({ feedback: `Something went wrong. ${err}` })
        })
    },
  })

  const disabled =
    formik.isSubmitting || submitted || !isEmpty(formik.initialValues.feedback)

  return (
    <div className="sm:px-5 pb-8">
      {/* <span className="px-2 py-1 text-sm font-semibold text-white uppercase bg-black rounded-md">
        Feedback
      </span> */}
      <h4 className="py-4 font-serif text-2xl font-bold leading-tight text-center sm:text-4xl">
        Tell me what you think of this module and Just JavaScript so far.
      </h4>
      <div className="prose text-center sm:prose-lg max-w-none">
        <p>
          Was anything particularly insightful? Or confusing? I want to know!
        </p>
        <p>
          There's no character limit for this question. I personally read every
          response, whether it's a few words or many paragraphs. Cheers, Dan.
        </p>
      </div>
      <form className="py-4" onSubmit={formik.handleSubmit}>
        <label
          htmlFor="feedback"
          className="inline-flex pb-2 text-lg font-semibold"
        >
          Your feedback
        </label>
        <textarea
          required={true}
          disabled={disabled}
          value={formik.values.feedback}
          onChange={formik.handleChange}
          rows={5}
          name="feedback"
          className="w-full p-3 prose border border-gray-200 rounded-md bg-gray-50 prose-sans max-w-none focus:shadow-outline-orange focus:ring-orange-500 focus:border-transparent"
          placeholder="Type your feedback here..."
        />
        {formik.errors.feedback &&
          formik.touched.feedback &&
          formik.errors.feedback}
        <button
          disabled={disabled}
          className={`flex items-center justify-center w-full px-3 py-3 mt-4 font-semibold transition-colors duration-300 ease-in-out  rounded-md  focus:outline-none focus:ring focus:ring-orange-500 ${
            submitted
              ? 'cursor-not-allowed bg-white text-black'
              : 'cursor-hand bg-black text-white hover:bg-gray-900'
          }`}
          type="submit"
        >
          {submitted ? (
            'Sent. Thanks!'
          ) : formik.isSubmitting ? (
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
