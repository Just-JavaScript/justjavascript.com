import React from 'react'
import Code from './code'
import HiddenAnswer from './hidden-answer'
import FunFact from './fun-fact'
import Pagination from './pagination'
import GifPlayer from './gif-player'
import Article from '../../templates/article-template'
import ArticlePreview from '../../templates/article-preview-template'
import Sketch from './sketch'
import Layout from '../layout'
import Subscribe from '../subscribe'
import Video from './video'
import Link from 'next/link'
import Quiz from './quiz'
import Prompt from './quiz/prompt'
import Question from './quiz/question'
import Answer from './quiz/answer'
import Choice from './quiz/choice'

export default {
  img: ({ src }) => <GifPlayer src={src} />,
  pre: ({ children }) => <>{children}</>,
  a: (props) => (
    <Link {...props}>
      {props.children}
    </Link>
  ),
  code: Code,
  Video,
  HiddenAnswer,
  Pagination,
  GifPlayer,
  Subscribe,
  Article,
  ArticlePreview,
  Layout,
  FunFact,
  Sketch,
  Quiz,
  Prompt,
  Question,
  Answer,
  Choice,
}
