import React from 'react'
import ToC from '../components/toc'
import Layout from '../components/layout'
import Pagination from '../components/mdx/pagination'
import useLoginRequired from 'hooks/useLoginRequired'
import useRedirectToLearn from 'hooks/useRedirectToLearn'
import {useViewer} from 'context/viewer-context'

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
  const isVerifyingLogin = useLoginRequired()
  const {isUnclaimedBulkPurchaser, loading} = useViewer()
  useRedirectToLearn(isUnclaimedBulkPurchaser)

  if (isVerifyingLogin || isUnclaimedBulkPurchaser || loading) {
    return null
  }

  return (
    <Layout navContent={<ToC />} title={title} episode={episode} {...props}>
      <div className="prose lg:prose-xl prose-lg max-w-none">{children}</div>
      <Pagination next={next} prev={prev}>
        {nextTitle}
      </Pagination>
    </Layout>
  )
}

export default Article
