function codeSolve(inputNumbers: Array<number>, commands: Array<number>) {
  const output: Array<number> = [];
  let relativeBase: number = 0;
  for (let i = 0; i < commands.length; i += 1) {
    const command: Array<string> = String(commands[i]).split('');
    const code: number = Number(command.slice(command.length - 2).join(''));
    const numModes: [number, number, number] = [0, 0, 0];
    let nums: [number, number, number] = [0, 0, 0];
    numModes[0] = Number(command.slice(command.length - 3, command.length - 2).join('') || '0');
    numModes[1] = Number(command.slice(command.length - 4, command.length - 3).join('') || '0');
    numModes[2] = Number(command.slice(command.length - 5, command.length - 4).join('') || '0');
    // 0 - position, 1 - value, 2 - relative
    nums[0] = numModes[0] === 0 ? commands[commands[i + 1]] 
                                : numModes[0] === 1 ? commands[i + 1]
                                                    : commands[commands[i + 1] + relativeBase];
    nums[1] = numModes[1] === 0 ? commands[commands[i + 2]] 
                                : numModes[1] === 1 ? commands[i + 2]
                                                    : commands[commands[i + 2] + relativeBase];
    nums[2] = numModes[2] === 0 ? commands[i + 3] 
                                : numModes[2] === 1 ? i + 3
                                                    : commands[i + 3] + relativeBase;
    nums.forEach((num, index) => nums[index] = num ? num : 0);
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
        if (numModes[0] === 0) {
          commands[commands[i + 1]] = inputNumbers.shift() as number;
        } else if (numModes[0] === 2) {
          commands[commands[i + 1] + relativeBase] = inputNumbers.shift() as number;
        } else {
          console.error('wrong mode');
        }
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
        i += 3;
        break;
      //first equals second
      case 8:
        commands[nums[2]] = nums[0] === nums[1] ? 1 : 0;
        i += 3;
        break;
      //change relativeBase
      case 9:
        relativeBase += nums[0];
        i += 1;
        break;
      //end commands
      case 99:
        return output;
    }
  }
  return output;
}

const inputNumbers: Array<number> = [];
const commands: Array<number> = [];
codeSolve(inputNumbers, commands);
