import React from 'react'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

export const data = [
  {
    body: `I think if you are the type of person that likes If Hemingway Wrote Javascript, you will love this. It’s beautiful, thoughtful, funny, and different. It definitely clarified some things for me 😊 (like that there’s only one \`true\` and one \`false\` value and then there’s just a bazillion of wires that can point to those… 🤯)`,
    author: {name: 'Eva Martina', image: '/testimonials/eva-martina.jpg'},
  },
  {
    body: `I've been writing Javascript for many, many years... it is hard to find new approaches to understanding concepts that are already right at my fingertips, but the content that Dan and Maggie created feels like a fresh breath of air. The idea of setting up new mental models to write excellent Javascript is refreshing and helpful to increase my knowledge and skills even further.`,
    author: {
      name: 'Matías Hernández',
      image: '/testimonials/matias-hernandez.jpg',
    },
  },
  {
    body: `Binged on justjavascript.com. A big thanks to Dan and Maggie for taking this amazing metaphorical universe of Javascript. This is such an amazing take on every fundamental JS concept. 🙌`,
    author: {name: 'Rajat Jain', image: '/testimonials/rajat-jain.jpg'},
  },
]

const Testimonials = () => {
  return (
    <section className="max-w-screen-xl py-8 mx-auto sm:py-24">
      {/* <h2 className="max-w-screen-md pb-20 mx-auto font-serif text-3xl font-extrabold text-center lg:text-5xl sm:text-4xl leading-tighter">
        What others are saying
      </h2> */}
      <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:gap-16 sm:gap-8">
        {data.map((t) => {
          const {
            body,
            author: {name, image},
          } = t
          return (
            <div key={body} className="flex flex-col sm:flex-row sm:space-x-5">
              <div className="font-serif text-6xl font-medium leading-none transform translate-y-4 opacity-20 sm:text-7xl sm:translate-y-0">
                {'”'}
              </div>
              <div>
                <ReactMarkdown className="prose sm:prose-lg">
                  {body}
                </ReactMarkdown>
                <div className="flex items-center pt-4 space-x-2">
                  <Image
                    className="rounded-full"
                    src={image}
                    alt={name}
                    width={48}
                    height={48}
                  />
                  <span className="sm:text-lg">{name}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Testimonials
