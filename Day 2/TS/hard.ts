function code(commands: Array<number>) {
  for (let i = 0; i < commands.length; i += 1) {
    const resultPos: number = commands[i + 3];
    const firstNum: number = commands[commands[i + 1]];
    const secondNum: number = commands[commands[i + 2]];
    if (commands[i] === 1) {
      commands[resultPos] = firstNum + secondNum;
      i += 3;
    } else if (commands[i] === 2) {
      commands[resultPos] = firstNum * secondNum;
      i += 3;
    } else if (commands[i] === 99) {
      return commands[0];
    } else {
      throw Error('Wrong command');
    }
  }
}


for (let i = 0; i < 100; i += 1) {
  for (let j = 0; j < 100; j += 1) {

    const input: Array<number> = [];
    input[1] = i;
    input[2] = j;
    const output: number = code(input);

    if (output === 19690720) {
      console.log(i * 100 + j);
    }
  }
}

