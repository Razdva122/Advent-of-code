function codeSolve(state) {
  const inputNumbers = state.input;
  let relativeCounter = state.relativeCounter;
  const output = [];
  const input = state.commands;
  for (let i = state.position; i < input.length; i += 1) {
    const command = String(input[i]).split('');
    console.log(command)
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
      if (firstNumMode === 0) {
        input[input[i + 1]] = inputNumbers.shift();
      } else {
        input[input[i + 1] + relativeCounter] = inputNumbers.shift();
      }
      i += 1;
    } else if (code === 4) {
      output.push(nums[0]);
      state.position = i + 2;
      state.relativeCounter = relativeCounter;
      return output;
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


const input = [3,1033,1008,1033,1,1032,1005,1032,31,1008,1033,2,1032,1005,1032,58,1008,1033,3,1032,1005,1032,81,1008,1033,4,1032,1005,1032,104,99,1002,1034,1,1039,1002,1036,1,1041,1001,1035,-1,1040,1008,1038,0,1043,102,-1,1043,1032,1,1037,1032,1042,1105,1,124,1001,1034,0,1039,101,0,1036,1041,1001,1035,1,1040,1008,1038,0,1043,1,1037,1038,1042,1105,1,124,1001,1034,-1,1039,1008,1036,0,1041,101,0,1035,1040,1001,1038,0,1043,101,0,1037,1042,1105,1,124,1001,1034,1,1039,1008,1036,0,1041,1001,1035,0,1040,1002,1038,1,1043,1001,1037,0,1042,1006,1039,217,1006,1040,217,1008,1039,40,1032,1005,1032,217,1008,1040,40,1032,1005,1032,217,1008,1039,37,1032,1006,1032,165,1008,1040,39,1032,1006,1032,165,1102,2,1,1044,1105,1,224,2,1041,1043,1032,1006,1032,179,1101,0,1,1044,1106,0,224,1,1041,1043,1032,1006,1032,217,1,1042,1043,1032,1001,1032,-1,1032,1002,1032,39,1032,1,1032,1039,1032,101,-1,1032,1032,101,252,1032,211,1007,0,37,1044,1106,0,224,1102,0,1,1044,1105,1,224,1006,1044,247,1002,1039,1,1034,1001,1040,0,1035,1002,1041,1,1036,102,1,1043,1038,1002,1042,1,1037,4,1044,1105,1,0,2,32,78,22,32,29,53,14,61,46,21,16,34,19,73,25,76,17,97,20,4,63,23,46,15,13,75,30,58,28,29,82,23,32,11,22,16,82,2,57,24,31,48,51,4,52,25,92,15,78,78,55,32,46,5,31,88,21,74,29,47,89,34,80,58,14,33,4,69,74,33,70,60,7,39,29,68,12,1,11,64,17,75,4,52,11,47,24,71,23,99,83,28,17,56,94,33,8,90,9,83,7,62,15,77,45,49,5,53,36,67,18,82,93,22,53,9,20,20,60,90,22,25,48,15,27,68,12,27,13,50,25,92,73,35,81,15,1,48,22,12,35,38,1,36,44,12,82,30,92,22,71,31,39,20,43,34,46,36,24,67,72,13,85,45,18,68,64,20,40,2,67,25,15,33,40,53,48,32,59,13,57,28,61,26,15,88,21,42,15,95,34,74,32,7,82,63,22,95,22,83,22,20,25,11,81,88,94,31,9,50,26,76,78,34,88,19,68,72,7,85,14,54,80,5,5,45,24,24,91,22,34,39,32,22,11,15,87,57,35,83,86,51,23,71,29,13,23,59,51,36,46,33,27,99,4,13,59,14,55,88,89,29,22,97,46,40,2,17,48,93,9,40,35,94,6,71,34,14,2,39,29,36,5,55,72,31,22,87,4,50,27,92,36,88,20,82,79,21,35,67,57,23,48,6,15,65,10,69,12,29,3,8,51,56,90,29,88,59,28,40,89,18,93,83,2,66,46,22,50,30,86,3,49,55,22,33,97,27,51,15,7,26,57,36,98,3,64,35,84,90,16,88,3,7,98,94,13,1,13,71,88,36,17,84,29,5,57,50,84,14,47,25,85,64,31,95,8,43,10,81,36,58,3,40,24,40,20,13,5,14,50,42,23,9,74,40,92,4,10,3,60,1,91,39,27,77,9,20,42,47,35,15,90,43,21,46,30,63,85,28,93,6,82,8,86,86,88,30,33,26,8,92,58,32,20,1,40,72,79,49,68,14,73,6,2,99,9,5,12,47,43,14,29,66,8,31,12,97,8,69,32,63,31,96,23,32,24,60,69,74,15,24,6,76,39,14,33,89,36,6,63,21,10,95,95,32,45,41,8,76,82,14,78,15,79,72,71,34,39,27,56,27,48,28,94,21,30,25,27,53,1,81,26,24,80,55,27,51,2,93,15,80,12,28,36,56,3,7,77,34,90,49,44,24,35,99,63,11,88,93,28,75,21,62,57,8,44,10,57,9,61,4,43,3,21,20,41,95,13,6,98,16,93,70,98,64,27,35,49,12,18,23,17,68,5,11,13,61,79,30,87,53,11,11,26,80,23,55,92,46,31,70,13,76,87,29,6,91,19,90,88,36,39,25,99,12,87,90,1,93,12,98,28,27,44,51,18,32,80,86,1,26,1,19,99,83,18,2,58,29,68,3,77,82,6,55,63,56,2,61,4,90,21,22,71,30,36,51,64,32,44,52,9,51,80,93,9,71,20,41,98,21,12,61,80,10,80,33,92,80,78,8,29,9,70,4,76,24,13,92,5,26,80,88,72,3,3,49,73,27,98,15,46,30,73,17,94,30,78,5,75,16,2,57,3,96,15,47,36,31,53,39,34,44,26,96,41,68,9,81,20,40,25,76,55,9,67,3,28,18,63,1,31,31,87,22,20,67,10,2,77,20,74,28,79,34,52,91,51,24,47,13,58,9,61,10,77,25,72,17,45,8,51,16,72,3,69,80,79,6,53,48,83,34,63,86,42,19,42,0,0,21,21,1,10,1,0,0,0,0,0,0];
const map = new Array(200).fill(' ').map(item => new Array(200).fill(' '));
const curPos = [100, 100];
const movements = [[1, 0], [0, 1], [-1, 0], [0, -1]];
const findExit = false;

function ProgramState(relativeCounter, position, input, commands) {
  this.relativeCounter = relativeCounter;
  this.position = position;
  this.input = input;
  this.commands = commands;
}

/*
    
    #
   XS#
   ##

 */

function createMap(curPos, programStateIn) {
  if (findExit) {
    return;
  }
  for (let i = 0; i < movements.length; i += 1) {
    const newPos = [curPos[0] + movements[i][0], curPos[1] + movements[i][1]];
    if (map[newPos[0]][newPos[1]] === ' ') {
      console.log(newPos[0], newPos[1]);
      const state = new ProgramState(programStateIn.relativeCounter, programStateIn.position, [i + 1], [...programStateIn.commands]);
      const el = codeSolve(state)[0];
      if (el !== 0) {
        if (el === 2) {
          map[newPos[0]][newPos[1]] = 'O';
          findExit = true;
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
