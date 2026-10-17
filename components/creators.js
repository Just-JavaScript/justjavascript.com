import React from 'react'
import Image from 'next/image'

const Creators = () => {
  return (
    <div className="bg-gradient-to-t from-white to-gray-50 -m-5 px-5 sm:py-20 py-8">
      {/* <h3 className="py-8 sm:text-4xl text-3xl font-serif text-center font-bold pt-4 pb-8">
        About the creator
      </h3> */}
      <div className="flex flex-col items-center w-full">
        <div className="drop-shadow-xl">
          <Image
            src="/dan-abramov.jpg"
            width={200}
            height={200}
            quality={100}
            alt="Dan Abramov, the creator of Just JavaScript"
            className="rounded-full saturate-0"
          />
        </div>
        <div className="sm:text-4xl text-3xl pt-2 font-serif font-bold">
          Hi, I’m Dan Abramov.
        </div>
      </div>
      {/* <Image
        src="/maggie-appleton.jpg"
        width={200}
        height="200"
        alt="Maggie Appleton"
      /> */}
      <div className="prose sm:prose-lg max-w-screen-sm w-full mx-auto pt-8">
        <p>
          I’m a member of the React team, and a co-author of Redux and Create
          React App.
        </p>
        <strong className="block text-xl font-sans text-left leading-normal">
          I made Just JavaScript because it’s the course I <em>wish</em> I had
          when I got started.
        </strong>
        <p>
          It’s my distilled mental model of how JavaScript works—a way of
          thinking about JS that will completely shift your understanding of the
          language.
        </p>
        <p>
          When I started thinking about how to explain it, I knew this needed to
          be a visual experience.
        </p>
        <div className="flex md:flex-row flex-col md:space-x-8 items-center py-4">
          <div className="flex-shrink-0">
            <Image
              src="/maggie-appleton.jpg"
              width={180}
              height={180}
              quality={100}
              alt="Maggie Appleton, the illustrator and co-creator of Just JavaScript"
              className="rounded-full"
            />
          </div>
          <p className="leading-normal text-xl font-bold">
            So I teamed up with illustrator <br className="md:block hidden" />
            <a
              href="https://maggieappleton.com/"
              target="_blank"
              rel="noopener"
            >
              <span className="text-black no-underline font-bold">
                Maggie Appleton
              </span>
            </a>{' '}
            to make it happen.
          </p>
        </div>
        <p>
          We’ve built an experience that will teach you to see JavaScript in a
          whole new light. It’s a unique interactive learning environment based
          around explorable explanations. Nothing about this course is a passive
          experience!
        </p>
        <p>
          You’ll reconsider what you thought you knew about the language, and
          come away with an intuitive understanding that will, with a bit of
          practice, become your second nature.
        </p>
      </div>
    </div>
  )
}

export default Creators
