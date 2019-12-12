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

function countEnergy(planets) {
  let sum = 0;
  for (let i = 0; i < planets.length; i += 1) {
    const planet = planets[i];
    const keenetic = Math.abs(planet.speed.x) + Math.abs(planet.speed.y) + Math.abs(planet.speed.z);
    const potent = Math.abs(planet.position.x) + Math.abs(planet.position.y) + Math.abs(planet.position.z);
    sum += (keenetic * potent);
  }
  return sum;
}

const input = `<x=-5, y=6, z=-11>
<x=-8, y=-4, z=-2>
<x=1, y=16, z=4>
<x=11, y=11, z=-4>`;

const planets = createPlanetsFromInput(input);

for (let i = 1; i <= 1000; i += 1) {
  oneMove(planets);
}
countEnergy(planets);
