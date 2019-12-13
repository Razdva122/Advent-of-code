const map = new Array(20).fill(0).map((item) => new Array(25).fill(0));
const positions = {
  ball: 0,
  paddle: 0,
};

function codeSolve(input) {
  let relativeCounter = 0;
  let output = [];
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
      showMap();
      // neutral position
      let inputNumber = 0;
      // tilted to the right
      if (positions.ball > positions.paddle) {
        inputNumber = 1;
      // tilted to the left
      } else if (positions.ball < positions.paddle) {
        inputNumber = -1;
      }
      if (firstNumMode === 0) {
        input[input[i + 1]] = inputNumber;
      } else {
        input[input[i + 1] + relativeCounter] = inputNumber;
      }
      i += 1;
    } else if (code === 4) {
      output.push(nums[0]);
      if (output.length === 3) {
        createMap([output[0], output[1], output[2]], map);
        output = [];
      }
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
input[0] = 2;
codeSolve(input);

function createMap([x, y, el], map) {
  if (x === -1) {
    map[y][x] = Math.max(el, map[y][x] || 0);
    return;
  }
  const elements = {
    0: ' ',
    1: '#',
    2: 'X',
    3: '=',
    4: 'O',
  };
  if (elements[el] === '=') {
    positions.paddle = x;
  } else if (elements[el] === 'O') {
    positions.ball = x;
  }
  map[y][x] = elements[el];
}

function showMap() {
  console.log(map.reduce((acc, item) => acc + item.join('') + '\n',''));
}

console.log(`result : ${map[0][-1]}`);
