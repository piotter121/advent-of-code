const fs = require("fs").promises;
const path = require("path");

const splitRegexp = /(\d+)\s+(\d+)/i;

fs.readFile(path.resolve(__dirname, "./input.txt"), "utf8")
  .then((data) => {
    const lines = data.split("\n");

    const [first, second] = lines.reduce(
      (result, line) => {
        const [_, firstNumber, secondNumber] = splitRegexp.exec(line) ?? [];
        if (!firstNumber || !secondNumber) {
          return result;
        }
        const [firstColumn, secondColumn] = result;
        return [
          firstColumn.concat(parseInt(firstNumber, 10)),
          secondColumn.concat(parseInt(secondNumber, 10)),
        ];
      },
      [[], []],
    );

    if (first.length !== second.length) {
      console.error(
        `Columns have different lengths; ${first.length} !== ${second.length}`,
      );
      return;
    }

    firstPart(first, second);
    secondPart(first, second);
  })
  .catch((err) => {
    console.error(err);
  });

function firstPart(firstColumn, secondColumn) {
  firstColumn.sort();
  secondColumn.sort();

  let distancesSum = 0;
  for (let i = 0; i < firstColumn.length; i++) {
    const num1 = firstColumn[i];
    const num2 = secondColumn[i];
    distancesSum += Math.abs(num1 - num2);
  }

  console.log("Part 1: ", distancesSum);
}

function secondPart(firstColumn, secondColumn) {
  const appearanceCache = secondColumn.reduce((acc, number) => {
    acc[number] = (acc[number] ?? 0) + 1;
    return acc;
  }, {});
  const result = firstColumn.reduce((acc, current) => {
    const appearanceCount = appearanceCache[current] ?? 0;
    return appearanceCount * current + acc;
  }, 0);
  console.log("Part 2:", result);
}
