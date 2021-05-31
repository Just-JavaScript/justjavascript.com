import {forwardRef, memo, useEffect, useState} from 'react';
import ExcalidrawImpl from '@excalidraw/excalidraw';

// https://github.com/excalidraw/excalidraw/issues/3685
if (typeof HTMLDivElement !== 'undefined') {
  const realFocus = HTMLDivElement.prototype.focus;
  HTMLDivElement.prototype.focus = function() {
    if (this.className.indexOf('excalidraw-container') === -1) {
      realFocus.apply(this, arguments);
    }
  }
}

const ExcalidrawWrapper = ({
  forwardedRef,
  ...props
}) => {
  useEffect(() => {
    const handleResize = () => {
      if (forwardedRef.current) {
        forwardedRef.current.scrollToContent();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <>
      <style jsx global>{`
        /* https://github.com/excalidraw/excalidraw/issues/3012 */
        .Island .Stack .Shape:nth-child(3),
        .Island .Stack .Shape:nth-child(6),
        .Island .Stack .Shape:nth-child(9),
        .ToolIcon__lock,
        .ToolIcon__keybinding,
        .layer-ui__wrapper__footer-left,
        .layer-ui__wrapper__footer-right,
        .App-bottom-bar .App-toolbar-content {
          display: none !important;
        }
      `}</style>
      <ExcalidrawImpl
        ref={forwardedRef}
        {...props}
        zenModeEnabled={true}
        renderFooter={() => null}
      />
    </>
  );
}

export default memo(ExcalidrawWrapper);
