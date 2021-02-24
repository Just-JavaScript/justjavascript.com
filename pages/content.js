import React from 'react'
import Layout from '../components/layout'
import Link from 'next/link'

export default function Content() {
  const LinkItem = ({href, number, children}) => (
    <Link href={href}>
      <a
        className={
          'text-xl p-8 border border-gray-100 rounded-lg w-full bg-white shadow-sm font-serif font-semibold hover:bg-cool-gray-50 hover:border-gray-200 transition-colors ease-in-out duration-200'
        }
      >
        <span
          className="mr-4 font-sans text-indigo-600 font-light"
          style={{fontFamily: 'sans'}}
        >
          {number}
        </span>

        {children}
      </a>
    </Link>
  )

  return (
    <Layout
      title="Content"
      className="max-w-screen-md mx-auto pb-40 sm:px-8 px-5"
    >
      <div className="grid grid-cols-1 gap-4 ">
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
