import {get} from 'lodash'
import {
  MultipleChoice,
  Essay,
  Theater,
  Sketch,
  MultipleImageChoice,
  TrueFalse,
  Questions,
  Statement,
} from 'components/quiz'

export default function QuestionToShow({question, ...props}) {
  let QuestionToShow
  switch (get(question, 'type')) {
    case 'multiple-choice':
      QuestionToShow = MultipleChoice
      break
    case 'multiple-image-choice':
      QuestionToShow = MultipleImageChoice
      break
    case 'essay':
      QuestionToShow = Essay
      break
    case 'theater':
      QuestionToShow = Theater
      break
    case 'sketch':
      QuestionToShow = Sketch
      break
    case 'true-false':
      QuestionToShow = TrueFalse
      break
    case 'multiple-questions':
      QuestionToShow = Questions
      break
    default:
      QuestionToShow = Statement
  }
  return <QuestionToShow question={question} {...props} />
}
