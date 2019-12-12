function codeSolve(inputNumber, input) {
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
      input[input[i + 1]] = inputNumber;
      i += 1;
    } else if (code === 4) {
      output.push(input[input[i + 1]]);
      i += 1;
    } else if (code === 99) {
      return input;
    }
  }
}

const output = [];
codeSolve([]);
