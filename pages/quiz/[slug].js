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
import get from "lodash/get";
import {ACCESS_TOKEN_KEY} from "utils/auth";
import {purchaseVerifier} from "utils/egghead-purchase-verifier";


const components = mdxComponents

const QuizPage = ({ source, meta, ...props }) => {
  return <MDXRemote {...source} components={components} />
}

export const getServerSideProps = async ({ params, req }) => {

  // check if token exists
  const possibleAuthRedirect = await serverSideAuthCheck({ req })

  if (possibleAuthRedirect) {
    return possibleAuthRedirect
  }

  // check if they need to claim a seat
  const authToken = get(req.cookies, ACCESS_TOKEN_KEY)
  const {isUnclaimedBulkPurchaser, canViewContent} = purchaseVerifier(authToken)

  if(isUnclaimedBulkPurchaser) {
    return {
      redirect: {
        destination: '/invoice',
        permanent: false,
      },
    }
  }

  if(!canViewContent) {
    return {
      redirect: {
        destination: '/buy',
        permanent: false,
      },
    }
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
