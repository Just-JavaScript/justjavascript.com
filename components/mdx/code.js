import React from 'react'
import themeDark from 'prism-react-renderer/themes/nightOwl'
// import themeLight from 'prism-react-renderer/themes/nightOwlLight'
import Highlight, {defaultProps} from 'prism-react-renderer'

const Code = ({children, codeString, className = 'language-js', ...props}) => {
  const language = className.replace(/language-/, '')

  return (
    <div>
      <Highlight
        {...defaultProps}
        code={children.trim()}
        language={language}
        theme={themeDark}
      >
        {({className, style, tokens, getLineProps, getTokenProps}) => (
          <pre
            className={className}
            style={{
              ...style,
              padding: '20px',
              fontSize: '80%',
              borderRadius: 5,
              marginBottom: '1.25rem',
              overflowX: 'auto',
              fontFamily: '"ibm-plex-mono", monospace',
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({line, key: i})}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({token, key})} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}

export default Code
