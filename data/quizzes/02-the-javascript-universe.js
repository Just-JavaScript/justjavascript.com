const TheJavaScriptUniverse = {
  id: 'javascript-universe',
  slug: 'javascript-universe',
  title: 'The JavaScript Universe',
  version: '1.0.0',
  questions: [
    {
      id: '1',
      version: '1.0.0',
      type: 'essay',
      text:
        'Open some JavaScript code that you have been working on and put `console.log(typeof(something))` in it, replacing `something` with different variables in your code. <br/><br/> Which value types did you manage to find an example for? Try to “collect” as many types as you can. <br/><br/> Did any of the results surprise you?',
    },
    {
      id: '2',
      version: '1.0.0',
      type: 'multiple-choice',
      text: 'Lorem ipsum dolor sit amet?',
      choices: [
        {value: 'first choice', text: 'first choice'},
        {value: 'second choice', text: 'second choice'},
      ],
      correctAnswer: 'first choice',
      explanation: 'Because lorem ipsum dolor sit amet. 😉',
    },
    {
      id: '3',
      version: '1.0.0',
      type: 'theater',
      text: 'Lorem ipsum dolor sit amet?',
      explanation: 'first choice',
    },
    {
      id: '4',
      version: '1.0.0',
      type: 'essay',
      text:
        "Imagine you see some code that checks whether a value is a date: <br/> `typeof(value) === 'date'` <br/><br/> Will this code work? Why or why not?",
      explanation:
        '### Answer: `typeof(value) === "date"` is always `false` \
\n\
This is because `date` is not one of the possible `typeof` results. Dates are not one of the primitive types (unlike numbers and booleans), and they are also not functions. So `typeof` for a date is always going to be `object`.',
    },
    {
      id: '5',
      version: '1.0.0',
      type: 'essay',
      text:
        '### Answer: `typeof(value) === "date"` is always `false` \
\n\
This is because `date` is not one of the possible `typeof` results. Dates are not one of the primitive types (unlike numbers and booleans), and they are also not functions. So `typeof` for a date is always going to be `object`.',
    },
    {
      id: '6',
      version: '1.0.0',
      type: 'essay',
      text: 'Lorem Ipsum',
    },
    //     {
    //       id: '7',
    //       version: '1.0.0',
    //       type: 'statement',
    //       text:
    //         '### Answer: `null` is the value that "lies" about its type. \
    // \n\
    // Concretely, typeof(null) is "object" even though null is not an object. Null is a primitive value. (Here’s a historical note on how that happened.) This is a very old bug in JavaScript. It cannot be fixed because it would break existing websites. \n\
    // \n\
    // You might ask: isn’t typeof([]) === "object" a bug? No. Arrays aren’t primitive, so they are objects! Unlike null, they’re telling the truth.',
    //     },
    //     {
    //       id: '8',
    //       version: '1.0.0',
    //       type: 'sketch',
    //       text: 'Sketch a diagram of your JavaScript Universe.',
    //     },
  ],
}

export default TheJavaScriptUniverse
