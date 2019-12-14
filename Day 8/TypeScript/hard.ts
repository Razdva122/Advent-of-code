type layerNums = 0 | 1 | 2;

function spaceImage(input: Array<layerNums>, size: [number, number]): void {
	const memory: Array<Array<layerNums>> = [];
	while (input.length > 0) {
		memory.push(input.splice(0, size[0] * size[1]));
	}
	const finalImage: Array<layerNums> = memory.reduce((initLayer: Array<layerNums>, currentLayer: Array<layerNums>) => {
		currentLayer.forEach((pixel, indexOfPixel) => {
			if (initLayer[indexOfPixel] === 2) {
				initLayer[indexOfPixel] = pixel;
			} 
		})
		return initLayer;
	})
	for (let i = 0; i < finalImage.length; i += size[0]) {
		console.log(finalImage.slice(i, i + size[0]).map(number => {
			if (number === 1) {
				return '#';
			}
			return ' ';
		}).join(''))
	}
}

const input: Array<layerNums> = ''.split('').map((symbol) => Number(symbol) as layerNums);
const size: [number, number] = [25, 6];
spaceImage(input, size);
