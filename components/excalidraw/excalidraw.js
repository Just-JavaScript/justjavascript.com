import { forwardRef } from 'react';
import dynamic from 'next/dynamic';

let ExcalidrawImpl = dynamic(
  () => import('./impl'),
  { ssr: false }
);

const Excalidraw = forwardRef((props, ref) => {
  // Ugh https://github.com/vercel/next.js/issues/4957
  return <ExcalidrawImpl {...props} forwardedRef={ref} />;
});

export default Excalidraw;