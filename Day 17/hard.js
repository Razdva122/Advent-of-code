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


const robotPosition = {
  x: null,
  y: null,
  direction: null,
};
const input = [];
const map = createMap(codeSolve(null, [...input]));
const moves = createListOfRobotMoves(map);
input[0] = 2;
const data = codeSolve(createInput(false, compressString(moves)), [...input]);
createMap(data);

function createMap(rawData) {
  const allFrames = [];
  const robotDirections = {
    ['^'.charCodeAt(0)] : 'top',
    ['<'.charCodeAt(0)] : 'left',
    ['>'.charCodeAt(0)] : 'right',
    ['>'.charCodeAt(0)] : 'bot',
  };
  let i = 0;
  while (rawData.length > 0) {
    if (rawData.length === 1) {
      console.log(`Result: ${rawData[0]}`);
      break;
    }
    if (robotDirections[rawData[i]] && robotPosition.x === null) {
      robotPosition.direction = robotDirections[rawData[i]];
      robotPosition.y = i;
      robotPosition.x = allFrames.length;
    }
    if (rawData[i] === 10) {
      allFrames.push(rawData.splice(0, i));
      rawData.shift();
      i = -1;
    }
    i += 1;
  }
  allFrames.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      allFrames[rowIndex][cellIndex] = String.fromCharCode(cell) + ' ';
    });
  });
  console.log(allFrames.reduce((acc, row) => acc + row.join('') + '\n',''));
  return allFrames;
}

function createListOfRobotMoves(map) {
  const rotations = {
    top: {
      '0,-1': ['L', 'left'],
      '0,1': ['R', 'right'],
    },
    bot: {
      '0,-1': ['R', 'left'],
      '0,1': ['L', 'right'],
    },
    right: {
      '1,0': ['R', 'bot'],
      '-1,0': ['L', 'top'],
    },
    left: {
      '1,0': ['L', 'bot'],
      '-1,0': ['R', 'top'],
    },
  };
  const robotMoves = [];
  while (findRoad(map, [robotPosition.x, robotPosition.y], robotPosition.direction)) {
    const road = findRoad(map, [robotPosition.x, robotPosition.y], robotPosition.direction);
    robotMoves.push(rotations[robotPosition.direction][road.join()][0]);
    robotPosition.direction = rotations[robotPosition.direction][road.join()][1];
    let counter = 0;
    while (true) {
      if (!(map[robotPosition.x + road[0]]) ||
        map[robotPosition.x + road[0]][robotPosition.y + road[1]] !== '# ') {
        break;
      }
      robotPosition.x += road[0];
      robotPosition.y += road[1];
      counter += 1;
    }
    robotMoves.push(counter);
  }
  return robotMoves;
}

function findRoad(map, coords, dir) {
  let moves = [[0, 1], [0, -1]];
  if (dir === 'left' || dir === 'right') {
    moves = [[1, 0], [-1, 0]];
  }
  let road = null;
  moves.forEach((move) => {
    if (map[coords[0] + move[0]]) {
      if (map[coords[0] + move[0]][coords[1] + move[1]] === '# ') {
        road = [move[0], move[1]];
      }
    }
  });
  return road;
}


function createASCII(string) {
  const output = [];
  for (let i = 0; i < string.length; i += 1) {
    output.push(string.charCodeAt(i));
  }
  output.push(10);
  return output;
}

function getSubstrings(list) {
  const MAX_LEN = 20;
  const result = [];
  for (let i = 0; i < list.length; i += 2) {
    for (let j = 2; j < MAX_LEN; j += 2) {
      result.push(list.slice(i, i + j).join(','));
    }
  }
  return result;
}

function dedupe(list) {
  const groups = {};
  const result = [];
  for (let i = 0; i < list.length; i += 1) {
    const key = list[i];
    if (!groups[key]) {
      groups[key] = true;
      result.push(list[i]);
    }
  }
  return result;
}

function compressString(path) {
  const substrings = dedupe(getSubstrings(path));
  const pathAsStr = path.join(",");

  for (let i = 0; i < substrings.length; i += 1) {
    for (let j = i + 1; j < substrings.length; j += 1) {
      for (let k = j + 1; k < substrings.length; k += 1) {
        const A = substrings[i];
        const B = substrings[j];
        const C = substrings[k];

        const result = pathAsStr
          .replace(new RegExp(A, "g"), "A")
          .replace(new RegExp(B, "g"), "B")
          .replace(new RegExp(C, "g"), "C")
          .replace(/,+/g, ",")
          .replace(/(,$)|(^,)/, "");

        if (/^[ABC,]+$/.test(result)) {
          return {
            A,
            B,
            C,
            result
          };
        }
      }
    }
  }

  return null;
}

