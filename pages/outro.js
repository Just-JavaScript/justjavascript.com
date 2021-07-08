import React from 'react'
import Layout from 'components/layout'

const OutroPage = () => {
  return (
    <Layout background="bg-white" meta={{ title: 'And that is all… for now.' }}>
      <div className="max-w-screen-lg w-full mx-auto sm:pt-32 pt-20">
        <header className="pb-16">
          <h1 className="font-serif max-w-lg mx-auto font-extrabold text-center lg:text-7xl sm:text-6xl text-5xl leading-[100%]">
            And that is all… for now.
          </h1>
        </header>
        <main className="prose sm:prose-lg mx-auto">
          <p>I look around, as if awoken from a dream.</p>
          <p>There is nobody in my room. It’s just me and my laptop. A cold coffee mug. A ticking clock. An open editor with my program. I must have spaced out!</p>
          <p>I peer into the code, trying to remember what I was doing.</p>
          <p>In the neon light, I read my program—a list of instructions. There is a lot going on: there are <code>if</code> statements, variable declarations, commas and curly braces.</p>
          <p>My code is the same as when I wrote it. And yet it somehow feels different.</p>
          <p>It’s like there is <i>more to it</i> now.</p>
          <p>A certain kind of clarity.</p>
          <p>I let this feeling linger.</p>
          <p><i>Stay with me.</i></p>
          <p>And it stays.</p>
          <p>I still get lost sometimes. But I know how to find my way back. I take things slow.</p>
          <p>And on a good day, when the song of code enchants me and carries me away, I don’t even see the syntax. I see the values, and the wires that connect them.</p>
          <p>Can you see them, too?</p>
          <div className="text-center sm:py-6 py-2">
            <p className="font-serif font-bold sm:text-3xl text-xl sm:-mx-10 leading-tight">
              What’s next? The universe is always expanding… Stay tuned for
              the next season!
            </p>
          </div>
          <p>In the meantime, here are some things you could do:</p>
          <ul>
            <li>Read through these modules again.</li>
            <li>Test yourself.</li>
            <li>Read more code.</li>
            <li>And keep connecting the wires.</li>
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
