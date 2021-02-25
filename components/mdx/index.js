import React from 'react'
import Code from './code'
import Answer from './answer'
import FunFact from './fun-fact'
import Pagination from './pagination'
import GifPlayer from './gif-player'
import Article from '../../templates/article-template'
import Sketch from './sketch'
import Layout from '../layout'
import Subscribe from '../subscribe'

export default {
  pre: ({children}) => <>{children}</>,
  code: Code,
  img: ({src}) => <GifPlayer src={src} />,
  Answer,
  Pagination,
  GifPlayer,
  Subscribe,
  Article,
  Layout,
  FunFact,
  Sketch,
}
