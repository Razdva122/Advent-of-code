type planet = {
  [key: string]: planet;
}

function recursiveFindPath(start:planet, finish: string, acc: Array<string> = [], result: Array<string> = []): Array<string> {
  if (result.length > 0) {
    return result;
  }
  const keys = Object.keys(start);
  if (keys.includes(finish)) {
    result.push(...acc);
  }
  for (let i = 0; i < keys.length; i += 1) {
    const copyAcc = [...acc];
    copyAcc.push(keys[i]);
    recursiveFindPath(start[keys[i]], finish, copyAcc, result);
  }
  return result;
}

function orbitMap(input:Array<connectInfo>):number {
  const memory: Map <string, planet> = new Map();
  const start = 'COM';
  for (let i = 0; i < input.length; i += 1) {
    const firstEl: planet = memory.get(input[i][0]) || {};
    const secondEl: planet = memory.get(input[i][1]) || {};

    if (memory.has(input[i][0]) && memory.has(input[i][1])) {
      firstEl[input[i][1]] = secondEl;
    } else if (memory.has(input[i][0])) {
      firstEl[input[i][1]] = secondEl;
      memory.set(input[i][1], secondEl);
    } else if (memory.has(input[i][1])) {
      firstEl[input[i][1]] = secondEl;
      memory.set(input[i][0], firstEl);
    } else {
      firstEl[input[i][1]] = secondEl;
      memory.set(input[i][0], firstEl);
      memory.set(input[i][1], secondEl);
    }
  }
  const youPath = recursiveFindPath(memory.get(start) as planet, 'YOU');
  const sanPath = recursiveFindPath(memory.get(start) as planet, 'SAN');
  let counter = 0;
  for (; counter < youPath.length; counter += 1){
    if (youPath[counter] !== sanPath[counter]) {
      break;
    }
  }
  return youPath.length - counter + sanPath.length - counter;
}

type connectInfo = [string, string];
const input:Array<connectInfo> = ``.split('\n').map((i) => i.split(')') as connectInfo);

orbitMap(input);