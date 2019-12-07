function recursiveFindFuel(mass, result = { totalMass: 0 }) {
  	const needFuel = Math.floor(mass / 3) - 2;
	if (needFuel > 0) {
		result.totalMass += needFuel;
    	recursiveFindFuel(needFuel, result);
	}
	return result.totalMass;
}

const input = '';

const output = input.split('\n')
                    .reduce((acc, item) => acc + recursiveFindFuel(item), 0);