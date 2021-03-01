import ReactMarkdown from 'react-markdown'
import Code from 'components/mdx/code'

export default function Markdown({children, className}) {
  return (
    <ReactMarkdown
      source={children}
      escapeHtml={false}
      className={`prose prose-sans sm:prose-sans-lg max-w-none ${
        className ? className : ''
      }`}
      renderers={{code: Code}}
    />
  )
}
