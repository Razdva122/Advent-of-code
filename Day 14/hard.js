function getLevels(input, startElementName) {
  const levels = [[startElementName]];
  /*
  Levels
  Level 0 => ORE
  Level 1 => Level 0
  Level 2 => Level 0 + Level 1;
   */

  while (input.some((item) => item.level === -1)) {
    const leftRecepets = input.filter((recept) => recept.level === -1);
    const currentLevel = [];
    const available = levels.flat();
    for (let i = 0; i < leftRecepets.length; i += 1) {
      if (leftRecepets[i].recept.every((item) => available.includes(item.name))) {
        currentLevel.push(leftRecepets[i].name);
        leftRecepets[i].level = levels.length;
      }
    }
    levels.push(currentLevel);
  }
  return levels.reverse();
}

function countFuel(input, startElementName, amountOfFuel) {
  input.forEach((item) => {
    item.level = -1;
  });
  const levels = getLevels(input, startElementName);

  const needToFind = [{ name: 'FUEL', amount: amountOfFuel }];
  let amountOfOre = 0;

  // Loops LEVELS => ITEMS ON LEVEL => RECEPT OF ITEM
  levels.forEach((level) => {
    level.forEach((elementName) => {
      if (elementName === startElementName) {
        return;
      }
      const indexOfItem = needToFind.findIndex((item) => item.name === elementName);
      const el = needToFind[indexOfItem];
      const elInfo = input.find((item) => item.name === el.name);
      const needPieces = Math.ceil(el.amount / elInfo.amount);
      elInfo.recept.forEach((elementFromRecept) => {
        if (elementFromRecept.name === startElementName) {
          amountOfOre += elementFromRecept.amount * needPieces;
        } else {
          const index = needToFind.findIndex((k) => k.name === elementFromRecept.name);
          if (index === -1) {
            needToFind.push({
              name: elementFromRecept.name,
              amount: elementFromRecept.amount * needPieces,
            });
          } else {
            needToFind[index].amount += elementFromRecept.amount * needPieces;
          }
        }
      });
      needToFind.splice(indexOfItem, 1);
    });
  });
  return amountOfOre;
}

function binarySearch(start, finish, target) {
  if (start + 1 > finish) {
    return Math.ceil(start);
  }
  const middle = (finish - start) / 2 + start;
  if (countFuel(input, 'ORE', middle) === target) {
    return middle;
  } else if (countFuel(input, 'ORE', middle) > target) {
    values.finish = middle;
  } else {
    values.start = middle;
  }
  return binarySearch(values.start, values.finish, values.target);
}

// INPUT HERE !!!

let input = ``.split('\n')
              .map((item) => item.split('=>'));

input = input.map((item) => {
  const res = {};
  item[0] = item[0].split(', ')
                   .map((i) => i.trim().split(' '));
  item[1] = item[1].trim()
                   .split(' ');
  res.recept = item[0].reduce((acc, item) => {
    acc.push({ name: item[1], amount: Number(item[0]) });
    return acc;
  }, []);
  res.name = item[1][1];
  res.amount = Number(item[1][0]);
  res.level = -1;

  return res;
});

const values = {
  start: 0,
  finish: 10000000000,
  target: 1000000000000, // 1 trillion amount of Ore to find
};
console.log(binarySearch(values.start, values.finish, values.target));
