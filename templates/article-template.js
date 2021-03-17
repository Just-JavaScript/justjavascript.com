import React from 'react'
import ToC from '../components/toc'
import Layout from '../components/layout'
import Pagination from '../components/mdx/pagination'
import useLoginRequired from 'hooks/useLoginRequired'

const Article = ({
  children,
  title,
  series,
  episode,
  next,
  prev,
  nextTitle,
  ...props
}) => {
  const isVerifying = useLoginRequired()
  if (isVerifying) {
    return null
  }

  return (
    <Layout navContent={<ToC />} title={title} episode={episode} {...props}>
      <div className="prose lg:prose-xl prose-lg max-w-none">
        {children}
      </div>
      <Pagination next={next} prev={prev}>
        {nextTitle}
      </Pagination>
    </Layout>
  )
}

export default Article
