import React from 'react'
import fs from 'fs'
import {serialize} from 'next-mdx-remote/serialize'
import {MDXRemote} from 'next-mdx-remote'
import mdxComponents from 'components/mdx'
import matter from 'gray-matter'
import {contentFilePaths, CONTENT_PATH} from 'utils/mdxUtils'
import path from 'path'
import isArray from 'lodash/isArray'
import useLoginRequired from 'hooks/use-login-required'
import {useViewer} from 'context/viewer-context'

const components = mdxComponents

const EpisodePage = ({source, meta, ...props}) => {
  const isVerifyingLogin = useLoginRequired()
  const {isUnclaimedBulkPurchaser, loading} = useViewer()

  if (isVerifyingLogin || isUnclaimedBulkPurchaser || loading) {
    return null
  }

  return <MDXRemote {...source} components={components} />
}

export const getStaticProps = async ({params}) => {
  // MDX text - can be from a local file, database, anywhere
  if (!params?.slug || isArray(params?.slug)) {
    return {props: {}}
  }
  const postFilePath = path.join(CONTENT_PATH, `${params.slug}.mdx`)
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

export const getStaticPaths = async () => {
  const paths = contentFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => {
      return {params: {slug}}
    })
  return {
    paths,
    fallback: false,
  }
}

export default EpisodePage
