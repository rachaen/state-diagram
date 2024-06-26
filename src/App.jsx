import React, { useState } from 'react';
import './App.css';

import StateDiagram from './components/StateDiagram.jsx';
import Table from './components/Table.jsx';
import MermaidDiagram from './components/MermaidDiagram.jsx';

function App() {
  const [states, setStates] = useState(['A', 'B', 'C', 'D']);
  const [relations, setRelations] = useState({ A: ['B'], B: ['A'], C: ['A', 'B', 'C'], D: ['A', 'C', 'B'] });
  const [curState, setCurState] = useState('B');

  const diagram = `
  graph LR
    Power_on_Rst -->| | Bus_Sleep
    Bus_Sleep --> Repeat_Message
    Repeat_Message --> Normal_Operation
    Repeat_Message --> Ready_Sleep
    Normal_Operation --> Ready_Sleep
    Normal_Operation --> Repeat_Message
    Ready_Sleep --> Prepare_Bus_Sleep
    Ready_Sleep --> Repeat_Message
    Ready_Sleep --> Normal_Operation
    Prepare_Bus_Sleep --> Bus_Sleep
    Prepare_Bus_Sleep --> Repeat_Message
`;
  return (
    <div>
      <Table states={states} relations={relations} />
      <StateDiagram states={states} relations={relations} curState={curState} />
      <MermaidDiagram diagram={diagram} />
    </div>
  );
}

export default App;
