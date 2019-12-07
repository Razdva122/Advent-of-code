function codeSolve(stateCurrent, stateNext) {
  // WTF input = commands , inputNumbers = input; 
  const input = stateCurrent.commands;
  const inputNumbers = stateCurrent.input;
  for (let i = stateCurrent.positon; i < input.length; i += 1) {
    const command = String(input[i]).split('');
    const code = Number(command.slice(command.length - 2).join(''));
    const firstNumMode = Number(command.slice(command.length - 3, command.length - 2).join('') || '0');
    const secondNumMode = Number(command.slice(command.length - 4, command.length - 3).join('') || '0');
    const thirdNumMode = Number(command.slice(command.length - 5, command.length - 4).join('') || '0');
    const firstNum = firstNumMode === 0 ? input[input[i + 1]] : input[i + 1];
    const secondNum = secondNumMode === 0 ? input[input[i + 2]] : input[i + 2];
    const thirdNum = thirdNumMode === 0 ? input[i + 3] : i + 3;
    if (code === 1) {
      input[thirdNum] = firstNum + secondNum;
      i += 3;
    } else if (code === 2) {
      input[thirdNum] = firstNum * secondNum;
      i += 3;
    } else if (code === 3) {
      if (inputNumbers.length === 0) {
        stateCurrent.positon = i;
        return;
      }
      input[input[i + 1]] = inputNumbers.shift();
      i += 1;
    } else if (code === 4) {
      stateNext.input.push(input[input[i + 1]]);
      i += 1;
    } else if (code === 5) {
      if (firstNum !== 0) {
        i = secondNum - 1;
      } else {
        i += 2;
      }
    } else if (code === 6) {
      if (firstNum === 0) {
        i = secondNum - 1;
      } else {
        i += 2;
      }
    } else if (code === 7) {
      if (firstNum < secondNum) {
        input[thirdNum] = 1;
      } else {
        input[thirdNum] = 0;
      }
      i += 3;
    } else if (code === 8) {
      if (firstNum === secondNum) {
        input[thirdNum] = 1;
      } else {
        input[thirdNum] = 0;
      }
      i += 3;
    } else if (code === 99) {
      stateCurrent.isRun = false;
      return;
    }
  }
}


const variants = (function createAllVariants(minNum, maxNum, acc = [], result = []){
	if (acc.length === maxNum - minNum + 1) {
		result.push(acc);
		return;
	} else {
		for (let i = minNum; i <= maxNum; i += 1) {
			if(!acc.includes(i)) {
				const copyAcc = [...acc];
				copyAcc.push(i);
				createAllVariants(minNum ,maxNum, copyAcc, result);
			}
		}
	}
	return result;
})(5,9);

const results = variants.reduce((acc, randomInput) => {
  const startInput = ['Input should be here'];
  //state of 5 running programs;
  const state = [];
  for (let i = 0; i < 5; i += 1) {
    const programState = {
      isRun: true,
      positon: 0,
      input: [randomInput[i]],
      commands: [...startInput]
    }
    state.push(programState);
  }
  state.currentProgram = 0;
  state.nextProgram = 1;
  state[0].input.push(0);

  //if program №5 finished return result;
  while (state[4].isRun) {
    codeSolve(state[state.currentProgram], state[state.nextProgram]);
    state.currentProgram = state.nextProgram;
    state.nextProgram += 1;
    state.nextProgram = state.nextProgram > 4 ? 0 : state.nextProgram;
  }
  acc.push(state[0].input[state[0].input.length - 1]);
	return acc;
},[]);

console.log(Math.max(...results));