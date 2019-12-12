function secureContainer([start, end]: [number, number]):number {
  let counter:number = 0;
  for (let i = start; i <= end; i += 1) {
    const numbers: Array<number> = String(i).split('').map((item) => Number(item));
    let double: boolean = false;
    let decrease: boolean = true;
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

const input: [number, number] = [236491, 713787];
secureContainer(input);