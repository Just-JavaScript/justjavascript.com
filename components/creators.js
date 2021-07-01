import React from 'react'
import Image from 'next/image'

const Creators = () => {
  return (
    <div className="bg-gradient-to-t from-white to-gray-50 -m-5 px-5 py-20">
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
        <div className="sm:text-4xl text-3xl -translate-y-8 font-serif font-bold ">
          Hi, I’m{' '}
          <span className=" bg-black px-2 rounded-sm text-white">
            Dan Abramov.
          </span>
          <span className="text-gray-800" />
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
        <div className="flex space-x-5 items-center">
          <p className="sm:max-w-md leading-normal">
            So I teamed up with illustrator{' '}
            <span className="font-serif font-bold text-xl">
              Maggie Appleton
            </span>{' '}
            to make it happen.
          </p>
          <div className="flex-shrink-0">
            <Image
              src="/maggie-appleton.jpg"
              width={150}
              height={150}
              quality={100}
              alt="Maggie Appleton, the illustrator and co-creator of Just JavaScript"
              className="rounded-full"
            />
          </div>
        </div>
        <p>
          We’ve built an experience that will teach you to see JavaScript in a
          whole new light. It’s a unique interactive learning environment based
          around explorable explanations. Nothing about this course is a passive
          experience!
        </p>
        <p>
          You’ll reconsider what you thought you knew about the language, and
          come away with an intuitive understanding that will, with a bit of practice,{' '}
          become your second nature.
        </p>
      </div>
    </div>
  )
}

export default Creators
