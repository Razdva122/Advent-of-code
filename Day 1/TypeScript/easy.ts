function findFuel(mass: number) {
  return Math.floor(mass / 3) - 2;
}

const input: string = ``;
const output: number = input.split('\n')
							.map((item) => Number(item))
							.reduce((acc, item) => acc + findFuel(item), 0);