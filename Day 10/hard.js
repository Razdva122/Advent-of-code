function monitoringStation(map) {
  let currentCoords = [19, 11];
  let currentDestroyedNumb = 0;
  let lastCoords = [0, 0];
  const hashMap = createHashMap(currentCoords, map);
  Object.keys(hashMap).forEach((item) => {
    hashMap[item].sort((a, b) => a.distance - b.distance);
  });
  while (currentDestroyedNumb < 200) {
    const angles = Object.keys(hashMap).sort((a, b) => b - a);
    for (let i = 0; i < angles.length; i += 1) {
      if (hashMap[angles[i]].length > 0) {
        lastCoords = hashMap[angles[i]][0].coords;
        currentDestroyedNumb += 1;
        console.log(currentDestroyedNumb, lastCoords, angles[i]);
        if (currentDestroyedNumb === 200) {
          console.log(lastCoords[1] * 100 + lastCoords[0]);
          break;
        }
        hashMap[angles[i]].splice(0, 1);
        map[lastCoords[0]][lastCoords[1]] = 'X';
      }
    }
  }
  return lastCoords;
}

function createHashMap(start, map) {
  const memory = {};
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

function getAngle({ x: x1, y: y1 }, { x: x2, y: y2 }) {
  let angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI + 180;
  if (angle < 0) {
    angle += 360;
  }
  return angle;
}


const input = ``.split('\n').map((item) => item.split(''));
monitoringStation(input);


