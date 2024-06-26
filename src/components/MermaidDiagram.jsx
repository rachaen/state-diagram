import mermaid from 'mermaid';
import React, { useEffect } from 'react';
import '../mermaidConfig';

export default function MermaidDiagram({ diagram }) {
  useEffect(() => {
    mermaid.contentLoaded();
  }, []);
  return <div className='mermaid'>{diagram}</div>;
}
