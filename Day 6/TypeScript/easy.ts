type planet = {
  [key: string]: planet;
}

function recursiveCounter(start: planet, acc = 0, counter = { value: 0 }): number {
  counter.value += acc;
  if (!start) {
    return counter.value;
  }
  const keys = Object.keys(start);
  for (let i = 0; i < keys.length; i += 1) {
    recursiveCounter(start[keys[i]], acc + 1, counter);
  }
  return counter.value;
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
  return recursiveCounter(memory.get(start) as planet);
}

type connectInfo = [string, string];
const input:Array<connectInfo> = ``.split('\n').map((i) => i.split(')') as connectInfo);

orbitMap(input);

