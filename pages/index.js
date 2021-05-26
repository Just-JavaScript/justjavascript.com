import React from 'react'
import Layout from 'components/layout'
import LandingCopy from 'components/landing-copy.mdx'
import Image from 'next/image'
import useRedirectToLearn from 'hooks/use-redirect-to-learn'
import ClaimCoupon from 'components/commerce/claim-coupon'

const LandingPage = () => {
  useRedirectToLearn()
  return (
    <Layout maxWidth="" background="bg-white" navClassName="text-white">
      <ClaimCoupon />
      <div className="relative flex items-center justify-center -mx-5">
        <header className="w-full min-h-[75vh] bg-black text-white flex sm:flex-row flex-col-reverse items-center justify-between px-5">
          <div className="flex items-center justify-between w-full max-w-screen-lg pb-8 mx-auto sm:pb-0">
            <h1 className="relative z-10 max-w-2xl font-serif text-3xl font-extrabold md:text-6xl sm:text-5xl leading-tighter">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-100">
                JavaScript,
              </span>{' '}
              <span className="font-light">
                like you’ve never seen it before.
              </span>
            </h1>
            <div className="">
              <Image
                objectFit="contain"
                objectPosition="70%"
                src="/planet@2x.png"
                layout="fill"
                quality={100}
                priority={true}
                alt=""
              />
            </div>
          </div>
        </header>
      </div>
      <article className="max-w-screen-md py-8 mx-auto prose sm:py-16 lg:prose-xl sm:prose-lg">
        <LandingCopy />
      </article>
      {/* <footer>footer</footer> */}
    </Layout>
  )
}

export default LandingPage