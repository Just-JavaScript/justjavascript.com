import React from 'react'
import Code from './code'
import Answer from './answer'
import Pagination from './pagination'
import GifPlayer from './gif-player'
import Universe from './Universe'
import Article from '../layouts/article'

export default {
  pre: ({children}) => <>{children}</>,
  code: Code,
  img: ({src}) => <GifPlayer src={src} />,
  Answer,
  Pagination,
  GifPlayer,
  Article,
  Universe,
}
