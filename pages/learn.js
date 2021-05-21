import React from 'react'
import Layout from '../components/layout'
import Link from 'next/link'
import useLoginRequired from 'hooks/use-login-required'
import {episodes} from 'components/toc'
import useRedirectUnclaimedBulkToInvoice from 'hooks/use-redirect-to-learn'
import {useViewer} from 'context/viewer-context'
import isEmpty from 'lodash/isEmpty'
import {useProgress} from 'context/progress-context'

export default function Learn() {
  const isVerifyingLogin = useLoginRequired()
  const {progress} = useProgress()

  const {isUnclaimedBulkPurchaser, viewer, loading} = useViewer()
  useRedirectUnclaimedBulkToInvoice(isUnclaimedBulkPurchaser)
  if (
    isVerifyingLogin ||
    isUnclaimedBulkPurchaser ||
    isEmpty(viewer) ||
    loading
  ) {
    return null
  }

  const LinkItem = ({href, number, children}) => (
    <Link href={href}>
      <a
        className={
          'rounded-lg group hover:shadow-xl sm:px-16 px-8 sm:py-32 py-24 relative flex flex-col items-center justify-center  font-extrabold w-full bg-white font-serif transition-all ease-in-out duration-200'
        }
      >
        <span className="z-10 font-serif text-6xl font-extrabold text-gray-200 transition-colors duration-150 ease-in-out sm:text-8xl group-hover:text-orange-500">
          {number}
        </span>
        <div className="relative z-10 text-2xl leading-none transition-all duration-200 ease-in-out transform sm:text-4xl group-hover:scale-105">
          {children}
        </div>
        {number === '01' && (
          <div className="pt-2 font-sans text-sm font-bold tracking-wide text-orange-500 uppercase">
            {'Start Here'}
          </div>
        )}
      </a>
    </Link>
  )

  return (
    <Layout className="pb-40 mx-auto" maxWidth="" background="bg-gray-50">
      {/* <h1 className="pb-24 font-serif text-5xl font-extrabold tracking-tight text-center lg:text-8xl sm:text-7xl leading-tighter">
        Explore JavaScript Universe
      </h1> */}
      <div className="grid max-w-screen-lg grid-cols-1 gap-5 mx-auto text-center sm:grid-cols-2">
        {episodes.map((episode, index) => {
          return (
            <LinkItem
              key={episode.path}
              href={episode.path}
              number={('0' + (index + 1)).slice(-2)}
            >
              {episode.title}
            </LinkItem>
          )
        })}
      </div>
    </Layout>
  )
}
