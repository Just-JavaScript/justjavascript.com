import Markdown from 'react-markdown'

const TechnicalDetails = () => {
  return (
    <div className="bg-gradient-to-t from-white to-gray-50 -m-5 px-5 py-20">
      <h3 className="py-8 sm:text-4xl text-3xl font-serif text-center font-bold pt-4 pb-8">
        Technical Details
      </h3>

      <Markdown className="prose sm:prose-lg max-w-screen-sm w-full mx-auto pt-8">{`
The first season of Just JavaScript consists of ten episodes. 

We begin by establishing the mental model.

**This mental model isn’t scoped only to Just JavaScript. It will serve as your basis for development you do for the rest of your career.**

As you explore the JavaScript Universe, you’ll see how the mental model adjusts your understanding of some of JavaScript's primary features:

- Values & variables
- Statements & expressions
- Primitive types
- Objects & functions
- null & undefined
- Properties & prototypes

Change the way you understand code, and you will change the trajectory of your career.

In the end, it’s all Just JavaScript.
            `}</Markdown>
    </div>
  )
}

export default TechnicalDetails
