import fs from "fs";
import util from "util";

function Part1(input) {
  const lines = input.split("\n");

  const hands = [];
  for (let line of lines) {
    line = line.split(" ");
    const cards = line[0].split("");
    const bid = Number(line[1]);

    hands.push({ cards: cards, bid: bid });
  }

  // console.log(hands);
  const cardRanks = [
    "A",
    "K",
    "Q",
    "J",
    "T",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
    "1",
  ]; // Strongest -> Weakest
  const handTypes = ["5OAK", "4OAK", "FH", "3OAK", "2P", "1P", "HC"]; // Strongest -> Weakest

  for (let i = 0; i < hands.length; i++) {
    hands[i].stats = { type: "", rank: 0 };

    const frequencies = {};
    for (const card of hands[i].cards) {
      if (frequencies[card]) {
        frequencies[card]++;
      } else {
        frequencies[card] = 1;
      }
    }

    // console.log(frequencies);
    const frequencyValues = Object.values(frequencies);

    if (frequencyValues.length === 1) {
      hands[i].stats.type = "5OAK";
    } else if (frequencyValues.length === 2) {
      if (frequencyValues.includes(4)) {
        hands[i].stats.type = "4OAK";
      } else {
        hands[i].stats.type = "FH";
      }
    } else if (frequencyValues.length === 3) {
      if (frequencyValues.includes(3)) {
        hands[i].stats.type = "3OAK";
      } else {
        hands[i].stats.type = "2P";
      }
    } else if (frequencyValues.length === 4) {
      hands[i].stats.type = "1P";
    } else {
      hands[i].stats.type = "HC";
    }
  }
  // console.log(hands);

  hands.sort((a, b) => {
    if (handTypes.indexOf(a.stats.type) > handTypes.indexOf(b.stats.type)) {
      return -1;
    } else if (
      handTypes.indexOf(a.stats.type) < handTypes.indexOf(b.stats.type)
    ) {
      return 1;
    } else {
      for (let i = 0; i < a.cards.length; i++) {
        if (cardRanks.indexOf(a.cards[i]) > cardRanks.indexOf(b.cards[i])) {
          return -1;
        } else if (
          cardRanks.indexOf(a.cards[i]) < cardRanks.indexOf(b.cards[i])
        ) {
          return 1;
        }
      }
    }
  });

  for (let i = 0; i < hands.length; i++) {
    hands[i].stats.rank = i + 1;
  }

  let result = 0;
  for (const hand of hands) {
    result += hand.stats.rank * hand.bid;
  }

  return result;
}

const readFileAsync = util.promisify(fs.readFile);
async function fileReaderFunc(file) {
  try {
    const data = await readFileAsync(file, "utf-8");
    const result1 = Part1(data);

    console.log(`Part1 result is: ${result1}`);
  } catch (err) {
    console.error("Unable to read file", err);
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
