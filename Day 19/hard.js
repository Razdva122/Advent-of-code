function codeSolve(inputNumbers, input) {
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

const input = [109,424,203,1,21101,11,0,0,1106,0,282,21102,1,18,0,1105,1,259,1202,1,1,221,203,1,21101,0,31,0,1105,1,282,21102,38,1,0,1106,0,259,21002,23,1,2,21202,1,1,3,21102,1,1,1,21102,57,1,0,1106,0,303,1202,1,1,222,20102,1,221,3,20102,1,221,2,21102,259,1,1,21102,80,1,0,1105,1,225,21101,0,145,2,21102,91,1,0,1105,1,303,2101,0,1,223,20101,0,222,4,21102,259,1,3,21101,225,0,2,21102,1,225,1,21102,1,118,0,1105,1,225,20101,0,222,3,21101,0,197,2,21101,133,0,0,1106,0,303,21202,1,-1,1,22001,223,1,1,21101,0,148,0,1105,1,259,1202,1,1,223,21001,221,0,4,21001,222,0,3,21102,1,19,2,1001,132,-2,224,1002,224,2,224,1001,224,3,224,1002,132,-1,132,1,224,132,224,21001,224,1,1,21102,195,1,0,105,1,109,20207,1,223,2,21002,23,1,1,21102,-1,1,3,21101,0,214,0,1105,1,303,22101,1,1,1,204,1,99,0,0,0,0,109,5,1201,-4,0,249,22101,0,-3,1,22101,0,-2,2,21202,-1,1,3,21102,250,1,0,1106,0,225,22101,0,1,-4,109,-5,2105,1,0,109,3,22107,0,-2,-1,21202,-1,2,-1,21201,-1,-1,-1,22202,-1,-2,-2,109,-3,2106,0,0,109,3,21207,-2,0,-1,1206,-1,294,104,0,99,22102,1,-2,-2,109,-3,2105,1,0,109,5,22207,-3,-4,-1,1206,-1,346,22201,-4,-3,-4,21202,-3,-1,-1,22201,-4,-1,2,21202,2,-1,-1,22201,-4,-1,1,21201,-2,0,3,21101,343,0,0,1105,1,303,1105,1,415,22207,-2,-3,-1,1206,-1,387,22201,-3,-2,-3,21202,-2,-1,-1,22201,-3,-1,3,21202,3,-1,-1,22201,-3,-1,2,22101,0,-4,1,21102,384,1,0,1106,0,303,1106,0,415,21202,-4,-1,-4,22201,-4,-3,-4,22202,-3,-2,-2,22202,-2,-4,-4,22202,-3,-2,-3,21202,-4,-1,-2,22201,-3,-2,1,22102,1,1,-4,109,-5,2105,1,0];

const patterns = [[15, 13], [20, 17], [21, 18]];

let counter = 1;
let pos = [0, 0];
while (counter !== 100) {
  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleCoord = [pos[0] + pattern[0], pos[1] + pattern[1]];
    const size = counter + 1;
    const right = [];
    const down = [];
    for (let k = 1; k < size; k += 1) {
      right.push([possibleCoord[0], possibleCoord[1] + k]);
      down.push([possibleCoord[0] + k, possibleCoord[1]]);
    }
    const rightBoolean = right.every((coords) => Number(codeSolve([coords[0],coords[1]], [...input])) === 1);
    const downBoolean = down.every((coords) => Number(codeSolve([coords[0],coords[1]], [...input])) === 1);
    if (rightBoolean && downBoolean) {
      pos = possibleCoord;
      counter += 1;
      break;
    }
  }
}

console.log(pos[0] * 10000 + pos[1]);

/*
i: 0, j: 0, counter: 1
i: 21, j: 18, counter: 2  [21, 18]
i: 41, j: 35, counter: 3  [20, 17]
i: 61, j: 52, counter: 4  [20, 17]
i: 81, j: 69, counter: 5  [20, 17]
i: 96, j: 82, counter: 6  [15, 13]
i: 116, j: 99, counter: 7 [20, 17]
i: 136, j: 116, counter: 8 [20, 17]
i: 151, j: 129, counter: 9 [15, 13]
i: 171, j: 146, counter: 10 [20, 17]
i: 192, j: 164, counter: 11 [21, 18]
i: 212, j: 181, counter: 12 [20, 17]
i: 227, j: 194, counter: 13 [15, 13]
i: 247, j: 211, counter: 14 [20, 17]
i: 267, j: 228, counter: 15 [20, 17]
*/
