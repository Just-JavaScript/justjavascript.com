import React from 'react'
import Markdown from './markdown'
import Explanation from './explanation'
import {useCopyToClipboard} from 'react-use'
import {map} from 'lodash'

export default function Editor({question, idx}) {
  const [data, setData] = React.useState({
    question: question.text || '',
    explanation: question.explanation || '',
  })
  const [, copyToClipboard] = useCopyToClipboard()

  return (
    <div className="max-w-screen-xl mx-auto p-8">
      <div className="mb-3 py-1 px-2 inline-block border border-gray-200 rounded-md text-sm font-bold">
        {idx} <small className="text-xs font-normal">(id: {question.id})</small>{' '}
        ・ {question.type}
      </div>
      <div className="grid grid-cols-2 gap-4 pb-8">
        <div className="flex flex-col w-full">
          <h2>Question</h2>
          <textarea
            value={data.question}
            onChange={(e) =>
              setData({...data, question: e.currentTarget.value})
            }
            className="form-textarea h-64"
          />
          {data.question && (
            <>
              <Markdown className="mt-4">{data.question}</Markdown>
              <button
                className="mt-4 hover:bg-gray-100 px-3 py-2 rounded-md border border-gray-200 w-full flex items-center justify-center"
                type="button"
                onClick={() => copyToClipboard(JSON.stringify(data.question))}
              >
                Copy JSON
              </button>
            </>
          )}
        </div>
        <div className="flex flex-col w-full">
          <h2>Explanation</h2>
          <textarea
            value={data.explanation}
            onChange={(e) =>
              setData({...data, explanation: e.currentTarget.value})
            }
            className="form-textarea h-64"
          />

          {data.explanation && (
            <>
              <Explanation>{data.explanation}</Explanation>
              <button
                className="mt-4 hover:bg-gray-100 px-3 py-2 rounded-md border border-gray-200 w-full flex items-center justify-center"
                type="button"
                onClick={() =>
                  copyToClipboard(JSON.stringify(data.explanation))
                }
              >
                Copy JSON
              </button>
            </>
          )}
        </div>
      </div>
      <hr />
    </div>
  )
}