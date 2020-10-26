export const fetchQuizData = (quizId) => {
  return fetch(`/api/quizzes/${quizId}`).then((res) =>
    res.json().then((data) => {
      return data
    }),
  )
}
