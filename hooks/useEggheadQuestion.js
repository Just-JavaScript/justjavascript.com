import * as yup from 'yup'
import {useFormik} from 'formik'

export default function useEggheadQuestionMachine(question, handleSubmit) {
  const {type} = question ? question : ''
  const isRequired = question.required !== false

  function schemaFor(type) {
    switch (type) {
      case 'multiple-choice':
        return yup.object().shape({
          value: isRequired
            ? yup.string().required('Pick one.').nullable()
            : yup.string().nullable(),
          comment: yup.string().min(3, 'Must be at least 3 characters'),
        })

      case 'multiple-image-choice':
        return yup.object().shape({
          value: isRequired
            ? yup.string().required('Pick one.').nullable()
            : yup.string().nullable(),
          comment: yup.string().min(3, 'Must be at least 3 characters'),
        })

      case 'essay':
        return yup
          .object()
          .shape({
            value: isRequired
              ? yup
                  .string()
                  .required('Answer cant stay empty')
                  .min(3, 'Answer must be at least 3 characters')
              : yup.string(),
          })
          .nullable()

      case 'theater':
        return yup.object().shape({
          value: isRequired
            ? yup.mixed().oneOf(['0', '1', '2']).required('Pick one.')
            : yup.mixed().oneOf(['0', '1', '2']),
        })

      case 'sketch':
        return yup.object().shape({
          value: isRequired
            ? yup.array().required('Sketch something.')
            : yup.array(),
        })

      case 'trueFalse':
        return yup.object().shape({
          value: isRequired
            ? yup.mixed().oneOf(['true', 'false']).required('Pick one.')
            : yup.mixed().oneOf(['true', 'false']),
        })

      default:
        return null
    }
  }

  const formik = useFormik({
    initialValues: {
      value: question?.value || '',
    },
    validationSchema: schemaFor(type),
    onSubmit: (values, actions) => {
      if (formik.isValid) {
        handleSubmit({answer: values}, actions, question)
      }
    },
  })

  return {formik}
}
