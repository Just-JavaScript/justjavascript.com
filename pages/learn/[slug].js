import React from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import mdxComponents from 'components/mdx'
import { CONTENT_PATH, contentFilePaths } from 'utils/mdxUtils'

export default function EpisodePage({ source }) {
  return <MDXRemote {...source} components={mdxComponents} />
}

export async function getStaticPaths() {
  return {
    paths: contentFilePaths.map((file) => ({
      params: { slug: file.replace(/\.mdx?$/, '') },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const source = fs.readFileSync(path.join(CONTENT_PATH, `${params.slug}.mdx`))
  const { content, data } = matter(source)
  return {
    props: {
      source: await serialize(content, { scope: data }),
    },
  }
}
