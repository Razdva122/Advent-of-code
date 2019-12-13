function findStart(input) {
  const obj = {};
  input.forEach(item => {
    obj[item[0]] = obj[item[0]] || {};
    obj[item[0]].start = obj[item[0]].start + 1 || 1;
    obj[item[1]] = obj[item[1]] || {};
    obj[item[1]].end = obj[item[1]].start + 1 || 1;
  });
  const start = Object.keys(obj).filter((item) => obj[item].start === 1 && !obj[item].end);
  return start[0];
}

function recursiveCounter(start, acc = 0, counter = { value: 0 }) {
  counter.value += acc;
  if (!start) {
    return;
  }
  const keys = Object.keys(start);
  for (let i = 0; i < keys.length; i += 1) {
    recursiveCounter(start[keys[i]], acc + 1, counter);
  }
  return counter.value;
}

function orbitMap(input) {
  const memory = new Map();
  const start = findStart(input);
  for (let i = 0; i < input.length; i += 1) {
    if (memory.has(input[i][0]) && memory.has(input[i][1])) {
      memory.get(input[i][0])[input[i][1]] = memory.get(input[i][1]);
    } else if (memory.has(input[i][0])) {
      const secondEl = {};
      memory.get(input[i][0])[input[i][1]] = secondEl;
      memory.set(input[i][1], secondEl);
    } else if (memory.has(input[i][1])) {
      const firstEl = {};
      firstEl[input[i][1]] = memory.get(input[i][1]);
      memory.set(input[i][0], firstEl);
    } else {
      const firstEl = {};
      const secondEl = {};
      firstEl[input[i][1]] = secondEl;
      memory.set(input[i][0], firstEl);
      memory.set(input[i][1], secondEl);
    }
  }
  return recursiveCounter(memory.get(start));
}

const input = ``.split('\n').map((i) => i.split(')'));

orbitMap(input);
