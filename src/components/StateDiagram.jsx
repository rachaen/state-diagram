import React, { useEffect, useState } from 'react';
import smcat from 'state-machine-cat';
import { convertToSmcat } from '../utils/smcatUtils';

export default function StateDiagram({ states, relations, curState }) {
  const [diagram, setDiagram] = useState('');

  useEffect(() => {
    // 상태 다이어그램을 생성하는 함수
    const generateDiagram = () => {
      const smcatString = convertToSmcat(states, relations, curState);

      // 상태 다이어그램 생성
      try {
        const diagram = smcat.render(smcatString, { outputType: 'svg', direction: 'left-right' });
        // const json = smcat.render(smcatString, { outputType: 'json', direction: 'left-right' });
        // console.log(json);
        setDiagram(diagram);
      } catch (error) {
        console.log(smcatString);
        console.error('Error generating diagram:', error);
      }
    };

    generateDiagram();
  }, [states, relations, curState]);

  return (
    <div>
      <h2>State Diagram</h2>
      <div dangerouslySetInnerHTML={{ __html: diagram }} />
    </div>
  );
}
