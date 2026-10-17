export default function retiredApi(req, res) {
  res.status(410).json({ error: 'This service is retired. Lessons and quizzes are freely available at /learn.' })
}
