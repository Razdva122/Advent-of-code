function createPlanetsFromInput(input) {
  // format = [[[x, num],[y, num],[z, num]],
  //           [[x, num],[y, num],[z, num]]]
  const arrayFromInput = input.split('\n')
                              .map(item => item.slice(1, item.length - 1)
                                               .split(',')
                                               .map(item => item.split('=')));
  const planets = [];
  for (let i = 0; i < arrayFromInput.length; i += 1) {
    const planet = {};
    planet.position = {
      x: Number(arrayFromInput[i][0][1]),
      y: Number(arrayFromInput[i][1][1]),
      z: Number(arrayFromInput[i][2][1]),
    };
    planet.speed = {
      x: 0,
      y: 0,
      z: 0,
    };
    planets.push(planet);
  }

  return planets;
}

function oneMove(planets) {
  for (let i = 0; i < planets.length; i += 1) {
    for (let j = i + 1; j < planets.length; j += 1) {
      const planet1 = planets[i];
      const planet2 = planets[j];
      const directions = ['x', 'y', 'z'];
      directions.forEach((dir) => {
        if (planet1.position[dir] < planet2.position[dir]) {
          planet1.speed[dir] += 1;
          planet2.speed[dir] -= 1;
        } else if (planet1.position[dir] > planet2.position[dir]) {
          planet1.speed[dir] -= 1;
          planet2.speed[dir] += 1;
        }
      });
    }
  }
  planets.forEach((planet) => {
    planet.position.x += planet.speed.x;
    planet.position.y += planet.speed.y;
    planet.position.z += planet.speed.z;
  });
  return planets;
}

function createMemory(planets) {
  const memory = {};
  const templateX = `x ${planets[0].position.x}, ${planets[1].position.x}, ${planets[2].position.x}, ${planets[3].position.x} - ${planets[0].speed.x}, ${planets[1].speed.x}, ${planets[2].speed.x}, ${planets[3].speed.x}`;
  memory[templateX] = true;
  const templateY = `y ${planets[0].position.y}, ${planets[1].position.y}, ${planets[2].position.y}, ${planets[3].position.y} - ${planets[0].speed.y}, ${planets[1].speed.y}, ${planets[2].speed.y}, ${planets[3].speed.y}`;
  memory[templateY] = true;
  const templateZ = `z ${planets[0].position.z}, ${planets[1].position.z}, ${planets[2].position.z}, ${planets[3].position.z} - ${planets[0].speed.z}, ${planets[1].speed.z}, ${planets[2].speed.z}, ${planets[3].speed.z}`;
  memory[templateZ] = true;
  return memory;
}

const input = `<x=-5, y=6, z=-11>
<x=-8, y=-4, z=-2>
<x=1, y=16, z=4>
<x=11, y=11, z=-4>`;

const planets = createPlanetsFromInput(input);

const memory = createMemory(planets);
const cycles = {
  x: null,
  y: null,
  z: null,
};
for (let i = 1; ; i += 1) {
  if (cycles.x && cycles.y && cycles.z) {
    break;
  }
  oneMove(planets);
  if (cycles.x === null) {
    const templateX = `x ${planets[0].position.x}, ${planets[1].position.x}, ${planets[2].position.x}, ${planets[3].position.x} - ${planets[0].speed.x}, ${planets[1].speed.x}, ${planets[2].speed.x}, ${planets[3].speed.x}`;
    if (memory[templateX]) {
      cycles.x = i;
    }
  }
  if (cycles.y === null) {
    const templateY = `y ${planets[0].position.y}, ${planets[1].position.y}, ${planets[2].position.y}, ${planets[3].position.y} - ${planets[0].speed.y}, ${planets[1].speed.y}, ${planets[2].speed.y}, ${planets[3].speed.y}`;
    if (memory[templateY]) {
      cycles.y = i;
    }
  }
  if (cycles.z === null) {
    const templateZ = `z ${planets[0].position.z}, ${planets[1].position.z}, ${planets[2].position.z}, ${planets[3].position.z} - ${planets[0].speed.z}, ${planets[1].speed.z}, ${planets[2].speed.z}, ${planets[3].speed.z}`;
    if (memory[templateZ]) {
      cycles.z = i;
    }
  }
}

function lcmTwoNumbers(x, y) {
  if ((typeof x !== 'number') || (typeof y !== 'number')) {
    return false;
  }
  return (!x || !y) ? 0 : Math.abs((x * y) / gcdTwoNumbers(x, y));
}

function gcdTwoNumbers(x, y) {
  x = Math.abs(x);
  y = Math.abs(y);
  while(y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x;
}

console.log(lcmTwoNumbers(lcmTwoNumbers(cycles.x, cycles.y), cycles.z));
