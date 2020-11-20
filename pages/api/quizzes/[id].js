import quizzes from 'data/quizzes'
import {find} from 'lodash'

export default function handler(req, res) {
  const {
    query: {id},
  } = req

  const quiz = find(quizzes, {id: id})

  res.end(JSON.stringify(quiz))
}
