function test(arrayInput, [wide, tall]) {
	const memory = [];
	while (arrayInput.length > 0) {
		const layer = [];
		for (let i = 0; i < tall; i += 1) {
			layer.push(arrayInput.splice(0, wide));
		}
		memory.push(layer);
	}
	const finalLayer = memory[0];
	for (let k = 0; k < memory.length; k += 1) {
		const currentLayer = memory[k];
		for (let i = 0; i < wide; i += 1) {
			for (let j = 0; j < tall; j += 1) {
				if (finalLayer[j][i] === '2') {
					finalLayer[j][i] = currentLayer[j][i];
				}
			}
		}
	}
	return finalLayer;
}

const input = '';
const arrayInput = input.split('');
const size = [25, 6];
const output = test(arrayInput, size);