import React from 'react'
import Layout from 'components/layout'

const OutroPage = () => {
  return (
    <Layout background="bg-white" meta={{ title: 'Outro' }}>
      <div className="max-w-screen-lg w-full mx-auto sm:pt-32 pt-20">
        <header className="pb-16">
          <h1 className="font-serif max-w-lg mx-auto font-extrabold text-center lg:text-7xl sm:text-6xl text-5xl leading-[100%]">
            Outro
          </h1>
        </header>
        <main className="prose sm:prose-lg mx-auto">
          <p>Back on my planet, I look down from the JavaScript sky.</p>
          <p>
            Cruising through the celestial spheres. Attending masked carnivals.
            Visiting Malibu with Holmes {'&'} Watson.
          </p>
          <p>
            The places I've been helped me to understand our JavaScript
            universe.
          </p>
          <p>They've equipped me with the mental model.</p>
          <p>
            When I look at a list of instructions that make a program, I see it
            differently.
          </p>
          <p>I can see the values, and the wires that connect them.</p>
          <p>Can you see them, too?</p>
          <div className="text-center sm:py-6 py-2">
            <p className="font-serif font-bold sm:text-3xl text-xl sm:-mx-10 leading-tight">
              What's next? The universe is always expanding... Stay tuned for
              the next season!
            </p>
          </div>
          <p>In the meantime, here are some things you should do:</p>
          <ul>
            <li>Read through these modules again.</li>
            <li>Test yourself.</li>
            <li>Read more code.</li>
            <li>And keep connecting wires.</li>
          </ul>
          <div className="pt-8">
            <p>
              Thanks,
              <br />
              Dan {'&'} Maggie
            </p>
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default OutroPage
