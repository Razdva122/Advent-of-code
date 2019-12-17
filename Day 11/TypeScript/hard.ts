const inputNumbers: Array<number> = [];
const commands: Array<number> = [];

interface IProgramState {
  isRun: boolean,
  position: number,
  relativeBase: number,
  input: Array<number>,
  commands: Array<number>,
  output: Array<number>,
}

class Program {
  state: IProgramState = {
    isRun: true,
    position: 0,
    relativeBase: 0,
    input: [...inputNumbers],
    commands: [...commands],
    output: [],
  }
  runProgram() {
    codeSolve(this.state);
  }
  copyProgram() {
    const newProgram = new Program();
    newProgram.state.isRun = this.state.isRun;
    newProgram.state.position = this.state.position;
    newProgram.state.relativeBase = this.state.relativeBase;
    newProgram.state.input = [...this.state.input];
    newProgram.state.commands = [...this.state.commands];
    newProgram.state.output = [...this.state.output];
    return newProgram;
  }
}

type roboState = {
  robotPosition: [number,number],
  robotDirection: string,
}

type directions = 'left'|'right'|'up'|'down';
type rotateDir = {
  [key in directions]: directions;
}
type robotSignal = 1 | 0;
type moves = {
  [key in directions]: [number, number]
}

class Robot {
  coordinates: [number, number];
  direction: directions;
  constructor(coords: [number, number], direction: directions) {
    this.coordinates = coords;
    this.direction = direction;
  }
  move () {
    const moves = {
      'left': [0, -1],
      'right': [0, 1],
      'up': [-1, 0],
      'down': [1, 0],
    }
    this.coordinates[0] += moves[this.direction][0];
    this.coordinates[1] += moves[this.direction][1];
  }
  rotate (signal: robotSignal) {
    const rotateLeft:rotateDir = {
      left: 'down',
      down: 'right',
      right: 'up',
      up: 'left',
    };
    const rotateRight:rotateDir = {
      left: 'up',
      down: 'left',
      right: 'down',
      up: 'right',
    };
    if (signal === 1) {
      this.direction = rotateRight[this.direction];
    } else if (signal === 0) {
      this.direction = rotateLeft[this.direction];
    }
  }
}

function codeSolve(programState: IProgramState) {
  const output = programState.output;
  const commands = programState.commands;
  const inputNumbers = programState.input;
  let relativeBase = programState.relativeBase;
  for (let i = programState.position; i < commands.length; i += 1) {
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
        if (inputNumbers.length === 0) {
          programState.position = i;
          programState.relativeBase = relativeBase;
          return;
        }
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
        programState.position = i;
        programState.isRun = false;
        programState.relativeBase = relativeBase;
        return output;
    }
  }
  return output;
}

type memoryPanels = {
  [key: string]: robotSignal | null;
}

function createMemory(): memoryPanels{
  const robotProgram = new Program();
  const memory: memoryPanels = {};
  const robot = new Robot([0,0], 'up');
  memory['0,0'] = 1;
  while (robotProgram.state.isRun) {
    robotProgram.state.input.push(memory[robot.coordinates.join()] || 0);
    robotProgram.runProgram();
    memory[robot.coordinates.join()] = robotProgram.state.output.shift() as robotSignal;
    robot.rotate(robotProgram.state.output.shift() as robotSignal);
    robot.move();
  }
  return memory;
}

function drawImage(drawMemory: memoryPanels): void{
  const image = new Array(50).fill(' ').map((row) => new Array(50).fill(' '));
  const panelsToDraw = Object.keys(drawMemory);
  panelsToDraw.forEach((panel) => {
    const coordinates:Array<number> = panel.split(',').map(item => Number(item));
    image[coordinates[0]][coordinates[1]] = drawMemory[panel] === 1 ? '#' : ' ';
  })
  console.log(image.reduce((acc,row) => acc + row.join('') +'\n',''));
}

drawImage(createMemory());