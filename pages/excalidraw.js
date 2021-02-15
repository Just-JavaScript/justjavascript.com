import dynamic from 'next/dynamic';
import {useState, useEffect} from 'react';
import { useRouter } from 'next/router';

let ExcalidrawIframeContent = dynamic(
  () => import('../components/excalidraw/excalidraw-iframe-content'),
  { ssr: false }
);

export default function Page() {
  const router = useRouter();
  const id = router.query.id;
  if (id == null) {
    return null;
  }
  return <ExcalidrawIframeContent id={id} />;
};
