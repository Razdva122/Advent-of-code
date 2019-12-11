function codeSolve(stateCurrent, output) {
  let relativeCounter = stateCurrent.relativeCounter;
  const input = stateCurrent.commands;
  const inputNumbers = stateCurrent.input;
  for (let i = stateCurrent.positon; i < input.length; i += 1) {
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
        nums[1] = input[input[i + 2]] || 0;
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
      if (inputNumbers.length === 0) {
        stateCurrent.positon = i;
        stateCurrent.relativeCounter = relativeCounter;
        return;
      }
      if (firstNumMode === 0) {
        input[input[i + 1]] = inputNumbers.shift();
      } else {
        input[input[i + 1] + relativeCounter] = inputNumbers.shift();
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
      stateCurrent.positon = i;
      stateCurrent.isRun = false;
      return;
    }
  }
}

function robotDraw(startCode, input) {
  const programState = {
    isRun: true,
    positon: 0,
    input: [startCode],
    commands: [...input],
    relativeCounter: 0,
  };
  const output = [];
  let counter = 0;
  const memoryDraws = {};
  const directions = {
    up: {
      move: [-1, 0],
      left: 'left',
      right: 'right',
    },
    down: {
      move: [1, 0],
      left: 'right',
      right: 'left',
    },
    left: {
      move: [0, -1],
      left: 'down',
      right: 'up',
    },
    right: {
      move: [0, 1],
      left: 'up',
      right: 'down',
    },
  };
  const currentStateRobot = {
    position: [0, 0],
    direction: 'up',
  };
  while (programState.isRun || output.length > 0) {
    codeSolve(programState, output);
    const [draw, dir] = output.splice(0, 2);

    if (memoryDraws[currentStateRobot.position.join()] !== undefined) {
      memoryDraws[currentStateRobot.position.join()] = draw;
    } else {
      counter += 1;
      memoryDraws[currentStateRobot.position.join()] = draw;
    }

    if (dir === 0) {
      currentStateRobot.direction = directions[currentStateRobot.direction].left;
    } else {
      currentStateRobot.direction = directions[currentStateRobot.direction].right;
    }
    currentStateRobot.position[0] += directions[currentStateRobot.direction].move[0];
    currentStateRobot.position[1] += directions[currentStateRobot.direction].move[1];

    if (memoryDraws[currentStateRobot.position.join()] !== undefined) {
      programState.input.push(memoryDraws[currentStateRobot.position.join()]);
    } else {
      programState.input.push(0);
    }
  }
  return [memoryDraws, counter];
}

robotDraw(0, ['input here']);