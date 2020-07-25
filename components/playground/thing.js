import { cloneElement, useContext, useState, Children } from 'react';
import { BusyContext } from './ctx';
import { motion, AnimateSharedLayout } from "framer-motion"

function reducer(state, action) {
  const {type, ...rest} = action;
  switch (action.type) {
    case 'delete': {
      let temp = {...state};
      delete temp[action.name];
      return temp;
    }
    case 'variable':
    case 'value': {
      return {
        ...state,
        [action.name]: action
      };
    }
    case 'wire': {
      const {source, target, offset, ...rest} = action;
      const pos = {
        from: [
          state[source].left + offset[0],
          state[source].top + offset[1],
        ],
        to: [
          state[target].left + offset[2],
          state[target].top + offset[3],
        ],
      };
      return {
        ...state,
        [action.name]: {
          ...rest,
          ...pos
        }
      };
    }
  }
  return state;
}

function Frames({ children }) {
  const [index, setIndex] = useState(0);
  const [delayedIndex, setDelayedIndex] = useState(0);
  const code = children[delayedIndex].props.children(handleNext);

  let stage = {};
  function dispatch(action) {
    stage = reducer(stage, action);
  }
  for (let i = 0; i < index; i++) {
    const actions = children[i].props.actions;
    if (actions) {
      actions(stage).forEach(dispatch);
    }
  }

  function handleNext() {
    const nextIndex = index < children.length - 1 ? index + 1 : index;
    setIndex(nextIndex);
    if (children[index].props.actions) {
      setTimeout(() => {
        setDelayedIndex(nextIndex);
      }, 500);
    } else {
      setDelayedIndex(nextIndex);
    }
  }

  let stageChildren = [];
  for (let key in stage) {
    if (stage.hasOwnProperty(key)) {
      let {type, ...props} = stage[key];
      let Type;
      switch (type) {
        case 'variable':
          Type = Variable;
          break;
        case 'value':
          Type = Value;
          break;
        case 'wire':
          Type = Wire;
          break;
      }
      stageChildren.push(<Type {...props} key={key} />);
    }
  }

  return (
    <BusyContext.Provider value={index !== delayedIndex}>
      <Layout
        code={
          <AnimateSharedLayout>
            {code}
          </AnimateSharedLayout>
        }
        stage={
          <div style={{
            padding: 50,
            position: 'relative',
            fontFamily: 'sans-serif',
            fontSize: 32,
          }}>
            {stageChildren}
          </div>
        }
      />
    </BusyContext.Provider>
  );
}

function Frame({ children, action }) {
  return null;
}

