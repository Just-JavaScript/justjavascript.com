import React from 'react'
import Code from './code'
import HiddenAnswer from './hidden-answer'
import FunFact from './fun-fact'
import Pagination from './pagination'
import GifPlayer from './gif-player'
import Article from '../../templates/article-template'
import Sketch from './sketch'
import Layout from '../layout'
import Subscribe from '../subscribe'
import Video from './video'
import Link from 'next/link'

export default {
  img: ({src}) => <GifPlayer src={src} />,
  pre: ({children}) => <>{children}</>,
  a: (props) => (
    <Link {...props}>
      <a>{props.children}</a>
    </Link>
  ),
  code: Code,
  Video,
  HiddenAnswer,
  Pagination,
  GifPlayer,
  Subscribe,
  Article,
  Layout,
  FunFact,
  Sketch,
}
