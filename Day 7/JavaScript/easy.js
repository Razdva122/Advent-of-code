function codeSolve(inputNumbers, input) {
  let output;
  for (let i = 0; i < input.length; i += 1) {
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
      input[input[i + 1]] = inputNumbers.shift();
      i += 1;
    } else if (code === 4) {
      output = input[input[i + 1]];
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
      return output;
    }
  }
}


const variants = (function createAllVariants(maxNum, acc = [], result = []){
	if (acc.length === maxNum + 1) {
		result.push(acc);
		return;
	} else {
		for (let i = 0; i <= maxNum; i += 1) {
			if(!acc.includes(i)) {
				const copyAcc = [...acc];
				copyAcc.push(i);
				createAllVariants(maxNum, copyAcc, result);
			}
		}
	}
	return result;
})(4);

const results = variants.reduce((acc, randomInput) => {
	const startInput = ['Input here'];
  const program1 = codeSolve([randomInput[0],0], [...startInput]);
	const program2 = codeSolve([randomInput[1],program1], [...startInput]);
	const program3 = codeSolve([randomInput[2],program2], [...startInput]);
	const program4 = codeSolve([randomInput[3],program3], [...startInput]);
	const program5 = codeSolve([randomInput[4],program4], [...startInput]);
	acc.push(program5);
	return acc;
},[])

console.log(Math.max(...results));