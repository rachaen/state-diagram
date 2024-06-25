import React, { useEffect, useState } from 'react';

export default function Table({ states, relations }) {
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
