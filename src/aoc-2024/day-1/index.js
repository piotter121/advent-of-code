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

    first.sort();
    second.sort();

    let distancesSum = 0;
    for (let i = 0; i < first.length; i++) {
      const num1 = first[i];
      const num2 = second[i];
      distancesSum += Math.abs(num1 - num2);
    }

    console.log(distancesSum);
  })
  .catch((err) => {
    console.error(err);
  });
