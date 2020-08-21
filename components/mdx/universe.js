import {Fragment, useState, useContext, useRef, useLayoutEffect, useEffect, useCallback} from 'react';
import {useImmer} from 'use-immer';
import interpolate from 'color-interpolate';
import {CanvasContext} from './Context';

/*
TODO

- hint that highlights next actions (red/green)
- just the name.
- dragging is taking too much
- 0 never goes away
- fade away other code and/or show an arrow
- going too fast
- crossroads
  - what if you reach the right state through wrong path
  - make it easy to go back
  - make it easy to retrace
- "clean unused"
- unused nodes shouldn't affect
 */

let initialModel = {
  nodes: [{
    id: 'vars',
    type: 'composite',
    label: 'Variables',
    slots: [],
  }],
  edges: [],
  positions: {
    'vars': [50, 50],
  },
  activeNode: null,
  activeEdge: null,
};

let steps = [{
  matches: [],
  nodes: [{
    id: 'vars',
    type: 'composite',
    label: 'Variables',
    slots: [],
  }],
  edges: []
}, {
  matches: [
    ['let a', 0],
    ['let b', 0]
  ],
  nodes: [{
    id: 'vars',
    type: 'composite',
    label: 'Variables',
    slots: ['a', 'b'],
  }],
  edges: []
}, {
  matches: [
    ['a = 10', 0],
  ],
  nodes: [{
    id: 'vars',
    type: 'composite',
    label: 'Variables',
    slots: ['a', 'b'],
  }, {
    id: 'number_10',
    type: 'primitive',
    value: 10,
  }],
  edges: [{
    from: 'vars.a',
    to: 'number_10'
  }]
}, {
  matches: [
    ['b = a', 0],
  ],
  nodes: [{
    id: 'vars',
    type: 'composite',
    label: 'Variables',
    slots: ['a', 'b'],
  }, {
    id: 'number_10',
    type: 'primitive',
    value: 10,
  }],
  edges: [{
    from: 'vars.a',
    to: 'number_10'
  }, {
    from: 'vars.b',
    to: 'number_10'
  }]
}, {
  matches: [
    ['a = 0', 0],
  ],
  nodes: [{
    id: 'vars',
    type: 'composite',
    label: 'Variables',
    slots: ['a', 'b'],
  }, {
    id: 'number_10',
    type: 'primitive',
    value: 10,
  }, {
    id: 'number_0',
    type: 'primitive',
    value: 0,
  }],
  edges: [{
    from: 'vars.a',
    to: 'number_0'
  }, {
    from: 'vars.b',
    to: 'number_10'
  }]
}];

function diff(baseModel, nextModel) {
  let differences = [];
  for (let nextNode of nextModel.nodes) {
    let baseNode = baseModel.nodes.find(
      n => (
        n.id === nextNode.id &&
        n.type === nextNode.type &&
        n.value === nextNode.value
      )
    );
    if (!baseNode) {
      differences.push('add ' + nextNode.id);
    } else if (nextNode.type === 'composite') {
      for (let nextSlot of nextNode.slots) {
        if (!baseNode.slots.includes(nextSlot)) {
          differences.push('add ' + nextNode.id + '.' + nextSlot);
        }
      }
      for (let baseSlot of baseNode.slots) {
        if (!nextNode.slots.includes(baseSlot)) {
          differences.push('remove ' + baseNode.id + '.' + baseSlot);
        }
      }
    }
  }
  for (let baseNode of baseModel.nodes) {
    let nextNode = nextModel.nodes.find(
      n => (
        n.id === baseNode.id &&
        n.type === baseNode.type &&
        n.value === baseNode.value
      )
    );
    if (!nextNode) {
      differences.push('remove ' + baseNode.id);
    }
  }
  for (let nextEdge of nextModel.edges) {
    let baseEdge = baseModel.edges.find(
      e => (
        e.from === nextEdge.from &&
        e.to === nextEdge.to
      )
    );
    if (!baseEdge) {
      differences.push('add ' + nextEdge.from + ' -> ' + nextEdge.to);
    }
  }
  for (let baseEdge of baseModel.edges) {
    let nextEdge = nextModel.edges.find(
      e => (
        e.from === baseEdge.from &&
        e.to === baseEdge.to
      )
    );
    if (!nextEdge) {
      differences.push('remove ' + baseEdge.from + ' -> ' + baseEdge.to);
    }
  }
  return differences;
}

