import React, { useState } from 'react';
import './App.css';

import StateDiagram from './components/StateDiagram.jsx';
import Table from './components/Table.jsx';

function App() {
  const [states, setStates] = useState(['A', 'B', 'C', 'D']);
  const [relations, setRelations] = useState({ A: ['B'], B: ['A'], C: ['A', 'B', 'C'], D: ['A', 'C', 'B'] });
  const [curState, setCurState] = useState('B');

  return (
    <div>
      <Table states={states} relations={relations} />
      <StateDiagram states={states} relations={relations} curState={curState} />
    </div>
  );
}

export default App;
