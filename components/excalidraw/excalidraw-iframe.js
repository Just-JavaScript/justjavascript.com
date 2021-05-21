import {useRef, useState, useEffect, useLayoutEffect, memo, forwardRef} from 'react';

let nextId = 0;

if (process.browser) {
  // Bridge to communicate with iframe content.
  window.__EXCALIDRAW__ = {};
}

const ExcalidrawIframe = forwardRef(({
  width = '100%',
  height = 400,
  ...props
}, ref) => {
  const [id, setId] = useState(() => '' + nextId++);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
  if (error) {
    throw error;
  }

  props = {
    ...props,
    xcRef: ref
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!window.__EXCALIDRAW__[id]) {
      // Set up an object for the iframe to hook into.
      window.__EXCALIDRAW__[id] = {
        props,
        setProps(p) {
          window.__EXCALIDRAW__[id].props = p;
        }
      };
    }
    // Forward prop changes to the iframe.
    window.__EXCALIDRAW__[id].setProps(props);
  }, [props, id]);

  if (!mounted) {
    // Fallback for SSR
    return (
      <div style={{
        border: '2px solid black',
        width,
        height
      }} />
    );
  }

  return (
    <iframe
      src={"/excalidraw?id=" + id}
      ref={node => {
        if (node) {
          node.contentWindow.onerror = (e) => {
            delete window.__EXCALIDRAW__[id];
            setError(e.error || new Error(e));
          };
          node.contentWindow.onunhandledrejection = (e) => {
            delete window.__EXCALIDRAW__[id];
            setError(e.reason || new Error(e));
          };
        }
      }}
      style={{
        border: '2px solid black',
        width,
        height
      }}
    />
  );
});

export default memo(ExcalidrawIframe);