function getScore(baseModel, expectedModel, actualModel) {
  let expectedDiff = diff(baseModel, expectedModel);
  let actualDiff = diff(baseModel, actualModel);

  let expected = expectedDiff.length;
  let actual = 0;
  let penalties = 0;

  for (let item of actualDiff) {
    if (expectedDiff.includes(item)) {
      actual++;
    } else {
      penalties++;
    }
  }

  return {
    expected,
    actual,
    penalties,
  }
}

export default function Universe() {
  let [step, setStep] = useState(0);
  let [model, updateModel] = useImmer(initialModel);
  let [baseline, setBaseline] = useState(() => getScore(steps[0], steps[0], initialModel));
  let [snapshots, updateSnapshots] = useImmer([initialModel]);
  let [undoHistory, updateUndoHistory] = useImmer([]);

  let score = 1;
  if (steps[step + 1]) {
    let result = getScore(
      steps[step],
      steps[step + 1],
      model
    );
    let isSolved = result.penalties === 0 && result.actual === result.expected;
    if (isSolved) {
      setBaseline(result);
      setStep(s => Math.min(s + 1, steps.length));
      updateSnapshots(snapshots => {
        snapshots.push({
          ...model,
          activeNode: null
        })
      });
      updateModel(draft => {
        draft.activeNode = null;
      });
    } else {
      const balance = result.actual - result.penalties;
      if (balance >= 0) {
        score = 0.5 + balance / result.expected * 0.5;
      } else {
        score = 0.5 * (1 / -(balance - 1));
      }
    }
  }

  function undo() {
    if (undoHistory.length === 0) {
      return;
    }
    updateUndoHistory(draft => {
      draft.pop();
    });
    let lastModel = undoHistory[undoHistory.length - 1];
    let positions = {
      ...model.positions
    };
    for (let id in lastModel.positions) {
      if (
        !positions.hasOwnProperty(id) &&
        lastModel.positions.hasOwnProperty(id)
      ) {
        positions[id] = lastModel.positions[id];
      }
    }
    updateModel(() => ({
      ...lastModel,
      positions: positions,
      activeEdge: null,
      activeNode: null,
    }));
  }

  function saveUndoState() {
    updateUndoHistory((draft) => {
      draft.push(model);
    })
  }

  function reset() {
    updateModel(draft => ({
      ...draft,
      ...snapshots[snapshots.length - 1],
      activeEdge: null,
      activeNode: null,
    }));
  }


  return (
    <>
      <Code
        nextStep={step + 1}
        source={`
          let a = 10;
          let b = a;
          a = 0;
        `}
      />
      <Progress
        step={step}
        score={score}
      />
      <Canvas
        model={model}
        updateModel={updateModel}
        undo={undo}
        saveUndoState={saveUndoState}
        reset={reset}
      />
    </>
  );
}

const colorMap = interpolate([
  '#D32F2F',
  '#F9A825',
  '#09af00',
]);

