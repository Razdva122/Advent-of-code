function codeSolve(state) {
  const inputNumbers = state.input;
  let relativeCounter = state.relativeCounter;
  const output = [];
  const input = state.commands;
  for (let i = state.position; i < input.length; i += 1) {
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
        state.position = i;
        state.relativeCounter = relativeCounter;
        return output;
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
      return output;
    }
  }
}


const input = [];
const map = new Array(50).fill(' ').map(item => new Array(50).fill(' '));
const curPos = [25, 25];
const movements = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const oxyPosition = [0, 0];

function ProgramState(relativeCounter, position, input, commands) {
  this.relativeCounter = relativeCounter;
  this.position = position;
  this.input = input;
  this.commands = commands;
}

function createMap(curPos, programStateIn) {
  for (let i = 0; i < movements.length; i += 1) {
    const newPos = [curPos[0] + movements[i][0], curPos[1] + movements[i][1]];
    if (map[newPos[0]][newPos[1]] === ' ') {
      const state = new ProgramState(programStateIn.relativeCounter, programStateIn.position, [i + 1], [...programStateIn.commands]);
      const el = codeSolve(state)[0];
      if (el !== 0) {
        if (el === 2) {
          map[newPos[0]][newPos[1]] = 'O';
          oxyPosition[0] = newPos[0];
          oxyPosition[1] = newPos[1];
        } else {
          map[newPos[0]][newPos[1]] = '.';
          createMap(newPos, state);
        }
      } else {
        map[newPos[0]][newPos[1]] = '#';
      }
    }
  }
}

createMap(curPos, new ProgramState(0, 0, [], [...input]));

function fillOxy() {
  let level = -1; //we shouldnt count last cycle so it's -1
  let curLevel = [oxyPosition];
  let nextLevel = [];

  while (curLevel.length > 0) {
    level += 1;
    curLevel.forEach((position) => {
      movements.forEach((move) => {
        const newPos = [position[0] + move[0], position[1] + move[1]];
        //init Values
        if (map[newPos[0]][newPos[1]] === '.') {
          nextLevel.push([newPos[0], newPos[1]]);
          map[newPos[0]][newPos[1]] = 'O';
        }
      });
    });
    curLevel = nextLevel;
    nextLevel = [];
  }
  return level;
}

console.log(fillOxy());
