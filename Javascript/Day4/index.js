import fs from "fs";
import util from "util";

const totalPoints = (input) => {
  let result = 0;

  let cards = input.split("\n");

  for (const cardLine of cards) {
    let [cardStr, winStr] = cardLine.split(" | ");

    cardStr = cardStr.split(" ").map(Number).filter(Boolean);
    winStr = winStr.split(" ").map(Number).filter(Boolean);

    // console.log(cardNumbers, yourNumbers);
    let matchCount = 0;
    for (const number of winStr) {
      if (cardStr.includes(number)) {
        matchCount++;
      }
    }

    let totalPoints = 1;
    for (let i = 1; i < matchCount; i++) {
      totalPoints *= 2;
    }

    if (matchCount === 0) {
      totalPoints = 0;
    }

    result += totalPoints;
    // console.log(cardStr, winStr);
  }
  return result;
};

const totalPointsRevised = (input) => {
  let result = 0;
  let cardMatches = [];
  let cards = input.split("\n");

  for (const cardLine of cards) {
    let [cardStr, winStr] = cardLine.split(" | ");

    cardStr = cardStr.split(" ").map(Number).filter(Boolean);
    winStr = winStr.split(" ").map(Number).filter(Boolean);

    // console.log(cardNumbers, yourNumbers);
    let matchCount = 0;
    for (const number of winStr) {
      if (cardStr.includes(number)) {
        matchCount++;
      }
    }

    cardMatches.push({
      index: cardMatches.length,
      matches: matchCount,
    });
  }

  let fullCards = cardMatches;
  //   console.log(fullCards);
  for (const card of cardMatches) {
    card.copies = 1;
  }

  for (let i = 0; i < fullCards.length; i++) {
    let numCopies = fullCards[i].matches;
    for (let j = 0; j < numCopies; j++) {
      fullCards[i + j + 1].copies += fullCards[i].copies;
    }
  }
//   console.log(fullCards);
  for (const card of fullCards) {
    result += card.copies;
  }

  return result;
};

const readFileAsync = util.promisify(fs.readFile);
async function fileReaderFunc(file) {
  try {
    const data = await readFileAsync(file, "utf-8");
    const result1 = totalPoints(data);
    const result2 = totalPointsRevised(data);

    console.log(`Part1 result is: ${result1}`);
    console.log(`Part2 result is: ${result2}`);

    // return { result1, result2 };
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
    console.log(`Error: ${err}`);
  }
}

run();
