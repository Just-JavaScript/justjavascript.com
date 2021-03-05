import getChoiceLabelByIndex from './getChoiceLabelByIndex'

// Im sorry

// pass quiz in json
function TransformQuizFromJsonToMdx(quiz) {
  const questions = quiz.questions
    .map((question) => {
      const prompt =
        question.prompt &&
        `
<Prompt>

${question.prompt}

</Prompt>
`

      const answer =
        question.answer &&
        `
<Answer>

${question.answer.description}

</Answer>
`

      const choices = question.choices
        ? question.choices
            .map((choice, index) => {
              const image =
                choice.imageUrl &&
                `
![${getChoiceLabelByIndex(index)}](${choice.imageUrl})
        `
              return `
<Choice>

${image ? image : choice.label}

</Choice>
`
            })
            .join('')
        : ''

      const questionSet =
        question?.questions
          ?.map((question) => {
            const prompt =
              question.prompt &&
              `
<Prompt>

${question.prompt}

</Prompt>
`

            const answer = question.answer
              ? `
<Answer>

${question.answer.description}

</Answer>
`
              : ''

            const choices = question.choices
              ? question.choices
                  .map((choice, index) => {
                    const image =
                      choice.imageUrl &&
                      `
              ![${getChoiceLabelByIndex(index)}](${choice.imageUrl})
                      `
                    return `
              ${
                question.correctChoices[0].value === choice.value
                  ? `<Choice correct>`
                  : `<Choice>`
              }
              
              ${image ? image : choice.label}
      
              </Choice>
              `
                  })
                  .join('')
              : ''

            return `
<Question type="${question.__typename}" id="${question.title}">

${choices}
${prompt}
${answer}

</Question>
`
          })
          .join('') || ''

      return `
  <Question type="${question.__typename}" id="${question.title}">
  
  ${questionSet}
  ${choices}
  ${prompt}
  ${answer}

  </Question>
  `
    })
    .join('')

  const out = `
    <Quiz title="${quiz.title}" id="${quiz.id}" version="1">
    ${questions}
    </Quiz>
    `

  return out
}

export default TransformQuizFromJsonToMdx
