export default {
  id: 'demo',
  slug: 'demo',
  title: 'Demo Quiz',
  version: '1.0.0',
  questions: [
    {
      id: '10',
      version: '1.0.0',
      type: 'essay',
      text: `# What happens if we run this code?
      \n ~~~js
let numberOfTentacles = 10;
numberOfTentacles = 'eight';
console.log(typeof(numberOfTentacles));
~~~
\n **Is this code valid? Why or why not?**
`,
      explanation:
        'Explanation lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.',
      // answer: {value: 'My answer'},
    },
    {
      id: '20',
      version: '1.0.0',
      type: 'multiple-choice',
      text: `# How long have you been programming?
\n <img src="https://media.giphy.com/media/QuIxFwQo0RMT1tASlV/giphy.gif" alt="silly gif" />`,
      choices: [
        {value: '0-2', text: '0–2 years'},
        {value: '2-5', text: '2–5 years'},
        {value: '5-10', text: '5–10 years'},
        {value: '10-more', text: 'more than 10 years'},
      ],
      // correctAnswer: '0-2',
      // explanation: 'Explanation lorem ipsum dolor sit amet.',
    },
    {
      id: '30',
      version: '1.0.0',
      type: 'multiple-image-choice',
      text: `# Which one of these diagrams best matches your sketch and our mental model after following code runs?\n~~~js\nlet fingernails = 'mustache';\nlet toes = fingernails;\nlet nose = 'must' + 'ache';\n~~~`,
      choices: [
        {
          value: 'a',
          text: 'A',
          image:
            'https://images.typeform.com/images/MyEfFAET2Bc5/image/default',
        },
        {
          value: 'b',
          text: 'B',
          image:
            'https://images.typeform.com/images/RhyMWGtGYKfc/image/default',
        },
        {
          value: 'c',
          text: 'C',
          image:
            'https://images.typeform.com/images/Tz2tC94NSSEp/image/default',
        },
        {
          value: 'd',
          text: 'D',
          image:
            'https://images.typeform.com/images/gDeJqjnHP9aP/image/default',
        },
      ],
      correctAnswer: 'a',
      explanation: 'Explanation lorem ipsum dolor sit amet.',
      answer: {value: 'a'},
    },
    {
      id: '40',
      version: '1.0.0',
      type: 'essay',
      text: `# Can you figure out the three lines of code necessary to swap the values of the surname properties of these two objects?
\n If you get stuck and your physical form allows that, take something large into each hand and then try to swap the items in your hands. You might find it difficult unless you put one of them somewhere temporarily. Hint: in code, that "somewhere" can be a variable.
\n `,
      explanation: `
\n Our problem is that we can't point two wires to different values in one line. We can only change where one of them points at a time.
\n However, we can introduce a variable to "hold onto" the value of one of those wires. Then we can change where that wire points to without "forgetting" where the other wire needs to be pointed.
\n This is similar to how in order to swap two things in your hands, you can give the first thing to your friend to hold, put the second thing in the first hand, and then take the first thing back from your friend.
\n If you're still confused, you can sketch out this example step by step.
\n <img src="https://images.typeform.com/images/cb6W3gafYsbq/image/default" alt="" />`,
    },
    {
      id: '50',
      version: '1.0.0',
      type: 'theater',
      text: `# Lorem Ipsum Dolor Sit Amet`,
      explanation: `It is what it is.`,
    },
    // {
    //   id: '60',
    //   version: '1.0.0',
    //   type: 'sketch',
    //   text: 'Sketch a diagram of your JavaScript Universe.',
    // },
  ],
}
