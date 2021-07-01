import * as yup from 'yup'
import { useFormik } from 'formik'
import { getUserAnswerFromLocalStorage } from 'utils/quiz-answers-in-local-storage'

export default function useEggheadQuestion(question, handleSubmit) {
  const { kind } = question || {}
  const isRequired = question?.required !== false
  const canComment = question?.canComment

  function schemaFor(kind) {
    switch (kind) {
      case 'MultipleChoiceQuestion':
        return yup.object().shape({
          value: isRequired
            ? yup.string().required('Pick one.').nullable()
            : yup.string().nullable(),
          comment: yup.string().min(3, 'Care to elaborate?'),
        })

      case 'multiple-image-choice':
        return yup.object().shape({
          value: isRequired
            ? yup.string().required('Pick one.').nullable()
            : yup.string().nullable(),
          comment: yup.string().min(3, 'Care to elaborate?'),
        })

      case 'EssayQuestion':
        return yup
          .object()
          .shape({
            value: isRequired
              ? yup
                  .string()
                  .required(`Come on, don’t give up yet!`)
                  .min(3, 'Care to elaborate?')
              : yup.string(),
          })
          .nullable()

      case 'theater':
        return yup.object().shape({
          value: isRequired
            ? yup.mixed().oneOf(['0', '1', '2']).required('Pick one.')
            : yup.mixed().oneOf(['0', '1', '2']),
        })

      case 'SketchQuestion':
        return yup.object().shape({
          value: isRequired
            ? yup.array().required('Sketch something.')
            : yup.array(),
          comment: canComment
            ? yup
                .string()
                .required('Write your answer.')
                .min(3, 'Care to elaborate?')
            : yup.string().min(3, 'Care to elaborate?'),
        })

      case 'true-false':
        return yup.object().shape({
          value: isRequired
            ? yup.mixed().oneOf(['true', 'false']).required('Pick one.')
            : yup.mixed().oneOf(['true', 'false']),
        })

      default:
        return null
    }
  }

  const answer = JSON.parse(getUserAnswerFromLocalStorage(question.id))
  const initialValue = answer?.value || answer || ''
  const initialComment = answer ? answer.comment : ''

  const formik = useFormik({
    initialValues: {
      comment: initialComment,
      value: initialValue,
    },
    validationSchema: schemaFor(kind),
    onSubmit: (values, actions) => {
      if (formik.isValid) {
        handleSubmit({ answer: values }, actions, question)
      }
    },
  })

  return { formik }
}
