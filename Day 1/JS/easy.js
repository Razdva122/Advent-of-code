function findFuel(mass) {
  return Math.floor(mass / 3) - 2;
}

const input = ``;
const output = input.split('\n')
                    .reduce((acc, item) => acc + findFuel(item), 0);