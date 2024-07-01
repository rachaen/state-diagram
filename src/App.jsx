import React, { useState } from 'react';
import './App.css';

import StateDiagram from './components/StateDiagram.jsx';
import Table from './components/Table.jsx';
import MermaidDiagram from './components/MermaidDiagram.jsx';

function App() {
  const [states, setStates] = useState([
    'Power_on_Rst',
    'Bus_Sleep',
    'Repeat_Message',
    'Normal_Operation',
    'Ready_Sleep',
    'Prepare_Bus_Sleep',
  ]);
  const [relations, setRelations] = useState({
    Power_on_Rst: ['Bus_Sleep'],
    Bus_Sleep: ['Repeat_Message'],
    Repeat_Message: ['Normal_Operation', 'Ready_Sleep'],
    Normal_Operation: ['Repeat_Message', 'Ready_Sleep'],
    Ready_Sleep: ['Prepare_Bus_Sleep'],
    Prepare_Bus_Sleep: ['Bus_Sleep', 'Repeat_Message'],
  });
  const [curState, setCurState] = useState('Bus_Sleep');

  const mermaidDiagram = `
  graph LR
    Power_on_Rst((Power on Rst)):::em1 --> Bus_Sleep
    Bus_Sleep --> Repeat_Message
    Repeat_Message <--> Normal_Operation
    Repeat_Message --> Ready_Sleep
    Normal_Operation <--> Ready_Sleep
    Normal_Operation --> Repeat_Message
    Ready_Sleep --> Prepare_Bus_Sleep
    Prepare_Bus_Sleep --> Bus_Sleep
    Prepare_Bus_Sleep --> Repeat_Message
    classDef em1 font-weight:bold
`;
  return (
    <div>
      <Table states={states} relations={relations} />
      <StateDiagram states={states} relations={relations} curState={curState} />
      <MermaidDiagram diagram={mermaidDiagram} />
    </div>
  );
}

export default App;
