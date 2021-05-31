import { forwardRef } from 'react';
import dynamic from 'next/dynamic';

let ExcalidrawImpl = dynamic(
  () => import('./impl'),
  { ssr: false }
);

// Ugh https://github.com/vercel/next.js/issues/4957
const Excalidraw = forwardRef((props, ref) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 450,
        border: '2px solid black'
      }}
      onWheelCapture={e => {
        // Stop Excalidraw from hijacking scroll
        e.stopPropagation();
      }}
    >
      <ExcalidrawImpl {...props} forwardedRef={ref} />
    </div>
  );
});

export default Excalidraw;