function Variable({ name, left, top }) {
  return (
    <motion.div
      initial={{ opacity: 0.5, scale: 1.2 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'absolute',
        left: left * 16,
        top: top * 16,
        width: 100,
        height: 50,
        border: '1px solid #777',
        background: 'white',
        color: 'black',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {name}
    </motion.div>
  );
}

function Value({ name, left, top }) {
  return (
    <motion.div
      initial={{ opacity: 0.5, scale: 1.2 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'absolute',
        left: left * 16,
        top: top * 16,
        width: 64,
        height: 64,
        border: '1px solid #777',
        borderRadius: '50%',
        background: 'white',
        color: 'black',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {name}
    </motion.div>
  );
}

function Wire({ from, to }) {
  function curvedHorizontal(x1, y1, x2, y2) {
    var line = []
    var mx = x1 + (x2 - x1) / 2

    line.push('M', x1, y1)
    line.push('C', mx, y1, mx, y2, x2, y2)

    return line.join(' ')
  }

  const color = '#0bb1ff';
  return (
    <svg style={{
      overflow: 'visible',
      position: 'absolute',
      height: '100%'
    }}>
      <g
        fill="none"
        stroke={color}
        strokeWidth="2">
        <motion.path
          initial={{ opacity: 0.5, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ duration: 0.5 }}
          d={curvedHorizontal(
            from[0] * 16,
            from[1] * 16,
            to[0] * 16,
            to[1] * 16
          )}
        />
      </g>
    </svg>
  );
}

function Next({ onClick, children }) {
  const isBusy = useContext(BusyContext);
  const activeColor = isBusy ? 'white' : 'orange';
  return (
    <motion.div
      animate={{
        scale: (isBusy && onClick) ? 1.2 : 1
      }}
      whileTap={{ scale: onClick ? 0.95 : 1 }}
      onClick={isBusy ? null : onClick}
      style={{
        display: 'inline-block',
        border: 'none',
        backgroundColor: onClick ? activeColor : 'rgb(255 166 56 / 13%)',
        color: onClick ? 'black' : 'white',
        borderRadius: 4,
        margin: '0 -4px',
        padding: '0 4px',
        cursor: onClick ? 'pointer' : '',
      }}
    >
      {children}
    </motion.div>
  )
}

function Layout({ stage, code }) {
  return (
    <div style={{
      display: 'flex',
      height: 300,
    }}>
      <div style={{
        width: 200,
        height: '100%',
      }}>
        {code}
      </div>
      <div style={{
        padding: 20,
        height: '100%',
      }}>
        <div style={{
          width: '100%',
          height: '100%'
        }}>
          {stage}
        </div>
      </div>
    </div>
  )
}

export default function Thing() {
  return (
    <Frames>
      <Frame>
        {next => (
          <pre>
            <Next onClick={() => next()}>
            let a = 10;
            </Next>
            <br />
            let b = a;
            <br />
            a = 0;
          </pre>
        )}
      </Frame>
      <Frame actions={stage => [{
        type: 'variable',
        name: 'a',
        left: 1,
        top: 1,
      }]}>
        {next => (
          <pre>
            <Next>
            let <Next onClick={next}>a</Next> = 10;
            </Next>
            <br />
            let b = a;
            <br />
            a = 0;
          </pre>
        )}
      </Frame>
      <Frame actions={stage => [{
        type: 'value',
        name: '10',
        left: 15,
        top: 3
      }]}>
        {next => (
          <pre>
            <Next>
            let a = <Next onClick={next}>10</Next>;
            </Next>
            <br />
            let b = a;
            <br />
            a = 0;
          </pre>
        )}
      </Frame>
      <Frame actions={stage => [{
        type: 'wire',
        name: 'aWireTo10',
        source: 'a',
        target: '10',
        offset: [3.1, -1.5, -3.1, -1.4],
      }]}>
        {next => (
          <pre>
            <Next>
            let a <Next onClick={next}>=</Next> 10;
            </Next>
            <br />
            let b = a;
            <br />
            a = 0;
          </pre>
        )}
      </Frame>
      <Frame>
        {next => (
          <pre>
            let a = 10;
            <br />
            <Next onClick={next}>
            let b = a;
            </Next>
            <br />
            a = 0;
          </pre>
        )}
      </Frame>
      <Frame actions={stage => [{
        type: 'variable',
        name: 'b',
        left: 1,
        top: 5,
      }]}>
        {next => (
          <pre>
            let a = 10;
            <br />
            <Next>
            let <Next onClick={next}>b</Next> = a;
            </Next>
            <br />
            a = 0;
          </pre>
        )}
      </Frame>
      <Frame>
        {next => (
          <pre>
            let a = 10;
            <br />
            <Next>
            let b = <Next onClick={next}>a</Next>;
            </Next>
            <br />
            a = 0;
          </pre>
        )}
      </Frame>
      <Frame actions={stage => [{
        type: 'wire',
        name: 'bWireTo10',
        source: 'b',
        target: '10',
        offset: [3.1, -1.5, -3.1, -0.6],
      }]}>
        {next => (
          <pre>
            let a = 10;
            <br />
            <Next>
            let b <Next onClick={next}>=</Next> a;
            </Next>
            <br />
            a = 0;
          </pre>
        )}
      </Frame>
      <Frame>
        {next => (
          <pre>
            let a = 10;
            <br />
            let b = a;
            <br />
            <Next onClick={next}>
            a = 0;
            </Next>
          </pre>
        )}
      </Frame>
      <Frame>
        {next => (
          <pre>
            let a = 10;
            <br />
            let b = a;
            <br />
            <Next>
            <Next onClick={next}>a</Next> = 0;
            </Next>
          </pre>
        )}
      </Frame>
      <Frame actions={stage => [{
        type: 'value',
        name: '0',
        left: 15,
        top: 8
      }]}>
        {next => (
          <pre>
            let a = 10;
            <br />
            let b = a;
            <br />
            <Next>
            a = <Next onClick={next}>0</Next>;
            </Next>
          </pre>
        )}
      </Frame>
      <Frame actions={stage => [{
        type: 'delete',
        name: 'aWireTo10',
      }, {
        type: 'wire',
        name: 'aWireTo0',
        source: 'a',
        target: '0',
        offset: [3.1, -1.5, -3.1, -0.6],
      }]}>
        {next => (
          <pre>
            let a = 10;
            <br />
            let b = a;
            <br />
            <Next>
            a <Next onClick={next}>=</Next> 0;
            </Next>
          </pre>
        )}
      </Frame>
      <Frame>
        {next => (
          <pre>
            let a = 10;
            <br />
            let b = a;
            <br />
            a = 0;
          </pre>
        )}
      </Frame>
    </Frames>
  );
}
