import React from 'react'
import Layout from 'components/layout'
import Image from 'next/image'
import BlackHole from '../public/black-hole@2x.png'

const CreditsPage = () => {
  return (
    <Layout
      background="bg-white"
      meta={{
        ogImage: { url: 'https://justjavascript.com/team/og-image@2x.png' },
      }}
    >
      <div className="max-w-screen-lg w-full mx-auto sm:py-24 py-20">
        <div className="max-w-sm w-full mx-auto sm:px-0 px-5">
          <Image src={BlackHole} placeholder="blur" alt="" priority={true} />
        </div>
        <h1 className="font-serif max-w-lg mx-auto font-extrabold text-center lg:text-6xl sm:text-5xl text-4xl leading-[100%]">
          Humans behind Just JavaScript
        </h1>
        <h2 className="max-w-screen-sm mx-auto w-full sm:text-xl text-lg pt-8 text-center">
          Just JavaScript will help you develop a rock-solid understanding of
          how JavaScript works through intuitive visual explanations and
          learning challenges.
        </h2>
        <div className="pt-16 max-w-screen-sm sm:text-lg mx-auto w-full">
          <p>
            Bringing Just JavaScript to you is a collaboration between Dan
            Abramov, Maggie Appleton, and the team behind{' '}
            <a
              href="https://egghead.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 underline"
            >
              egghead.io
            </a>
            . Dan and Maggie created the content, while the rest of the team
            provided planning, design, development, and delivery support.
          </p>
          {/* <p className="pt-5">Meet humans behind Just JavaScript.</p> */}
        </div>
        <main>
          <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-0 gap-8 max-w-screen-sm mx-auto w-full py-10">
            {creators.map((creator) => {
              const { name, byline, image, twitter: twitterHandle } = creator
              return (
                <article
                  key={name}
                  className="flex flex-col items-center justify-center text-center"
                >
                  <a
                    href={`https://twitter.com/${twitterHandle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:shadow-xl transition-shadow ease-in-out duration-200 inline-flex rounded-lg items-center justify-center"
                  >
                    <Image
                      src={image}
                      alt={name}
                      width={200}
                      height={200}
                      quality={100}
                      priority={true}
                      className="rounded-lg"
                    />
                  </a>
                  <h3 className="pt-2 font-serif text-2xl font-bold">{name}</h3>
                  <h4 className="font-mono uppercase text-sm font-semibold text-orange-500">
                    {byline}
                  </h4>
                  <a
                    href={`https://twitter.com/${twitterHandle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center mt-3 px-2 py-1 rounded-lg border border-gray-100 hover:shadow-lg transition-all duration-200 ease-in-out text-sm"
                  >
                    <span className="pr-2">Twitter</span>{' '}
                    <i className="gg-arrow-top-right scale-75 text-gray-700" />
                  </a>
                </article>
              )
            })}
          </div>
          <p className="sm:text-lg max-w-screen-sm mx-auto w-full">
            Dan and Maggie collaborated to design and create the Just JavaScript
            material. Dan developed the mental models featured over many years.
            He and Maggie worked together to explore how to explain these models
            through visual metaphors and illustrations to create an in-depth,
            effective, and delightful learning experience. Dan wrote the
            chapters and quizzes and Maggie created the visual explanations and
            illustrations.{' '}
          </p>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-10 gap-y-16 items-start max-w-screen-sm mx-auto w-full py-16">
            {credits.map((person) => {
              const {
                name,
                byline,
                image,
                twitter: twitterHandle,
                description,
              } = person
              return (
                <article
                  key={name}
                  className="flex flex-col items-center justify-center text-center"
                >
                  <header>
                    <a
                      href={`https://twitter.com/${twitterHandle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:shadow-xl transition-shadow ease-in-out duration-200 inline-flex rounded-lg items-center justify-center"
                    >
                      <Image
                        src={image}
                        alt={name}
                        width={140}
                        height={140}
                        quality={100}
                        className="rounded-lg"
                      />
                    </a>
                    <h3 className="pt-2 font-serif text-2xl font-bold">
                      {name}
                    </h3>
                    <h4 className="font-mono uppercase text-sm font-semibold text-orange-500">
                      {byline}
                    </h4>
                  </header>
                  <p className="pt-2 text-gray-800">{description}</p>
                  <footer>
                    <a
                      href={`https://twitter.com/${twitterHandle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center mt-3 px-2 py-1 rounded-lg border border-gray-100 hover:shadow-lg transition-all duration-200 ease-in-out text-sm"
                    >
                      <span className="pr-2">Twitter</span>{' '}
                      <i className="gg-arrow-top-right scale-75 text-gray-700" />
                    </a>
                  </footer>
                </article>
              )
            })}
          </div>
        </main>
      </div>
    </Layout>
  )
}

const creators = [
  {
    name: 'Dan Abramov',
    byline: 'Co-Creator',
    twitter: 'dan_abramov',
    image: '/dan-abramov.jpg',
  },
  {
    name: 'Maggie Appleton',
    byline: 'Co-Creator',
    twitter: 'mappletons',
    image: '/maggie-appleton.jpg',
  },
]

const credits = [
  {
    name: 'Joel Hooks',
    byline: 'Executive Producer',
    twitter: 'jhooks',
    image: '/team/joel-hooks.jpg',
    description:
      'Joel directed and guided the development and production of Just JavaScript, collaborating closely with Dan and Maggie and the rest of the team throughout the process. He also served as the technical lead.',
  },
  {
    name: 'Vojta Holik',
    byline: 'Product Design & Development',
    twitter: 'vjthlk',
    image: '/team/vojta-holik.jpg',
    description:
      'Vojta did UI/UX design & development for Just JavaScript and provided support with quiz functionality.',
  },
  {
    name: 'Ian Jones',
    byline: 'Development',
    twitter: '_jonesian',
    image: '/team/ian-jones.jpg',
    description:
      'Ian did back-end development and infrastructure work, including the eCommerce components, authorization routes,  and quiz functionality.',
  },
  {
    name: 'Lauro Silva',
    byline: 'Learner review coordination',
    twitter: 'laurosilvacom',
    image: '/team/lauro-silva.jpg',
    description:
      'Lauro coordinated inviting learners to test content, gathered and documented the feedback to identify any UX and quality control issues for the team to address before the launch.',
  },
  {
    name: 'Taylor Bell',
    byline: 'Writing, editing, planning support',
    twitter: 'taylorbell',
    image: '/team/taylor-bell.jpg',
    description:
      'Taylor provided writing and editing support for Just JavaScript as well as planning support for the launch.',
  },
  {
    name: 'Lucas Minter',
    byline: 'Data support',
    twitter: 'lucasminter2',
    image: '/team/lucas-minter.jpg',
    description:
      'Lucas helped with quiz data migration and creating alt text for the quizzes.',
  },
  {
    name: 'Daniel Miller',
    byline: 'Product / Project Management',
    twitter: 'danielindustri4',
    image: '/team/daniel-miller.jpg',
    description: `Daniel managed and facilitated the team's production, planning, development and delivery efforts as well as launch logistics.`,
  },
  {
    name: 'Nicoll Guarnizo',
    byline: 'Pre-launch testing',
    twitter: 'GuarnizoNicoll',
    image: '/team/nicoll-guarnizo.jpg',
    description: `Nicoll did the end-to-end quality control testing for Just Javascript to check for any final fixes needed ahead of the launch.`,
  },
]

export default CreditsPage
