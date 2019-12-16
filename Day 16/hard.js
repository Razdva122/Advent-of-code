// N - Индекс символа который пишем в строку
// M - Индекс символа из текущей строки который обрабатываем

function countPattern(n, m) {
  m += 1;
  m %= 4 * n;
  if (m < n) {
    return 0;
  }
  if (m < 2 * n) {
    return 1;
  }
  if (m < 3 * n) {
    return 0;
  }
  if (m < 4 * n) {
    return -1;
  }
}

function transmission(input, cycles, amountToSkip) {
  let level = [...input];
  let nextLevel = [];
  for (let i = 0; i < cycles; i += 1) {
    console.log(`Iteration: ${i}`);
    while (nextLevel.length < level.length) {
      let value = 0;
      for (let j = nextLevel.length; j < level.length; j += 1) {
        const realIndex = nextLevel.length + 1 + amountToSkip;
        const realDoneElements = j + amountToSkip;
        const pattern = countPattern(realIndex, realDoneElements);
        value += level[j] * pattern;
      }
      nextLevel.push(Number(String(value).substr(-1)));
    }
    level = nextLevel;
    nextLevel = [];
  }
  return level;
}

let input = '03036732577212944063491565474664';
let startInp = input;
for (let i = 1; i < 10000; i += 1) {
  input = input + startInp;
}
const amountToSkip = Number(input.slice(0, 7));
console.log(amountToSkip);
console.time('test');
input = input.split('').map((item) => Number(item));


const test = transmission(input.slice(amountToSkip), 100, amountToSkip);

console.log(test.slice(0, 8).join(''));
console.timeEnd('test');

//AVG time to solve real input around 3 hours

/*
firstTest 124709.42626953125ms
SecondTest 58628.0791015625ms
 */