function Progress({ step, score }) {
  return (
    <div style={{
      width: 600,
      marginTop: 60,
      marginBottom: 60,
      height: 0,
      display: 'flex',
      justifyContent: 'space-between',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute',
        width: '100%',
        height: 4,
        top: -2,
        background: '#eee'
      }} />
      {steps.map((s, i) => (
        <Fragment key={i}>
          <div
            style={{
              position: 'relative',
              top: -30,
              width: 20,
              height: 60,
            }}
          >
            <div style={{
              position: 'relative',
              top: 20,
              width: 20,
              height: 20,
              background: step === steps.length - 1
                ? '#09af00'
                : i === step + 1
                ? '#5c00d2'
                : i === step
                ? colorMap(score)
                : i < step
                ? '#09af00'
                : '#aaa',
            }} />
          </div>
          {i !== steps.length - 1 &&
            <div
              style={{
                flexGrow: 1,
                height: 4,
                top: -2,
                position: 'relative',
                opacity: i <= step ? 1 : 0,
              }}
            >
              <div style={{
                width: i === step ? (score * 100) + '%' : '100%',
                height: '100%',
                background: i === step ? colorMap(score) : '#09af00'
              }}>
                {i === step && <div style={{
                  animation: 'expandWidth 0.8s linear infinite',
                  width: '100%',
                  height: '100%',
                  background: 'white',
                  opacity: 0.4
                }} />}
              </div>
            </div>
          }
        </Fragment>
      ))}
    </div>
  );
}

function Code({ nextStep, source }) {
  source = source.split('\n').map(s => s.trim()).join('\n');
  let content = [];
  let segments = new Map();
  if (nextStep < steps.length) {
    let matches = steps[nextStep].matches;
    matches.forEach(([substr, skip]) => {
      let idx = -1;
      let rest = source;
      for (let i = 0; i < skip + 1; i++) {
        idx = rest.indexOf(substr);
        rest = source.substr(idx);
      }
      segments.set(idx, substr.length);
    });
  }
  for (let i = 0; i < source.length; i++) {
    if (segments.has(i)) {
      const len = segments.get(i);
      content.push(
        <span
          key={i}
          style={{
            display: 'inline-block',
            color: 'white',
            backgroundColor: '#5c00d2'
          }}
        >
          {source.substr(i, len)}
        </span>
      );
      i += len-1;
    } else {
      content.push(source[i]);
    }
  }
  return (
    <pre style={{
      fontSize: '30px',
      margin: 0,
    }}>
      {content}
    </pre>
  );
}

