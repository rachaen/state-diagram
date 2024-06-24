import React, { useEffect, useState } from 'react';
import smcat from 'state-machine-cat';

export default function StateDiagram({ states, relations, curState }) {
  const [diagram, setDiagram] = useState('');

  useEffect(() => {
    // 상태 다이어그램을 생성하는 함수
    const generateDiagram = () => {
      let smcatString = '';

      // 상태 정의
      states.forEach((state, index) => {
        smcatString += `${state}`;
        if (curState === state) {
          smcatString += '\t[color="red"]';
        }

        if (index === states.length - 1) {
          smcatString += ';\n';
        } else {
          smcatString += ',\n';
        }
      });

      // 전환 정의
      Object.keys(relations).forEach((state) => {
        relations[state].forEach((target) => {
          smcatString += `${state} => ${target};\n`;
        });
      });

      // 상태 다이어그램 생성
      try {
        const diagram = smcat.render(smcatString, { outputType: 'svg', direction: 'left-right' });
        const json = smcat.render(smcatString, { outputType: 'json', direction: 'left-right' });
        console.log(json);
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
