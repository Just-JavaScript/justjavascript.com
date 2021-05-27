import fs from 'fs'
import path from 'path'

export const CONTENT_PATH = path.join(process.cwd(), 'content')

export const contentFilePaths = fs
  .readdirSync(CONTENT_PATH)
  .filter((path) => /\.mdx?$/.test(path))
