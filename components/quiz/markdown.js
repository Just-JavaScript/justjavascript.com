import ReactMarkdown from 'react-markdown'
import Code from 'components/mdx/code'
import Highlight, {defaultProps} from 'prism-react-renderer'

export default function Markdown({children, className}) {
  return (
    <ReactMarkdown
      source={children}
      escapeHtml={false}
      className={`prose max-w-none ${className ? className : ''}`}
      renderers={{code: Code}}
    />
  )
}
