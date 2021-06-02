import React from 'react'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

export const data = [
  {
    body: 'Pellentesque senectus **aliquet diam dui vitae proin eleifend**, facilisi primis odio habitant sociosqu id fames ultrices, suscipit posuere rhoncus elementum habitasse purus. Massa lobortis curae dictumst ultrices lorem commodo orci cubilia vestibulum natoque, ante viverra imperdiet sapien ridiculus augue ad cras velit, magna ultricies eu at enim suspendisse pharetra rhoncus mattis.',
    author: {name: 'Joe Doe', image: '/dan-abramov.jpg'},
  },
  {
    body: 'Eget ipsum mollis ornare _pellentesque pulvinar_ ad sodales mauris taciti consequat, platea parturient habitant tellus sollicitudin etiam magnis montes imperdiet. Laoreet sodales ipsum fringilla maecenas scelerisque ad magnis feugiat nisl, cursus montes inceptos massa egestas tempus aptent netus condimentum arcu, praesent parturient posuere semper litora donec sollicitudin leo.',
    author: {name: 'Joe Doe', image: '/dan-abramov.jpg'},
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
