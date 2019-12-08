function code(commands) {
  for (let i = 0; i < commands.length; i += 1) {
    const resultPos = commands[i + 3];
    const firstNum = commands[commands[i + 1]];
    const secondNum = commands[commands[i + 2]];
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


const input = [];
input[1] = 12;
input[2] = 2;
const output = code(input);
