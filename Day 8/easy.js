function test(arrayInput, size) {
	const memory = [];
	while (arrayInput.length > 0) {
		memory.push(arrayInput.splice(0, size));
	}
	const memoryData = memory.map((item) => {
		const obj = {};
		for (let i = 0; i < item.length; i += 1) {
			obj[item[i]] = (obj[item[i]] || 0) + 1;
		}
		return obj;
	});
	memoryData.sort((a,b) => a['0'] - b['0']);
	return memoryData;
}

const input = '';
const arrayInput = input.split('');
const size = 25 * 6;
const output = test(arrayInput, size);