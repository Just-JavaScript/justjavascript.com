import React from 'react'
import fs from 'fs'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import mdxComponents from 'components/mdx'
import matter from 'gray-matter'
import { QUIZ_PATH } from 'utils/mdxUtils'
import path from 'path'
import isArray from 'lodash/isArray'
import useLoginRequired from 'hooks/use-login-required'
import { useViewer } from 'context/viewer-context'
import { serverSideAuthCheck } from 'utils/serverSideAuthCheck'

const components = mdxComponents

const QuizPage = ({ source, meta, ...props }) => {
  const isVerifyingLogin = useLoginRequired()
  const { isUnclaimedBulkPurchaser, loading } = useViewer()

  if (isVerifyingLogin || isUnclaimedBulkPurchaser || loading) {
    return null
  }

  return <MDXRemote {...source} components={components} />
}

export const getServerSideProps = async ({ params, req }) => {
  const possibleAuthRedirect = serverSideAuthCheck({ req })

  if (possibleAuthRedirect) {
    return possibleAuthRedirect
  }

  if (!params?.slug || isArray(params?.slug)) {
    return {
      notFound: true,
    }
  }

  const postFilePath = path.join(QUIZ_PATH, `${params.slug}.mdx`)

  if (!fs.existsSync(postFilePath)) {
    return {
      notFound: true,
    }
  }

  const source = fs.readFileSync(postFilePath)
  const { content, data } = matter(source)
  const mdxSource = await serialize(content, {
    components,
    mdxOptions: {},
    scope: data,
  })

  return {
    props: {
      source: mdxSource,
    },
  }
}

export default QuizPage
