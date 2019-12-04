function secureContainer([start, end]) {
  let counter = 0;
  for (let i = start; i <= end; i += 1) {
    const numbers = String(i).split('').map((item) => Number(item));
    let double = false;
    let decrease = true;
    for (let j = 0; j < numbers.length - 1; j += 1) {
      if (numbers[j] > numbers[j + 1]) {
        decrease = false;
        break;
      } else if (numbers[j] === numbers[j + 1]) {
        double = true;
      }
    }
    if (double && decrease) {
      counter += 1;
    }
  }
  return counter;
}

const input = [236491, 713787];
secureContainer(input);
