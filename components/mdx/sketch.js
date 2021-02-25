import { createRef, useRef, useEffect, memo } from 'react';
import Excalidraw from '../excalidraw/excalidraw-iframe'
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
  const ref = useRef(null);
  if (!ref.current) {
    ref.current = new ExcalidrawImperative(key);
  }
  useEffect(() => {
    const xc = ref.current;
    xc.listen();
    return () => xc.unlisten();
  }, []);
  return (
    <Excalidraw
      ref={ref.current.xcRef}
      initialData={{
        elements: ref.current.elements,
        scrollToCenter: true
      }}
      onChange={ref.current.handleChange}
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

let listeners = {};
let isNotifying = false;
let nextId = 0;

class ExcalidrawImperative {
  constructor(key) {
    this.id = nextId++;
    this.key = key;
    this.xcRef = createRef();
    this.elements = readState(key);
    this.broadcastSyncedEdit = debounce(this.broadcastSyncedEdit, 1000);
  }

  listen = () => {
    listeners[this.key] = listeners[this.key] || [];
    listeners[this.key].push(this.handleSyncedEdit);
  };

  unlisten = () => {
    listeners[this.key] = listeners[this.key].filter(l =>
      l === this.handleSyncedEdit
    )
  };

  handleSyncedEdit = (originId, elements) => {
    if (originId !== this.id && this.xcRef.current) {
      // Excalidraw gets buggy if we reuse the elements.
      this.xcRef.current.updateScene(JSON.parse(JSON.stringify({
        elements,
      })));
    }
  };

  handleChange = (elements) => {
    if (!isNotifying) {
      this.elements = elements;
      writeState(this.key, elements);
      this.broadcastSyncedEdit(elements);
    }
  };

  broadcastSyncedEdit = (elements) => {
    const toNotify = listeners[this.key];
    if (toNotify) {
      isNotifying = true;
      try {
        toNotify.forEach(cb => cb(this.id, elements));
      } finally {
        isNotifying = false;
      }
    }
  }
}
