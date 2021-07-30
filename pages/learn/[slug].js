import React from 'react'
import fs from 'fs'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import mdxComponents from 'components/mdx'
import matter from 'gray-matter'
import { CONTENT_PATH } from 'utils/mdxUtils'
import path from 'path'
import isArray from 'lodash/isArray'
import { checkAuth } from 'utils/check-auth'

const components = mdxComponents

const EpisodePage = ({ source, meta, ...props }) => {
  return <MDXRemote {...source} components={components} />
}

export const getServerSideProps = async ({ params, req }) => {
  const redirect = await checkAuth(req)

  if (redirect) {
    return redirect
  }

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
  const { content, data } = matter(source)
  const mdxSource = await serialize(content, {
    components,
    scope: data,
  })

  return {
    props: {
      source: mdxSource,
    },
  }
}

export default EpisodePage
