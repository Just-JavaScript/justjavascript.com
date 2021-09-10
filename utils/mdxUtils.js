import fs from 'fs'
import path from 'path'

export const CONTENT_PATH = path.join(process.cwd(), 'content')
export const QUIZ_PATH = path.join(process.cwd(), 'content/quiz')
export const PREVIEWS_PATH = path.join(process.cwd(), 'content/previews')

export const contentFilePaths = fs
  .readdirSync(CONTENT_PATH)
  .filter((path) => /\.mdx?$/.test(path))

export const quizFilePaths = fs
  .readdirSync(QUIZ_PATH)
  .filter((path) => /\.mdx?$/.test(path))
