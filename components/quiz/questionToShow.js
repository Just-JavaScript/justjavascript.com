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
  switch (get(question, '__typename')) {
    case 'MultipleChoiceQuestion':
      QuestionToShow = MultipleChoice
      break
    case 'multiple-image-choice':
      QuestionToShow = MultipleImageChoice
      break
    case 'EssayQuestion':
      QuestionToShow = Essay
      break
    case 'SketchQuestion':
      QuestionToShow = Sketch
      break
    case 'QuestionSet':
      QuestionToShow = Questions
      break
    case 'theater':
      QuestionToShow = Theater
      break
    case 'true-false':
      QuestionToShow = TrueFalse
      break
    default:
      QuestionToShow = Statement
  }
  return <QuestionToShow question={question} {...props} />
}
