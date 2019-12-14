const commands: Array<number> = [];

interface IProgramState {
  isRun: boolean,
  position: number,
  input: Array<number>,
  commands: Array<number>,
  output: Array<number>,
}

class Program {
  state: IProgramState = {
    isRun: true,
    position: 0,
    input: [],
    commands: [...commands],
    output: [],
  }
  runProgram() {
    codeSolve(this.state);
  }
}


function codeSolve(programState: IProgramState) {
  const output = programState.output;
  const commands = programState.commands;
  const inputNumbers = programState.input;
  for (let i = programState.position; i < commands.length; i += 1) {
    const command: Array<string> = String(commands[i]).split('');
    const code: number = Number(command.slice(command.length - 2).join(''));
    const numModes: [number, number, number] = [0, 0, 0];
    const nums: [number, number, number] = [0, 0, 0];
    numModes[0] = Number(command.slice(command.length - 3, command.length - 2).join('') || '0');
    numModes[1] = Number(command.slice(command.length - 4, command.length - 3).join('') || '0');
    numModes[2] = Number(command.slice(command.length - 5, command.length - 4).join('') || '0');
    nums[0] = numModes[0] === 0 ? commands[commands[i + 1]] : commands[i + 1];
    nums[1] = numModes[1] === 0 ? commands[commands[i + 2]] : commands[i + 2];
    nums[2] = numModes[2] === 0 ? commands[i + 3] : i + 3;
    switch (code) {
      //sum
      case 1:
        commands[nums[2]] = nums[0] + nums[1];
        i += 3;
        break;
      //multiply
      case 2:
        commands[nums[2]] = nums[0] * nums[1];
        i += 3;
        break;
      //get input
      case 3:
        if (inputNumbers.length === 0) {
          programState.position = i;
          return;
        }
        commands[commands[i + 1]] = inputNumbers.shift() as number;
        i += 1;
        break;
      //write output
      case 4:
        output.push(nums[0]);
        i += 1;
        break;
      //jump if true
      case 5:
        i = nums[0] ? nums[1] - 1 : i + 2;
        break;
      //jump if false
      case 6:
        i = nums[0] === 0 ? nums[1] - 1 : i + 2;
        break;
      //first less than second
      case 7:
        commands[nums[2]] = nums[0] < nums[1] ? 1 : 0;
        break;
      //first equals second
      case 8:
        commands[nums[2]] = nums[0] === nums[1] ? 1 : 0;
        break;
      //end commands
      case 99:
        programState.position = i;
        programState.isRun = false;
        return output;
    }
  }
  return output;
}

type combinationOfAmp = Array<number>;

const combinations: Array<combinationOfAmp> = (function createAllVariants(minNum, maxNum, acc: Array<number> = [], result: Array<combinationOfAmp> = []){
  if (acc.length === maxNum - minNum + 1) {
    result.push(acc);
    return result;
  } else {
    for (let i = minNum; i <= maxNum; i += 1) {
      if(!acc.includes(i)) {
        const copyAcc = [...acc];
        copyAcc.push(i);
        createAllVariants(minNum, maxNum, copyAcc, result);
      }
    }
  }
  return result;
})(5, 9);

const maxRes = combinations.reduce((curMaxRes, combination) => {
  const amplifiers: Array<Program> = [];
  for (let i = 0; i < 5; i += 1) {
    amplifiers.push(new Program);
    if (i !== 0) {
      amplifiers[i].state.input = amplifiers[i - 1].state.output;
    }
  }
  amplifiers[0].state.input = amplifiers[4].state.output;
  combination.forEach((phase, index) => {
    amplifiers[index].state.input.push(phase);
  })
  amplifiers[0].state.input.push(0);

  let pointer = 0;

  while (amplifiers[4].state.isRun) {
    amplifiers[pointer].runProgram();
    pointer = pointer === 4 ? 0 : pointer + 1;
  }
  const currentRes = amplifiers[4].state.output.pop() as number;  
  return Math.max(curMaxRes, currentRes);
}, 0);
console.log(maxRes);