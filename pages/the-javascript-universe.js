import React from 'react'
import DevBundles from 'data/bundles.development.json'
import ProdBundles from 'data/bundles.production.json'
import fs from 'fs'
import path from 'path'
import get from 'lodash/get'
import matter from 'gray-matter'
import mdxComponents from 'components/mdx'
import checkSubscriber from 'utils/check-subscriber'
import ArticlePreview from '../templates/article-preview-template'
import { MDXRemote } from 'next-mdx-remote'
import { ACCESS_TOKEN_KEY } from 'utils/auth'
import { PREVIEWS_PATH } from 'utils/mdxUtils'
import { serialize } from 'next-mdx-remote/serialize'
import { purchaseVerifier } from 'utils/egghead-purchase-verifier'

const CK_TAG_ID = 2616411 // (JJS: Free Chapter Magnet)
const ARTICLE_PREVIEW = '02-the-javascript-universe-preview.mdx'
const ARTICLE_FULL = '02-the-javascript-universe.mdx'

const components = mdxComponents

const TheJavaScriptUniversePreview = ({ source, authorized, bundles }) => {
  return (
    <ArticlePreview
      bundles={bundles}
      CK_TAG_ID={CK_TAG_ID}
      authorized={authorized}
      title="The JavaScript Universe"
      ogImage="https://res.cloudinary.com/dg3gyk0gu/image/upload/v1631611670/just-javascript-email-images/assets/the-javascript-universe_2x.jpg"
      series={1}
      episode={2}
    >
      <MDXRemote {...source} components={components} />
      <p className="border-t border-gray-100 pt-16 mt-24 inline-block">
        These might seem like small steps, but we’re laying the foundation for
        everything else to come. We’re building our JavaScript universe,
        together. There are 9 more chapters with exercises for you to practice.
      </p>
    </ArticlePreview>
  )
}

export const getServerSideProps = async (context) => {
  const bundles =
    process.env.NODE_ENV === 'production' ? ProdBundles : DevBundles
  const initialPostFilePath = path.join(PREVIEWS_PATH, ARTICLE_PREVIEW)
  const postFilePath = path.join(PREVIEWS_PATH, ARTICLE_FULL)

  const authToken = get(context.req.cookies, ACCESS_TOKEN_KEY)
  const convertkitId = get(
    context.req.cookies,
    process.env.NEXT_PUBLIC_CONVERTKIT_SUBSCRIBER_KEY
  )
  const viewer = authToken && (await purchaseVerifier(authToken))

  const authorized = viewer
    ? viewer.canViewContent
    : await checkSubscriber(context, CK_TAG_ID) // !isEmpty(convertkitId)

  const source = fs.readFileSync(
    authorized ? postFilePath : initialPostFilePath
  )
  const { content, data } = matter(source)
  const mdxSource = await serialize(content, {
    components,
    scope: data,
  })

  return {
    props: {
      source: mdxSource,
      authorized,
      bundles,
    },
  }
}

export default TheJavaScriptUniversePreview
