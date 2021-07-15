import React from 'react'
import Layout from 'components/layout'
import SubscribeCopy from 'components/subscribe-copy.mdx'
import LandingCopy from 'components/landing-copy.mdx'
import Image from 'next/image'
import ClaimCoupon from 'components/commerce/claim-coupon'
import useSellingLive from 'hooks/use-selling-live'
import DevBundles from 'data/bundles.development.json'
import ProdBundles from 'data/bundles.production.json'
import Commerce from 'components/commerce'
import Testimonials from 'components/testimonials'
import { useRouter } from 'next/router'
import { scroller } from 'react-scroll'
import Creators from 'components/creators'
import TechnicalDetails from 'components/technical-details'
import bg from 'public/bg@2x.jpg'
import { useViewer } from 'context/viewer-context'
import Link from 'next/link'
import PlanetImage from '../public/planet@2x.png'

const LandingPage = ({ bundles }) => {
  const { purchased, viewer } = useViewer()
  const router = useRouter()
  const sellingLive = useSellingLive()
  const scrollToBuy = router.asPath === '/?buy'
  React.useEffect(() => {
    scrollToBuy === true &&
      scroller.scrollTo('buy', {
        offset: -30,
      })
  }, [scrollToBuy])

  return (
    <Layout maxWidth="" background="bg-white" navClassName="text-white">
      <ClaimCoupon />
      <header className="relative flex items-center justify-center -mx-5">
        <div className="w-full min-h-[calc(65vh+55px)] sm:pt-40 pt-40 sm:pb-40 pb-24 bg-black text-white flex sm:flex-row flex-col-reverse items-center justify-center px-5">
          <div className="text-center w-full max-w-screen-lg mx-auto">
            <div className="relative z-10">
              <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-100 relative z-10 max-w-xl mx-auto font-serif text-4xl font-extrabold md:text-6xl sm:text-5xl leading-tighter">
                <span>Explore the</span> JavaScript Universe
              </h1>
              <h2 className="font-light sm:text-xl text-lg text-orange-200 font-serif pt-4 leading-tight">
                Rebuild your mental model from the inside out.
              </h2>
              <div className="mt-8 relative inline-flex justify-center items-center">
                {viewer && purchased ? (
                  <Link href="/learn">
                    <a className="focus:scale-95 relative z-10 px-6 py-3 font-semibold rounded-full bg-white text-black hover:scale-105 inline-flex ease-in-out duration-250 transition-all">
                      Access Content
                    </a>
                  </Link>
                ) : (
                  <div className="h-[42px]"></div>
                )}
                <div
                  className="blur-lg bg-orange-400 opacity-40 w-full h-full top-3 absolute  rounded-full"
                  aria-hidden="true"
                />
              </div>
            </div>
            <div className="pointer-events-none">
              <Image
                className="object-contain lg:opacity-100 opacity-80"
                objectPosition="90%"
                src={PlanetImage}
                layout="fill"
                quality={100}
                loading="eager"
                priority={true}
                alt=""
              />
            </div>
          </div>
        </div>
        <svg
          aria-hidden="true"
          className="text-white absolute bottom-0 left-0 w-full z-20"
          viewBox="0 0 779 55"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M778.746 55H0.583008C76.8933 22.1802 222.538 0.000244141 389.665 0.000244141C556.791 0.000244141 702.436 22.1802 778.746 55Z"
            fill="currentColor"
          />
        </svg>
      </header>
      <div className="-mx-5 -mb-3">
        {sellingLive ? (
          <div className="relative flex items-start justify-center h-full">
            <div className="z-20 xl:-mt-16 bg-white md:p-16 p-5 sm:shadow-container mx-auto flex items-center jusfify-start">
              <article className="w-full max-w-screen-sm sm:pt-0 pt-8 pb-8 mx-auto prose sm:pb-16 lg:prose-lg sm:prose-lg">
                <LandingCopy />
              </article>
            </div>
            <div className="h-[37%] absolute w-full left-0 bottom-0">
              <Image
                aria-hidden="true"
                quality={100}
                layout="fill"
                src={bg}
                alt=""
                objectFit="cover"
                objectPosition="top"
                loading="eager"
                className="opacity-50"
              />
            </div>
          </div>
        ) : (
          <article className="w-full max-w-screen-sm sm:pt-0 pt-8 pb-8 mx-auto prose sm:pb-16 lg:prose-lg sm:prose-lg px-5">
            <SubscribeCopy />
          </article>
        )}
      </div>
      {sellingLive && (
        <>
          <section className="py-8 relative z-20">
            <Creators />
          </section>
          <section className="py-8">
            <TechnicalDetails />
          </section>
          <section className="py-8">
            <Commerce bundles={bundles} />
          </section>
          <Testimonials />
        </>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  const bundles =
    process.env.NODE_ENV === 'production' ? ProdBundles : DevBundles
  return {
    props: { bundles },
  }
}

export default LandingPage