function Canvas({ model, updateModel, undo, saveUndoState, reset }) {
  const ref = useRef();
  const [measurements, setMeasurements] = useState(null);
  let measurers = useRef({});
  let connectedEdges = {};
  let {activeEdge} = model;

  useLayoutEffect(() => {
    if (measurements) {
      return;
    }
    let ownRect = ref.current.getBoundingClientRect();
    let m = {};
    for (let [id, getRect] of Object.entries(measurers.current)) {
      let rect = getRect();
      m[id] = {
        left: rect.left - ownRect.left,
        top: rect.top - ownRect.top,
        width: rect.width,
        height: rect.height,
      };
    }
    setMeasurements(m);
  }, [measurements]);

  let edges = [];
  if (measurements) {
    for (let edge of model.edges) {
      connectedEdges[edge.from] = true;
      const from = measurements[edge.from];
      const to = measurements[edge.to];
      edges.push(
        <Edge
          curved={true}
          from={from}
          to={to}
          key={edge.from + ' -> ' + edge.to}
        />
      );
    }
    if (activeEdge) {
      const rect = measurements[activeEdge.from];
      edges.push(
        <Edge
          curved={true}
          from={rect}
          to={{
            left: rect.left + rect.width / 2 + activeEdge.offset[0],
            top: rect.top + rect.height / 2 + activeEdge.offset[1],
            height: 0,
            width: 0,
          }}
          key="active"
        />
      );
    }
  }

  let nodes = [];
  let candidate = null;
  for (let node of model.nodes) {
    if (activeEdge && measurements && !candidate) {
      const rect = measurements[activeEdge.from];
      const point = {
        left: rect.left + rect.width / 2 + activeEdge.offset[0],
        top: rect.top + rect.height / 2 + activeEdge.offset[1],
      };
      if (measurements && activeEdge) {
        const rect = measurements[node.id];
        if (
          rect &&
          (point.left >= rect.left) &&
          (point.left <= rect.left + rect.width) &&
          (point.top >= rect.top) &&
          (point.top <= rect.top + rect.height)) {
          candidate = node.id;
        }
      }
    }

    nodes.push(
      <Node
        node={node}
        isCandidate={candidate === node.id}
        isActive={model.activeNode === node.id}
        key={node.id}
      />
    );
  }

  function setActiveNode(id) {
    updateModel(draft => {
      draft.activeNode = id;
    });
  }

  function summonPrimitive(value) {
    saveUndoState();
    setMeasurements(null);
    updateModel(draft => {
      let node = draft.nodes.find(n => n.value === value);
      if (!node) {
        let id = (typeof value) + '_' + value.toString();
        node = {
          id,
          type: 'primitive',
          value,
        };
        draft.nodes.push(node);
        draft.positions[id] = [
          250 + (Math.random() * 100),
          50 + (Math.random() * 100)
        ];
      }
      draft.activeNode = node.id;
    });
  }

  return (
    <CanvasContext.Provider value={{
      connectedEdges,
      model,
      measurers,
      measurements,
      move(id, newPos) {
        setMeasurements(null);
        updateModel(draft => {
          draft.positions[id] = newPos;
        });
      },
      updateActiveEdge(update) {
        updateModel(draft => {
          draft.activeEdge = update;
          draft.edges = draft.edges.filter(e => e.from !== update.from);
        });
      },
      commitActiveEdge() {
        saveUndoState();
        if (candidate) {
          setActiveNode(candidate);
        }
        updateModel(draft => {
          draft.activeEdge = null;
          if (candidate) {
            draft.edges.push({
              from: activeEdge.from,
              to: candidate
            });
          }
        });
      },
      discardActiveEdge() {
        saveUndoState();
        updateModel(draft => {
          draft.activeEdge = null;
        });
      },
      addSlot(id, name) {
        saveUndoState();
        setMeasurements(null);
        updateModel(draft => {
          let node = draft.nodes.find(n => n.id === id);
          if (!node.slots.includes(name)) {
            node.slots.push(name);
          }
        });
      },
      deleteSlot(slotId) {
        saveUndoState();
        setMeasurements(null);
        const [id, slot] = slotId.split('.');
        updateModel(draft => {
          let node = draft.nodes.find(n => n.id === id);
          node.slots = node.slots.filter(s => s !== slot);
          draft.edges = draft.edges.filter(n => {
            return n.from !== slotId;
          });
        });
      },
      cleanup() {
        saveUndoState();
        updateModel(draft => {
          let used = new Set();
          draft.edges.forEach(edge => {
            used.add(edge.to);
          });
          draft.nodes = draft.nodes.filter(node =>
            used.has(node.id) || node.id === 'vars'
          );
        });
      },
      reset,
      setActiveNode,
      undo,
    }}>
      <div
        ref={ref}
        style={{
          border: '2px solid black',
          position: 'relative',
          userSelect: 'none',
          background: '#fdfdfd',
          width: 600,
          height: 350,
          fontSize: '25px',
          overflow: 'hidden'
        }}
        onPointerDown={() => {
          setActiveNode(null);
        }}
      >
        <svg style={{
          position: 'absolute',
          width: '100%',
          height: '100%'
        }}>
          {edges}
        </svg>
        {nodes}
        <div style={{
          position: 'absolute',
          bottom: 20,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center'
        }}>
          <Button onClick={() => {
              const literal = prompt('Enter a number (no quotes) or a string (in double quotes):');
              let parsed;
              try {
                parsed = JSON.parse(literal);
              } catch (e) {
                return;
              }
              if (typeof parsed === 'number' || typeof parsed === 'string') {
                summonPrimitive(parsed);
              }
            }}
          >🧲 Summon</Button>
        </div>
      </div>
      <Toolbar />
    </CanvasContext.Provider>
  )
}

