import ReactMarkdown from 'react-markdown'
import Code from '../mdx/code'
import Highlight, {defaultProps} from 'prism-react-renderer'

export default function Markdown({children, className}) {
  const renderers = {
    code: ({language, value}) => {
      return <div>yoyoyo</div>
    },
  }
  return (
    <ReactMarkdown
      source={children}
      escapeHtml={false}
      className={`prose ${className ? className : ''}`}
      renderers={{code: Code}}
    />
  )
}
