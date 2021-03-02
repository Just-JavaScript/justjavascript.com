import React from 'react'
import Layout from '../components/layout'
import Link from 'next/link'

export default function Content() {
  const LinkItem = ({href, number, children}) => (
    <Link href={href}>
      <a
        className={
          'group relative flex items-center justify-center sm:text-5xl text-2xl font-extrabold py-12 w-full bg-white font-serif transition-all ease-in-out duration-200'
        }
      >
        <span className="text-5xl absolute mr-4 font-serif text-gray-100 font-extrabold z-10 group-hover:text-gray-200 transition-colors ease-in-out duration-300">
          {number}
        </span>
        <span className="relative z-10 transform group-hover:scale-105 transition-all ease-in-out duration-300 leading-none">
          {children}
        </span>
      </a>
    </Link>
  )

  return (
    <Layout title="Chapters" className="mx-auto pb-40">
      <div className="text-center flex flex-col">
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