function Node({ node, isActive, isCandidate }) {
  switch (node.type) {
    case 'composite':
      return (
        <Composite
          node={node}
          isActive={isActive}
          isCandidate={isCandidate} />
      );
    case 'primitive':
      return (
        <Primitive
          node={node}
          isActive={isActive}
          isCandidate={isCandidate} />
      );
  }
}

function Composite({ node, isActive, isCandidate }) {
  const { model, move, setActiveNode } = useContext(CanvasContext);
  const pos = model.positions[node.id];
  const [isHover, isDragging, draggable] = useDraggable(pos, (newPos) => {
    move(node.id, newPos);
  });
  let children = [];
  for (let slot of node.slots) {
    children.push(
      <Slot name={slot} key={slot} id={node.id + '.' + slot} />
    );
  }
  return (
    <div
      onPointerDown={(e) => {
        e.stopPropagation();
        setActiveNode(node.id)
      }}
      style={{
        position: 'absolute',
        border: '1px solid black',
        background: isCandidate ? '#FFD54F' : isActive ? '#FFF9C4' : 'white',
        transform: `translate(${model.positions[node.id].map(p => p + 'px')})`
      }}
    >
      <div
        {...draggable}
        style={{
          cursor: 'move',
          touchAction: 'none',
          padding: '10px',
        }}
      >
        {node.label}
      </div>
      {children}
      <AddSlot id={node.id} />
    </div>
  );
}

function Slot({ name, id }) {
  const handleRef = useRef();
  const [isHover, setIsHover] = useState(false);
  useConnectable(handleRef, id);
  const {
    connectedEdges,
    updateActiveEdge,
    discardActiveEdge,
    commitActiveEdge,
    deleteSlot,
  } = useContext(CanvasContext);
  const [isHandleHover, isDragging, draggable] = useDraggable([0, 0], (newPos) => {
    updateActiveEdge({
      from: id,
      offset: newPos,
    });
  }, (confirm) => {
    if (confirm) {
      commitActiveEdge();
    } else {
      discardActiveEdge();
    }
  });
  const isOrphan = !connectedEdges[id];
  return (
    <div
      style={{
        position: 'relative',
        borderTop: '1px solid #aaa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: '20px',
          left: '-50px',
          paddingLeft: '20px'
        }}
        onPointerEnter={() => setIsHover(true)}
        onPointerLeave={() => setIsHover(false)}
      >
        <div style={{
          display: (isHover && !isHandleHover) ? 'inline-block' : 'none',
          color: '#D32F2F',
          fontSize: '40px',
          cursor: 'pointer',
          position: 'relative',
          top: -6,
        }} onClick={() => {
          deleteSlot(id);
        }}>
          ⨯
        </div>
      </div>
      <div style={{
        padding: '10px'
      }}>
        {name}
      </div>
      <div onPointerDown={(e) => {
        e.stopPropagation();
      }}>
        <div
          {...draggable}
          ref={handleRef}
          style={{
            touchAction: 'none',
            display: 'inline-block',
            background: (isDragging || isHandleHover)
              ? '#FFD54F'
              : (isOrphan ? '#BDBDBD' : '#444'),
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            margin: '-10px',
            position: 'relative',
            top: '-10px',
            cursor: isHandleHover ? 'move': '',
            transform: isHandleHover ? 'scale(1.3)' : '',
            transition: 'transform 0.1s cubic-bezier(0.68, -0.6, 0.32, 1.6)'
          }}
        />
      </div>
    </div>
  );
}

const naiveIdentifierRegex = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/;

