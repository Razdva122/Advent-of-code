interface Memory {
	totalMass: number;
}

function recursiveFindFuel(mass: number, result: Memory = { totalMass: 0 }) {
	const needFuel = Math.floor(mass / 3) - 2;
	if (needFuel > 0) {
		result.totalMass += needFuel;
    	recursiveFindFuel(needFuel, result);
	}
	return result.totalMass;
}

const input: string = ``;
const output: number = input.split('\n')
							.map((item) => Number(item))
							.reduce((acc, item) => acc + recursiveFindFuel(item), 0);