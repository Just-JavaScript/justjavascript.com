import * as yup from 'yup'
import {useFormik} from 'formik'

export default function useEggheadQuestionMachine(question, handleSubmit) {
  const {type} = question ? question : ''

  function schemaFor(type) {
    switch (type) {
      case 'multiple-choice':
        return yup.object().shape({
          value: yup.string().required('Pick one.').nullable(),
        })

      case 'multiple-image-choice':
        return yup.object().shape({
          value: yup.string().required('Pick one.').nullable(),
        })

      case 'essay':
        return yup
          .object()
          .shape({
            value:
              question.required === false
                ? yup.string()
                : yup
                    .string()
                    .required('Answer cant stay empty')
                    .min(3, 'Answer must be at least 3 characters'),
          })
          .nullable()

      case 'theater':
        return yup.object().shape({
          value: yup.mixed().oneOf(['0', '1', '2']).required('Pick one.'),
        })

      case 'sketch':
        return yup.object().shape({
          value: yup.array().required('Sketch something.'),
        })

      default:
        return null
    }
  }

  const formik = useFormik({
    // enableReinitialize: true,
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
