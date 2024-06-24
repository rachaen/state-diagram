import React, { useEffect, useState } from 'react';
import smcat from 'state-machine-cat';

export default function Table() {
  const [states, setStates] = useState(['A', 'B', 'C', 'D']);
  const [relations, setRelations] = useState({ A: ['B'], B: ['A'], C: ['A', 'B', 'C'], D: ['A', 'C', 'B'] });
  const [diagram, setDiagram] = useState('');
  const [curState, setCurState] = useState('A');

  useEffect(() => {
    // 상태 다이어그램을 생성하는 함수
    const generateDiagram = () => {
      let smcatString = '';
      // 상태 정의
      states.forEach((state, index) => {
        smcatString += `${state}`;
        if (curState == state) {
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
        const diagram = smcat.render(smcatString);
        setDiagram(diagram);
      } catch (error) {
        console.log(smcatString);
        console.error('Error generating diagram:', error);
      }
    };

    generateDiagram();
  }, [states, relations]);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>State</th>
            {states.map((_, index) => (
              <th key={index}>Relation {index + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {states.map((state, index) => (
            <tr key={index}>
              <td>{state}</td>
              {relations[state].map((relation, relIndex) => (
                <td key={relIndex}>{relation}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
