import { createRef, useMemo, useRef, useEffect, memo } from 'react';
import Excalidraw from '../excalidraw/excalidraw'
import debounce from 'lodash/debounce'
import {ErrorBoundary} from 'react-error-boundary'

let didClear = false;

function SketchWithErrorHandling(props) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        if (!didClear) {
          try {
            localStorage.clear();
            didClear = true;
          } catch { }
        }
      }}
    >
      <Sketch {...props} />
    </ErrorBoundary>
  );
}

export default memo(SketchWithErrorHandling);

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div style={{
      border: '2px solid black',
      width: '100%',
      height: 400,
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div>
        Something went wrong.
        <br />
        <br />
        <button
          className="leading-8 px-5 py-3 rounded-md bg-indigo-500 hover:bg-indigo-600 transition-colors duration-200 ease-in-out text-white"
          onClick={resetErrorBoundary}>
          Try again
        </button>
      </div>
    </div>
  )
}

function Sketch({ id }) {
  if (!id) {
    throw Error('Specify an id for persistence');
  }
  // Bump if Excalidraw changes the format.
  const key = 'excalidraw::v1::' + id;
  const xcRef = useRef();
  const initialElements = useMemo(() => readState(key), [key]);
  return (
    <Excalidraw
      ref={xcRef}
      initialData={{
        elements: initialElements,
        scrollToContent: true
      }}
      onChange={(elements) => {
        writeState(key, elements);
      }}
    />
  );
}

function readState(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    return null;
  }
}

function writeState(key, state) {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (e) {
    return null;
  }
}

writeState = debounce(writeState, 1000);
