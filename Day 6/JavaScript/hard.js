function findStart(input) {
  const obj = {};
  input.forEach(item => {
    obj[item[0]] = obj[item[0]] || {};
    obj[item[0]].start = obj[item[0]].start + 1 || 1;
    obj[item[1]] = obj[item[1]] || {};
    obj[item[1]].end = obj[item[1]].end + 1 || 1;
  });
  const start = Object.keys(obj).filter((item) => obj[item].start === 1 && obj[item].end === undefined);
  return start[0];
}

function recursiveFindPath(start, dir, acc = [], result = []) {
  if (result.length > 0) {
    return;
  }
  const keys = Object.keys(start);
  if (keys.includes(dir)) {
    result.push(...acc);
  }
  for (let i = 0; i < keys.length; i += 1) {
    const newAcc = [...acc];
    newAcc.push(keys[i]);
    recursiveFindPath(start[keys[i]], dir, newAcc, result);
  }
  return result;
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
  const youPath = recursiveFindPath(memory.get(start), 'YOU');
  const sanPath = recursiveFindPath(memory.get(start), 'SAN');
  for (let i = 0; i < youPath.length; i += 1) {
    if (youPath[i] !== sanPath[i]) {
      youPath.splice(0, i);
      sanPath.splice(0, i);
      break;
    }
  }
  return youPath.length + sanPath.length;
}

const input = ``.split('\n').map((i) => i.split(')'));

orbitMap(input);
