import React from 'react'
import fs from 'fs'
import {serialize} from 'next-mdx-remote/serialize'
import {MDXRemote} from 'next-mdx-remote'
import mdxComponents from 'components/mdx'
import matter from 'gray-matter'
import {CONTENT_PATH} from 'utils/mdxUtils'
import path from 'path'
import isArray from 'lodash/isArray'
import get from 'lodash/get'
import useLoginRequired from 'hooks/use-login-required'
import {useViewer} from 'context/viewer-context'
import {ACCESS_TOKEN_KEY} from 'utils/auth'

const components = mdxComponents

const EpisodePage = ({source, meta, ...props}) => {
  const isVerifyingLogin = useLoginRequired()
  const {isUnclaimedBulkPurchaser, loading} = useViewer()

  if (isVerifyingLogin || isUnclaimedBulkPurchaser || loading) {
    return null
  }

  return <MDXRemote {...source} components={components} />
}

export const getServerSideProps = async ({params, req}) => {
  const {cookies} = req
  const token = get(cookies, ACCESS_TOKEN_KEY)

  // if (!token) {
  //   return {
  //     redirect: {
  //       destination: '/login',
  //       permanent: false,
  //     },
  //   }
  // }

  // MDX text - can be from a local file, database, anywhere
  if (!params?.slug || isArray(params?.slug)) {
    return {
      notFound: true,
    }
  }

  const postFilePath = path.join(CONTENT_PATH, `${params.slug}.mdx`)

  if (!fs.existsSync(postFilePath)) {
    return {
      notFound: true,
    }
  }

  const source = fs.readFileSync(postFilePath)
  const {content, data} = matter(source)
  //   const {meta} = source
  const mdxSource = await serialize(content, {
    components,
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      //   remarkPlugins: [require('remark-slug')],
      //   rehypePlugins: [require('rehype-slug')],
    },
    scope: data,
  })

  return {
    props: {
      source: mdxSource,
    },
  }
}

export default EpisodePage
