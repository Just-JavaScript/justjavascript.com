import {memo, useState, useEffect, useLayoutEffect, useMemo} from 'react'

// HACK: https://github.com/excalidraw/excalidraw/issues/3013
[...document.getElementsByTagName("script")].forEach(el => {
  Object.defineProperty(el, 'src', {
    get() {
      return '/';
    }
  });
});
let Excalidraw = require('@excalidraw/excalidraw').default;

const ExcalidrawIframeContent = ({ id }) => {
  // Set up a bridge to communicate with the parent frame.
  const [props, setProps] = useState(() =>
    parent.__EXCALIDRAW__[id].props
  );
  useLayoutEffect(() => {
    parent.__EXCALIDRAW__[id].setProps = setProps;
  });

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!props) {
    return null;
  }

  const {width, height} = dimensions;
  return useMemo(() => (
    <>
      <Excalidraw
        {...props}
        ref={props.xcRef}
        width={width}
        height={height}
      />
      <style jsx global>{`
        /* https://github.com/excalidraw/excalidraw/issues/3012 */
        .Island .Stack .Shape:nth-child(3),
        .Island .Stack .Shape:nth-child(6),
        .Island .Stack .Shape:nth-child(9),
        .ToolIcon__lock,
        .App-toolbar-content button[aria-label="Edit"],
        .App-toolbar-content button[aria-label="Duplicate"] {
          display: none !important;
        }
      `}</style>
    </>
  ), [props, width, height]);
};

export default memo(ExcalidrawIframeContent);
