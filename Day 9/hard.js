function codeSolve(inputNumber, input) {
  let relativeCounter = 0;
  const output = [];
  for (let i = 0; i < input.length; i += 1) {
    const command = String(input[i]).split('');
    const code = Number(command.slice(command.length - 2).join(''));
    const nums = [0, 0, 0];
    const firstNumMode = Number(command.slice(command.length - 3, command.length - 2).join('') || '0');
    const secondNumMode = Number(command.slice(command.length - 4, command.length - 3).join('') || '0');
    const thirdNumMode = Number(command.slice(command.length - 5, command.length - 4).join('') || '0');

    switch(firstNumMode) {
      case 0:
        nums[0] = input[input[i + 1]] || 0; 
        break;
      case 1:
        nums[0] = input[i + 1] || 0;
        break;
      case 2:
        nums[0] = input[input[i + 1] + relativeCounter] || 0;
        break;
    }

    switch(secondNumMode) {
      case 0:
        nums[1] = input[input[i + 2] || 0] || 0;
        break;
      case 1:
        nums[1] = input[i + 2] || 0;
        break;
      case 2:
        nums[1] = input[input[i + 2] + relativeCounter] || 0;
        break;
    }

    switch(thirdNumMode) {
      case 0:
        nums[2] = input[i + 3] || 0;
        break;
      case 1:
        nums[2] = i + 3;
        break;
      case 2:
        nums[2] = input[i + 3] + relativeCounter;
        break;
    }

    if (code === 1) {
      input[nums[2]] = nums[0] + nums[1];
      i += 3;
    } else if (code === 2) {
      input[nums[2]] = nums[0] * nums[1];
      i += 3;
    } else if (code === 3) {
      if (firstNumMode === 0) {
        input[input[i + 1]] = inputNumber;
      } else {
        input[input[i + 1] + relativeCounter] = inputNumber;
      }
      i += 1;
    } else if (code === 4) {
      output.push(nums[0]);
      i += 1;
    } else if (code === 5) {
      if (nums[0] !== 0) {
        i = nums[1] - 1;
      } else {
        i += 2;
      }
    } else if (code === 6) {
      if (nums[0] === 0) {
        i = nums[1] - 1;
      } else {
        i += 2;
      }
    } else if (code === 7) {
      if (nums[0] < nums[1]) {
        input[nums[2]] = 1;
      } else {
        input[nums[2]] = 0;
      }
      i += 3;
    } else if (code === 8) {
      if (nums[0] === nums[1]) {
        input[nums[2]] = 1;
      } else {
        input[nums[2]] = 0;
      }
      i += 3;
    } else if (code === 9) {
      relativeCounter += nums[0];
      i += 1;
    } else if (code === 99) {
      return output;
    }
  }
}

codeSolve(2, []);
