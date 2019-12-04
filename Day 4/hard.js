function secureContainer([start, end]) {
  let counter = 0;
  for (let i = start; i <= end; i += 1) {
    const numbers = String(i).split('').map((item) => Number(item));
    let decrease = true;
    const counterNumbers = numbers.reduce((acc, item) => {
      acc[item] = acc[item] || 0;
      acc[item] += 1;
      return acc;
    }, {});

    for (let j = 0; j < numbers.length - 1; j += 1) {
      if (numbers[j] > numbers[j + 1]) {
        decrease = false;
        break;
      }
    }
    if (decrease) {
      const dups = Object.keys(counterNumbers).filter((item) => counterNumbers[item] === 2);
      if (dups.length >= 1) {
        counter += 1;
      }
    }
  }
  return counter;
}

const input = [236491, 713787];
secureContainer(input);
