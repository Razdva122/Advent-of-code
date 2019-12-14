type layerNums = 0 | 1 | 2;
type layer = {
	[key in layerNums]: number
};

function spaceImage(input: Array<layerNums>, size: [number, number]): number {
	const memory: Array<Array<layerNums>> = [];
	while (input.length > 0) {
		memory.push(input.splice(0, size[0] * size[1]));
	}
	const memoryData: Array<layer> = memory.map((item: Array<layerNums>) => {
		const obj: layer = {
			0: 0,
			1: 0,
			2: 0,
		};
		for (let i = 0; i < item.length; i += 1) {
			obj[item[i]] += 1;
		}
		return obj;
	});
	memoryData.sort((a, b) => a['0'] - b['0']);
	return memoryData[0][1] * memoryData[0][2];
}

const input: Array<layerNums> = ''.split('').map((symbol) => Number(symbol) as layerNums);
const size: [number, number] = [25, 6];
const output = spaceImage(input, size);
console.log(output);