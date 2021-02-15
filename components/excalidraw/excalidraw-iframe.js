import {useRef, useState, useLayoutEffect, memo} from 'react';

let nextId = 0;

if (process.browser) {
  // Bridge to communicate with iframe content.
  window.__EXCALIDRAW__ = {};
}

const ExcalidrawIframe = ({
  width = '100%',
  height = 400,
  ...props
}) => {
  const [id, setId] = useState(() => '' + nextId++);

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

  return (
    <iframe src={"/excalidraw?id=" + id}
      style={{
        border: '2px solid black',
        width,
        height
      }}
    />
  );
}

export default memo(ExcalidrawIframe);
