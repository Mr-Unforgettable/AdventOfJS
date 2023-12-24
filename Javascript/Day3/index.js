import fs from "fs";
import util from "util";

function calculateSumOfAdjecentNumbers1(input) {
  let result = 0;

  const text = input.split("\n");

  for (let i = 0; i < text.length; i++) {
    const line = text[i].trim();
    const lineChars = line.split("");

    // Get prev and next lines if they exist (if they don't, make them empty strings)
    const prevLine = (text[i - 1] || "").trim();
    const nextLine = (text[i + 1] || "").trim();

    // Find all numbers in the line (can be 1-3 digits long) and their indexes
    const digitsList = [];
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (isNum(char)) {
        digitsList.push({ index: j, value: char });
      }
    }

    // Make sure to combine adjacent numbers and save the index of the first digit: { index: 0, value: '123' }
    const numbers = [];
    for (let j = 0; j < digitsList.length; j++) {
      const digit = digitsList[j];
      if (j === 0) {
        numbers.push({ index: digit.index, value: digit.value });
      } else if (digit.index === digitsList[j - 1].index + 1) {
        numbers[numbers.length - 1].value += digit.value;
      } else {
        numbers.push({ index: digit.index, value: digit.value });
      }
    }

    // For each number, if there are any symbols that surround it (excluding numbers and periods), including symbols on prev and next lines (diagonally too), add the number to the result
    for (let j = 0; j < numbers.length; j++) {
      const num = numbers[j];

      let numStatus = false;
      let surroundingCharacters = [];

      // Check if there are any symbols in the surrounding characters
      surroundingCharacters.push(lineChars[num.index - 1]);
      surroundingCharacters.push(lineChars[num.index + num.value.length]);
      surroundingCharacters.push(prevLine[num.index - 1]);
      surroundingCharacters.push(prevLine[num.index + num.value.length]);
      surroundingCharacters.push(nextLine[num.index - 1]);
      surroundingCharacters.push(nextLine[num.index + num.value.length]);

      for (let i = 0; i < num.value.length; i++) {
        // surroundingCharacters.push(lineChars[num.index + i]);
        surroundingCharacters.push(prevLine[num.index + i]);
        surroundingCharacters.push(nextLine[num.index + i]);
      }

      // console.log(`surroundingCharacters: ${surroundingCharacters}`)
      for (const char of surroundingCharacters) {
        if (char && !isNum(char) && char !== ".") {
          numStatus = true;
          break;
        }
      }

      if (numStatus) {
        result += parseInt(num.value);
      }
      // console.log(`${num.value} on line ${i + 1} is ${numStatus ? 'surrounded' : 'not surrounded'}`);
    }
  }

  return result;
}

function calculateSumOfAdjecentNumbers2(input) {
  let result = 0;
  const text = input.split("\n");

  let adjacentAstrixes = [];
  for (let i = 0; i < text.length; i++) {
    const line = text[i].trim();
    const lineChars = line.split("");

    const prevLine = (text[i - 1] || "").trim();
    const nextLine = (text[i + 1] || "").trim();

    const digitsList = [];
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (isNum(char)) {
        digitsList.push({ index: j, value: char });
      }
    }

    const numbers = [];
    for (let j = 0; j < digitsList.length; j++) {
      const digit = digitsList[j];

      if (j === 0) {
        numbers.push({ index: digit.index, value: digit.value });
      } else if (digit.index === digitsList[j - 1].index + 1) {
        numbers[numbers.length - 1].value += digit.value;
      } else {
        numbers.push({ index: digit.index, value: digit.value });
      }
    }

    for (let j = 0; j < numbers.length; j++) {
      const num = numbers[j];
      let numStatus = false;
      let surroundingCharacters = [];

      surroundingCharacters.push({
        char: lineChars[num.index - 1],
        index: num.index - 1,
        line: i,
      });
      surroundingCharacters.push({
        char: lineChars[num.index + num.value.length],
        index: num.index + num.value.length,
        line: i,
      });
      surroundingCharacters.push({
        char: prevLine[num.index - 1],
        index: num.index - 1,
        line: i - 1,
      });
      surroundingCharacters.push({
        char: prevLine[num.index + num.value.length],
        index: num.index + num.value.length,
        line: i - 1,
      });
      surroundingCharacters.push({
        char: nextLine[num.index - 1],
        index: num.index - 1,
        line: i + 1,
      });
      surroundingCharacters.push({
        char: nextLine[num.index + num.value.length],
        index: num.index + num.value.length,
        line: i + 1,
      });

      for (let k = 0; k < num.value.length; k++) {
        surroundingCharacters.push({
          char: prevLine[num.index + k],
          index: num.index + k,
          line: i - 1,
        });
        surroundingCharacters.push({
          char: nextLine[num.index + k],
          index: num.index + k,
          line: i + 1,
        });
      }

      // console.log(`surroundingCharacters: ${surroundingCharacters}`);
      let surroundingAstrixes = surroundingCharacters.filter(
        (char) => char.char === "*"
      );

      for (const astrix of surroundingAstrixes) {
        let inMainAdjAstArr = false;

        for (let k = 0; k < adjacentAstrixes.length; k++) {
          const adjAstrix = adjacentAstrixes[k];

          if (
            adjAstrix.index === astrix.index &&
            adjAstrix.line === astrix.line
          ) {
            inMainAdjAstArr = true;
            adjAstrix.adjecentNums.push({
              index: num.index,
              value: num.value,
            });
            break;
          }
        }

        if (!inMainAdjAstArr) {
          adjacentAstrixes.push({
            index: astrix.index,
            line: astrix.line,
            adjecentNums: [
              {
                index: num.index,
                value: num.value,
              },
            ],
          });
        }
      }
    }
  }

  let gears = adjacentAstrixes.filter(
    (astrix) => astrix.adjecentNums.length === 2
  );

  for (const gear of gears) {
    const num1 = gear.adjecentNums[0];
    const num2 = gear.adjecentNums[1];
    const gearResult = parseInt(num1.value) * parseInt(num2.value);
    result += gearResult;
  }

  return result;
}

// Helper functions
function isNum(char) {
  return char.match(/\d/) !== null;
}

const readFileAsync = util.promisify(fs.readFile);
async function fileReaderFunc(file) {
  try {
    const data = await readFileAsync(file, "utf-8");
    const result1 = calculateSumOfAdjecentNumbers1(data);
    const result2 = calculateSumOfAdjecentNumbers2(data);

    console.log(`Part1 result is: ${result1}`);
    console.log(`part2 result is: ${result2}`);

    return { result1, result2 };
  } catch (err) {
    console.error("Unable to read file.", err);
    throw err;
  }
}

async function run() {
  try {
    // await fileReaderFunc("Example.txt");
    await fileReaderFunc("Input.txt");
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

run();
