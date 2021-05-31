import { createRef, useMemo, useRef, useState, useEffect, memo } from 'react';
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

function Sketch({ id, baseId }) {
  if (!id) {
    throw Error('Specify an id for persistence');
  }
  // Bump if Excalidraw changes the format.
  const key = 'excalidraw::v1::' + id;
  const initialElements = useMemo(() => readState(key), [key]);
  const ref = useRef();
  return (
    <>
      {baseId && (
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <button
            className="mb-8 mt-8 py-2 px-8 leading-6 text-white transition-colors duration-200 ease-in-out bg-black rounded-md sm:px-10 sm:py-3 hover:bg-gray-900"
            onClick={() => {
              ref.current.updateScene({
                elements: JSON.parse(JSON.stringify(latestState.get(baseId)))
              });
            }}
          >
            Load previous sketch
          </button>
        </div>
      )}
      <Excalidraw
        ref={ref}
        initialData={{
          elements: initialElements,
          scrollToContent: true
        }}
        onChange={(elements) => {
          latestState.set(id, elements);
          writeState(key, elements);
        }}
      />
    </>
  );
}

let latestState = new Map();

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