function createInput(createFrames, programm) {
  const routine = programm.result;
  const a = programm.A;
  const b = programm.B;
  const c = programm.C;
  const answer = createFrames ? 'y' : 'n';
  const output = [...createASCII(routine), ...createASCII(a),
    ...createASCII(b), ...createASCII(c), ...createASCII(answer)];
  return output;
}

/* 
[L10,L10,R6,
 L10,L10,R6,
 R12,L12,L12
 R12,L12,L12
 L6,L10,R12,R12
 R12,L12,L12
 L6,L10,R12,R12
 R12,L12,L12
 L6,L10,R12,R12
 L10,L10,R6,]

 A: L10,L10,R6
 B: R12,L12,L12
 C: L6,L10,R12,R12

 A A B B C B C B C A
                                           
. . . . . . . . . . . . . . . . L 9 8 7 6 5 4 3 2 1 L . . . . . . . . 
. . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 2 . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 3 . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 4 . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 5 . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 6 . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 7 . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 8 . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 9 . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . L 5 4 3 2 1 R . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . 2 . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . 3 . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . 4 . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . 5 . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . 6 . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . 7 . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . 8 . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . 9 . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . L 1 2 3 4 5 6 7 8 9 R . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . 2 . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . 3 . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . L 1 0 9 8 7 4 5 4 3 2 1 L . . . . . . . . 
. . . . . . . . . . . . . . 1 . . . . . 5 . . . . . 1 . . . . . . . . 
. . . . . . . . L 1 0 9 8 7 6 5 4 3 2 1 R . . . . . 0 . . . . . . . . 
. . . . . . . . 1 . . . . . 3 . . . . . . . . . . . 9 . . . . . . . . 
. . . . . . . . 2 . . . . . 4 . . . . . . . . . . . 8 . . . . . . . . 
. . . . . . . . 3 . . . . . 5 . . . . . . . . . . . 7 . . . . . . . . 
L 1 0 9 8 7 6 5 4 3 2 1 L . L 1 2 3 4 5 6 7 8 9 R . 6 . . . . . . . . 
1 . . . . . . . 5 . . . 1 . . . . . . . . . . . 1 . 5 . . . . . . . . 
2 . . . . . R 1 6 3 4 5 0 7 8 9 0 1 r . . . . . 2 . 4 . . . . . . . . 
3 . . . . . 9 . 7 . . . 9 . . . . . # . . . . . 3 . 3 . . . . . . . . 
4 . . . . . 8 . 8 . . . 8 . . . . . # . . . . . 4 . 2 . R 1 2 3 4 5 6 
5 . . . . . 7 . 9 . . . 7 . . . . . # . . . . . 5 . 1 . 9 . . . . . . 
6 . . . . . 6 . 0 . . . 6 . R 1 2 3 4 5 6 7 8 9 0 1 L . 8 . . . . . . 
7 . . . . . 5 . 1 . . . 5 . 1 . . . # . . . . . 7 . . . 7 . . . . . . 
8 . . . . . 4 . L 1 2 3 4 5 6 7 8 9 0 1 R . . . 8 . L 5 4 3 2 1 L . . 
9 . . . . . 3 . . . . . 3 . 9 . . . # . 1 . . . 9 . 1 . 5 . . . 1 . . 
0 . . . . . 2 . . . . . 2 . 8 . . . # . 2 . . . 0 . 2 . 4 . . . 0 . . 
1 . . . . . 1 . . . . . 1 . 7 . . . # . 3 . . . 1 . 3 . 3 . . . 9 . . 
L 1 2 3 4 5 L . . . . . R 1 6 9 8 7 6 5 4 3 2 1 R . 4 . 2 . . . 8 . . 
. . . . . . . . . . . . . . 5 . . . # . 5 . . . . . 5 . 1 . . . 7 . . 
. . . . . . . . . . . . . . 4 . . . L 1 6 3 4 5 6 7 8 9 L . . . 6 . . 
. . . . . . . . . . . . . . 3 . . . . . 7 . . . . . 7 . . . . . 5 . . 
. . . . . . . . . . . . . . 2 . . . . . 8 . . . . . 8 . . . . . 4 . . 
. . . . . . . . . . . . . . 1 . . . . . 9 . . . . . 9 . . . . . 3 . . 
. . . . . . . . . . . . . . R 1 9 8 7 6 0 5 4 3 2 1 R . . . . . 2 . . 
. . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . 1 . . 
. . . . . . . . . . . . . . . . . . . . L 1 2 3 4 5 6 7 8 9 0 1 L . . 


 */

