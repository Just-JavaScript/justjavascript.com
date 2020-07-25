import {useState, Children} from 'react';
import { motion } from "framer-motion"

function Frames({ children }) {
  const [index, setIndex] = useState(0);
  const step = children[index];
  function handleNext() {
    setIndex(i => i < children.length - 1 ? i + 1 : 0);
  }
  return step(handleNext);
}

function Stage({ children }) {
  return (
    <div style={{
      padding: 50,
      position: 'relative',
      fontFamily: 'sans-serif',
      fontSize: 32,
    }}>
      {children}
    </div>
  )
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

function Arrow({ from, to }) {
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
  return (
    <button
      onClick={onClick}
      style={{
        border: 'none',
        backgroundColor: onClick ? 'orange' : 'rgb(255 166 56 / 13%)',
        color: onClick ? 'black' : 'white',
        borderRadius: 4,
        margin: '0 -4px',
        padding: '0 4px',
        cursor: onClick ? 'pointer' : '',
      }}
    >
      {children}
    </button>
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
          position: 'relative',
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
      {next => (
        <Layout
          code={
            <pre>
              <Next onClick={next}>
              let a = 10;
              </Next>
              <br />
              let b = a;
              <br />
              a = 0;
            </pre>
          }
          stage={null}
        />
      )}
      {next => (
        <Layout
          code={
            <pre>
              <Next>
              let <Next onClick={next}>a</Next> = 10;
              </Next>
              <br />
              let b = a;
              <br />
              a = 0;
            </pre>
          }
          stage={null}
        />
      )}
      {next => (
        <Layout
          code={
            <pre>
              <Next>
              let a = <Next onClick={next}>10</Next>;
              </Next>
              <br />
              let b = a;
              <br />
              a = 0;
            </pre>
          }
          stage={
            <>
              <Variable
                key="a"
                name="a"
                left={1}
                top={1}
              />
            </>
          }
        />
      )}
      {next => (
        <Layout
          code={
            <pre>
              <Next>
              let a <Next onClick={next}>=</Next> 10;
              </Next>
              <br />
              let b = a;
              <br />
              a = 0;
            </pre>
          }
          stage={
            <>
              <Variable
                key="a"
                name="a"
                left={1}
                top={1}
              />
              <Value
                key="10"
                name="10"
                left={15}
                top={3}
              />
            </>
          }
        />
      )}
      {next => (
        <Layout
          code={
            <pre>
              let a = 10;
              <br />
              <Next onClick={next}>
              let b = a;
              </Next>
              <br />
              a = 0;
            </pre>
          }
          stage={
            <>
              <Variable
                key="a"
                name="a"
                left={1}
                top={1}
              />
              <Value
                key="10"
                name="10"
                left={15}
                top={3}
              />
              <Arrow
                key="a-to-10"
                from={[7.2, 2.3]}
                to={[15.4, 5.1]} />
            </>
          }
        />
      )}
      {next => (
        <Layout
          code={
            <pre>
              let a = 10;
              <br />
              <Next>
              let <Next onClick={next}>b</Next> = a;
              </Next>
              <br />
              a = 0;
            </pre>
          }
          stage={
            <>
              <Variable
                key="a"
                name="a"
                left={1}
                top={1}
              />
              <Value
                key="10"
                name="10"
                left={15}
                top={3}
              />
              <Arrow
                key="a-to-10"
                from={[7.2, 2.3]}
                to={[15.4, 5.1]} />
            </>
          }
        />
      )}
      {next => (
        <Layout
          code={
            <pre>
              let a = 10;
              <br />
              <Next>
              let b = <Next onClick={next}>a</Next>;
              </Next>
              <br />
              a = 0;
            </pre>
          }
          stage={
            <>
              <Variable
                key="a"
                name="a"
                left={1}
                top={1}
              />
              <Variable
                key="b"
                name="b"
                left={1}
                top={5.5}
              />
              <Value
                key="10"
                name="10"
                left={15}
                top={3}
              />
              <Arrow
                key="a-to-10"
                from={[7.2, 2.3]}
                to={[15.4, 5.1]} />
            </>
          }
        />
      )}
      {next => (
        <Layout
          code={
            <pre>
              let a = 10;
              <br />
              <Next>
              let b <Next onClick={next}>=</Next> a;
              </Next>
              <br />
              a = 0;
            </pre>
          }
          stage={
            <>
              <Variable
                key="a"
                name="a"
                left={1}
                top={1}
              />
              <Variable
                key="b"
                name="b"
                left={1}
                top={5.5}
              />
              <Value
                key="10"
                name="10"
                left={15}
                top={3}
              />
              <Arrow
                key="a-to-10"
                from={[7.2, 2.3]}
                to={[15.4, 5.1]} />
            </>
          }
        />
      )}
      {next => (
        <Layout
          code={
            <pre>
              let a = 10;
              <br />
              let b = a;
              <br />
              <Next onClick={next}>
              a = 0;
              </Next>
            </pre>
          }
          stage={
            <>
              <Variable
                key="a"
                name="a"
                left={1}
                top={1}
              />
              <Variable
                key="b"
                name="b"
                left={1}
                top={5.5}
              />
              <Value
                key="10"
                name="10"
                left={15}
                top={3}
              />
              <Arrow
                key="a-to-10"
                from={[7.2, 2.3]}
                to={[15.4, 5.1]} />
              <Arrow
                key="b-to-10"
                from={[7.2, 7]}
                to={[15.4, 5.1]} />
            </>
          }
        />
      )}
      {next => (
        <Layout
          code={
            <pre>
              let a = 10;
              <br />
              let b = a;
              <br />
              <Next>
              <Next onClick={next}>a</Next> = 0;
              </Next>
            </pre>
          }
          stage={
            <>
              <Variable
                key="a"
                name="a"
                left={1}
                top={1}
              />
              <Variable
                key="b"
                name="b"
                left={1}
                top={5.5}
              />
              <Value
                key="10"
                name="10"
                left={15}
                top={3}
              />
              <Arrow
                key="a-to-10"
                from={[7.2, 2.3]}
                to={[15.4, 5.1]} />
              <Arrow
                key="b-to-10"
                from={[7.2, 7]}
                to={[15.4, 5.1]} />
            </>
          }
        />
      )}
      {next => (
        <Layout
          code={
            <pre>
              let a = 10;
              <br />
              let b = a;
              <br />
              <Next>
              a = <Next onClick={next}>0</Next>;
              </Next>
            </pre>
          }
          stage={
            <>
              <Variable
                key="a"
                name="a"
                left={1}
                top={1}
              />
              <Variable
                key="b"
                name="b"
                left={1}
                top={5.5}
              />
              <Value
                key="10"
                name="10"
                left={15}
                top={3}
              />
              <Arrow
                key="a-to-10"
                from={[7.2, 2.3]}
                to={[15.4, 5.1]} />
              <Arrow
                key="b-to-10"
                from={[7.2, 7]}
                to={[15.4, 5.1]} />
            </>
          }
        />
      )}
      {next => (
        <Layout
          code={
            <pre>
              let a = 10;
              <br />
              let b = a;
              <br />
              <Next>
              a <Next onClick={next}>=</Next> 0;
              </Next>
            </pre>
          }
          stage={
            <>
              <Variable
                key="a"
                name="a"
                left={1}
                top={1}
              />
              <Variable
                key="b"
                name="b"
                left={1}
                top={5.5}
              />
              <Value
                key="10"
                name="10"
                left={15}
                top={3}
              />
              <Value
                key="0"
                name="0"
                left={15}
                top={8}
              />
              <Arrow
                key="a-to-10"
                from={[7.2, 2.3]}
                to={[15.4, 5.1]} />
              <Arrow
                key="b-to-10"
                from={[7.2, 7]}
                to={[15.4, 5.1]} />
            </>
          }
        />
      )}
      {next => (
        <Layout
          code={
            <pre>
              let a = 10;
              <br />
              let b = a;
              <br />
              a = 0;
            </pre>
          }
          stage={
            <>
              <Variable
                key="a"
                name="a"
                left={1}
                top={1}
              />
              <Variable
                key="b"
                name="b"
                left={1}
                top={5.5}
              />
              <Value
                key="10"
                name="10"
                left={15}
                top={3}
              />
              <Value
                key="0"
                name="0"
                left={15}
                top={8}
              />
              <Arrow
                key="a-to-0"
                from={[7.2, 2.3]}
                to={[15.4, 9.4]} />
              <Arrow
                key="b-to-10"
                from={[7.2, 7]}
                to={[15.4, 5.1]} />
            </>
          }
        />
      )}
    </Frames>
  );
}