function AddSlot({ id }) {
  const { addSlot } = useContext(CanvasContext);
  return (
    <div style={{
      borderTop: '1px solid #aaa',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div style={{
        padding: '10px 20px 10px 10px',
      }}>
        <Button onClick={() => {
          const name = prompt('Enter variable name:');
          if (typeof name === 'string' && naiveIdentifierRegex.test(name)) {
            addSlot(id, name);
          }
        }}>📝 Declare</Button>
      </div>
    </div>
  );
}

function Primitive({ node, isActive, isCandidate }) {
  const handleRef = useRef();
  const { model, move, setActiveNode } = useContext(CanvasContext);
  const pos = model.positions[node.id];
  const [isHover, isDragging, draggable] = useDraggable(pos, (newPos) => {
    move(node.id, newPos);
  });
  useConnectable(handleRef, node.id);
  return (
    <div onPointerDown={(e) => {
      e.stopPropagation();
      setActiveNode(node.id)}
    }>
      <div
        {...draggable}
        ref={handleRef}
        style={{
          cursor: 'move',
          touchAction: 'none',
          position: 'absolute',
          borderRadius: '50%',
          padding: '20px',
          transform: `translate(${model.positions[node.id].map(p => p + 'px')})`,
        }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: isCandidate ? '#FFD54F' : isActive ? '#FFF9C4' : 'white',
          fontWeight: 'bold',
          border: '2px solid black',
          borderRadius: '50%',
          padding: '30px 24px',
          height: '50px',
        }}>
          {JSON.stringify(node.value)}
        </div>
      </div>
    </div>
  );
}

function useDraggable(pos, onMove, onRest) {
  const [offset, setOffset] = useState(null);
  const [isHover, setIsHover] = useState(false);
  return [isHover, offset !== null, {
    onPointerDown: e => {
      setOffset([pos[0] - e.pageX, pos[1] - e.pageY]);
      e.target.setPointerCapture(e.pointerId);
    },
    onPointerUp: e => {
      setOffset(null);
      onRest?.(true);
    },
    onPointerCancel: e => {
      setOffset(null);
      onRest?.(false);
    },
    onPointerMove: e => {
      setIsHover(true);
      if (offset) {
        onMove([
          e.pageX + offset[0],
          e.pageY + offset[1]
        ]);
      }
    },
    onPointerEnter: () => {
      setIsHover(true);
    },
    onPointerLeave: () => {
      setIsHover(false);
    },
  }];
}

function useConnectable(ref, id) {
  const { measurers } = useContext(CanvasContext);
  useLayoutEffect(() => {
    measurers.current[id] = () => {
      return ref.current.getBoundingClientRect();
    };
    return () => {
      delete measurers.current[id];
    }
  }, [measurers]);
}

function Edge({ from, to, curved }) {
  function curvedHorizontal(x1, y1, x2, y2) {
    var line = []
    var mx = x1 + (x2 - x1) / 2;
    line.push('M', x1, y1);
    if (curved) {
      line.push('C', mx, y1, mx, y2, x2, y2);
    } else {
      line.push('L', x2, y2);
    }
    return line.join(' ');
  }

  return (
    <path d={curvedHorizontal(
      from.left + from.width / 2,
      from.top + from.height / 2,
      to.left + to.width / 2,
      to.top + to.height / 2,
    )} stroke="black" fill="none" />
  );
}

function Toolbar() {
  const { cleanup, undo, reset } = useContext(CanvasContext);
  return (
    <div style={{
      width: 600,
      marginTop: 40,
      display: 'flex',
      justifyContent: 'space-between',
    }}>
      <Button onClick={() => {
        reset();
      }}>⏮ Reset to Checkpoint</Button>
      <Button onClick={() => {
        undo();
      }}>↩️ Undo</Button>
      <Button onClick={() => {
        cleanup();
      }}>🗑 Clean Unused</Button>
    </div>
  )
}

function Button({ children, ...rest }) {
  return (
    <button {...rest} style={{
      fontSize: '20px',
    }}>
      {children}
    </button>
  )
}
