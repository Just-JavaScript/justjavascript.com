import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Layout from 'components/layout'
import LandingCopy from 'components/landing-copy.mdx'
import Creators from 'components/creators'
import TechnicalDetails from 'components/technical-details'
import PlanetImage from '../public/planet@2x.png'

export default function LandingPage() {
  return (
    <Layout maxWidth="" background="bg-white" navClassName="text-white">
      <header className="relative flex items-center justify-center -mx-5 bg-black text-white px-5 pt-40 pb-24 sm:pb-40">
        <div className="relative z-10 text-center max-w-screen-lg mx-auto">
          <h1 className="font-serif text-4xl font-extrabold md:text-6xl sm:text-5xl leading-tighter">
            Explore the JavaScript Universe
          </h1>
          <h2 className="font-light sm:text-xl text-lg text-orange-200 font-serif pt-4">
            Rebuild your mental model from the inside&nbsp;out.
          </h2>
          <p className="pt-6">All ten episodes and quizzes are free. No account needed.</p>
          <Link href="/learn">
            <a className="mt-8 px-6 py-3 font-semibold rounded-full bg-white text-black inline-flex">
              Start Learning
            </a>
          </Link>
        </div>
        <div className="pointer-events-none opacity-40">
          <Image src={PlanetImage} layout="fill" objectFit="cover" alt="" priority />
        </div>
      </header>
      <article className="max-w-screen-sm mx-auto prose sm:prose-lg py-16">
        <LandingCopy />
      </article>
      <section className="py-8"><Creators /></section>
      <section className="py-8"><TechnicalDetails /></section>
      <div className="text-center py-16">
        <Link href="/learn"><a className="underline">Read the episodes</a></Link>
      </div>
    </Layout>
  )
}
