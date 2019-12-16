type cellInfo = {
  coords: coordinates,
  distance: number,
};
type hashMapAngels = {
  [key: number]: Array<cellInfo>,
};
type coordinates = [number, number];
type coordinatesObject = {
  x: number,
  y: number,
}
type asteroidsMap = [Array<string>];

function findBestPosition(map: asteroidsMap): coordinates {
  let bestPosition: coordinates = [0, 0];
  let bestResult = 0;
  map.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (cell === '#') {
        const copyMap: asteroidsMap = map.map((row) => [...row]) as asteroidsMap;
        const hashMemory = createHashMap([rowIndex, cellIndex], copyMap);
        if (Object.keys(hashMemory).length > bestResult) {
          bestResult = Object.keys(hashMemory).length;
          bestPosition = [rowIndex, cellIndex];
        }
      }
    })
  })
  return bestPosition;
}

function findNthAsteroid(map: asteroidsMap, nthNum: number): number | void{
  const bestPosition: coordinates = findBestPosition(map);
  const angels: hashMapAngels = createHashMap(bestPosition, map);
  Object.keys(angels).forEach((angel) => {
    angels[Number(angel)].sort((a, b) => a.distance - b.distance);
  });
  let destroyedAsteriods = 0;
  while (destroyedAsteriods <= nthNum) {
    const angelsKeys: Array<number> = Object.keys(angels).map(item => Number(item)).sort((a, b) => b - a);
    for (let i = 0; i < angelsKeys.length; i += 1) {
      if (angels[angelsKeys[i]].length > 0) {
        destroyedAsteriods += 1;
        if (destroyedAsteriods === nthNum) {
          return angels[angelsKeys[i]][0].coords[1] * 100 + angels[angelsKeys[i]][0].coords[0];
        }
        angels[angelsKeys[i]].shift();
      }
    }
  }
}

function createHashMap(start: coordinates, map: asteroidsMap): hashMapAngels {
  const memory: hashMapAngels = {};
  map[start[0]][start[1]] = 'S';
  for (let i = 0; i < map.length; i += 1) {
    for (let j = 0; j < map.length; j += 1) {
      if (map[i][j] === '#') {
        const angle = getAngle({ x: start[0], y: start[1] }, { x: i, y: j });
        memory[angle] = memory[angle] || [];
        const distance = Math.hypot((i - start[0]), (j - start[1]));
        memory[angle].push({ coords: [i, j], distance: distance });
      }
    }
  }
  return memory;
}

function getAngle({ x: x1, y: y1 }: coordinatesObject, { x: x2, y: y2 }: coordinatesObject): number {
  let angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI + 180;
  if (angle < 0) {
    angle += 360;
  }
  return angle;
}

const input: asteroidsMap = ``.split('\n').map((item) => item.split('')) as asteroidsMap;
console.log(findNthAsteroid(input, 200));
