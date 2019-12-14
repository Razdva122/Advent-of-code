function codeSolve(inputNumbers: Array<number>, commands: Array<number>) {
  const output: Array<number> = [];
  for (let i = 0; i < commands.length; i += 1) {
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
        return output;
    }
  }
  return output;
}

type combinationOfAmp = Array<number>;

const combinations: Array<combinationOfAmp> = (function createAllVariants(maxNum, acc: Array<number> = [], result: Array<combinationOfAmp> = []){
  if (acc.length === maxNum + 1) {
    result.push(acc);
    return result;
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

const maxRes = combinations.reduce((curMaxRes, combination) => {
  const commands: Array<number> = [];
  const currentRes = combination.reduce((result, num) =>{
    result = codeSolve([num, result], [...commands])[0];
    return result;
  }, 0);
  return Math.max(curMaxRes, currentRes);
}, 0);
console.log(maxRes);

