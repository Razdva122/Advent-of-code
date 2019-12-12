function code(commands: Array<number>): number | void {
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


const input: Array<number> = [];
input[1] = 12;
input[2] = 2;
const output: any = code(input);