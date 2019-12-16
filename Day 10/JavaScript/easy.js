function monitoringStation(map) {
  let bestCoords = [0, 0];
  let bestRes = 0;
  for (let i = 0; i < map.length; i += 1) {
    for (let j = 0; j < map[0].length; j += 1) {
      if (map[i][j] !== '#') {
        continue;
      }
      const currentCoords = [i, j];
      let currentRes = 0;
      for (let x = -25; x <= 25; x += 1) {
        singleDir: for (let y = -25; y <= 25; y += 1) {
          const newPos = [...currentCoords];
          newPos[0] += y;
          newPos[1] += x;
          if (x !== 0 && y !== 0) {
            if (gcd(Math.abs(x), Math.abs(y)) !== 1) {
              continue;
            }
          }
          if (x === 0 && Math.abs(y) !== 1) {
            continue;
          }
          if (Math.abs(x) !== 1 && y === 0) {
            continue;
          }
          while (map[newPos[0]] !== undefined && map[newPos[0]][newPos[1]] !== undefined) {
            if (map[newPos[0]][newPos[1]] === '#') {
              currentRes += 1;
              continue singleDir;
            }
            newPos[0] += y;
            newPos[1] += x;
          }
        }
      }
      if (currentRes > bestRes) {
        bestCoords = currentCoords;
        bestRes = currentRes;
      }
    }
  }
  return [bestRes, bestCoords];
}

function gcd(a, b) {
  while(a !== b) {
    if (a > b) {
      a = a - b;
    } else {
      b = b - a;
    }
  }
  return a;
}

const input = ``.split('\n').map((item) => item.split(''));
monitoringStation(input);
