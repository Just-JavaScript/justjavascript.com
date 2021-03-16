import React from 'react'
import Layout from '../components/layout'
import Link from 'next/link'

export default function Content() {
  const LinkItem = ({href, number, children}) => (
    <Link href={href}>
      <a
        className={
          'rounded-lg group hover:shadow-xl sm:px-16 px-8 sm:py-32 py-24 relative flex flex-col items-center justify-center  font-extrabold w-full bg-white font-serif transition-all ease-in-out duration-200'
        }
      >
        <span className="sm:text-8xl text-6xl font-serif text-gray-200 font-extrabold z-10 group-hover:text-orange-500 transition-colors ease-in-out duration-150">
          {number}
        </span>
        <div className="sm:text-4xl text-2xl relative z-10 transform group-hover:scale-105 transition-all ease-in-out duration-200 leading-none">
          {children}
        </div>
        {number === '01' && (
          <div className="text-sm uppercase font-sans font-bold pt-2 tracking-wide text-orange-500">
            {'Start Here'}
          </div>
        )}
      </a>
    </Link>
  )

  return (
    <Layout className="mx-auto pb-40" maxWidth="" background="bg-gray-50">
      {/* <h1 className="lg:text-8xl sm:text-7xl text-5xl font-extrabold tracking-tight text-center font-serif leading-tighter pb-24">
        Explore JavaScript Universe
      </h1> */}
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 text-center max-w-screen-lg mx-auto">
        <LinkItem href={'01-mental-models'} number={'01'}>
          Mental Models
        </LinkItem>
        <LinkItem href={'02-the-javascript-universe'} number={'02'}>
          The JavaScript Universe
        </LinkItem>
        <LinkItem href={'03-values-and-variables'} number={'03'}>
          Values and Variables
        </LinkItem>
        <LinkItem href={'04-studying-from-the-inside'} number={'04'}>
          Studying from the Inside
        </LinkItem>
        <LinkItem href={'05-meeting-the-primitive-values'} number={'05'}>
          Meeting the Primitive Values
        </LinkItem>
        <LinkItem href={'06-meeting-objects-and-functions'} number={'06'}>
          Meeting Objects and Functions
        </LinkItem>
        <LinkItem href={'07-equality-of-values'} number={'07'}>
          Equality Of Values
        </LinkItem>
        <LinkItem href={'08-properties'} number={'08'}>
          Properties
        </LinkItem>
        <LinkItem href={'09-mutation'} number={'09'}>
          Mutation
        </LinkItem>
        <LinkItem href={'10-prototypes'} number={'10'}>
          Prototypes
        </LinkItem>
      </div>
    </Layout>
  )
}
