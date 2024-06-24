export const convertToSmcat = (states, relations, curState) => {
  let smcatString = '';

  // 상태 정의
  states.forEach((state, index) => {
    smcatString += `${state}`;
    if (curState === state) {
      smcatString += ' [color="red" active]';
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

  return smcatString;
};
