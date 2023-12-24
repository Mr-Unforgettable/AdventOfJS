import fs from "fs";

// Function to check for possible games
function getPossibleGames(input, redLimit, greenLimit, blueLimit) {
  // Split the games on newline
  const games = input.split("\n");

  // Store the possible games
  const possibleGames = [];

  // Iterate in each game
  for (const game of games) {
    // Sub-games
    const subsets = game.split(";");
    let isValid = true;

    // Iterate in each sub-games
    for (const subset of subsets) {
      // Process the cubes in the given subgames
      // [[count, color], ...[..., ...]]
      const cubes = subset
        .trim()
        .split(",")
        .map((item) => item.trim().split(" "));

      // Check for limit if exceeded then mark that game as invalid.
      for (const [count, color] of cubes) {
        const countNum = parseInt(count, 10);
        if (
          (color === "red" && countNum > redLimit) ||
          (color === "green" && countNum > greenLimit) ||
          (color === "blue" && countNum > blueLimit)
        ) {
          isValid = false;
          break;
        }
      }

      if (!isValid) {
        break;
      }
    }

    // However if game is valid, extract the gameID and push it in the possibleGames[]
    if (isValid) {
      const gameId = game.match(/Game (\d+):/);
      if (gameId) {
        possibleGames.push(parseInt(gameId[1], 10));
      }
    }
  }

  return possibleGames;
}

function partOne(file) {
  // Read the input from a file asynchronously
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading from file:", err);
      return;
    }

    // Set the red, green, blue limits
    const redLimit = 12;
    const greenLimit = 13;
    const blueLimit = 14;

    // Find the possible games and calculate the sum of their IDs
    const possibleGames = getPossibleGames(
      data,
      redLimit,
      greenLimit,
      blueLimit
    );
    const sumOfIDs = possibleGames.reduce((sum, gameId) => sum + gameId, 0);

    // Log the results
    // console.log("Possible games:", possibleGames);
    console.log("Sum of IDs:", sumOfIDs);
  });
}

// Function calls
// partOne("example.txt");
partOne("input.txt");

function getMinimumPower(input) {
  let games = input.split('\n');
  // console.log(games);
  const processedGames = [];

  for (const game of games) {
    const currentGame = {};
    currentGame.game = parseInt(game.split(':')[0].split(' ')[1]);
    // console.log(currentGame.game);

    const rounds = game.split(':')[1].split(';');
    // console.log(rounds);
    for (const round of rounds) {
      const colors = round.split(',');
      // console.log(colors);
      for (const color of colors) {
        const numbers = color.split(' ');
        // console.log(numbers);
        const colorValue = parseInt(numbers[1]);
        // console.log(colorValue);
        const colorName = numbers[2].trim();
        // console.log(colorName);

        if (!currentGame[colorName]) {
          currentGame[colorName] = colorValue;
        } else {
          if (colorValue > currentGame[colorName]) {
            currentGame[colorName] = colorValue;
          }
        }
        // console.log(currentGame);
      }
    }
    processedGames.push(currentGame);
    // console.log(processedGames);
  }

  for (const game of processedGames) {
    game.power = game.red * game.green * game.blue;
    // console.log(game.power);
  }

  const totalPower = processedGames.reduce((sum, curr) => sum + curr.power, 0);

  return totalPower;
}

// Read from the file asynchronously
function partTwo(file) {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        const result = getMinimumPower(data);
        console.log("Sum of the power of minimum sets:", result);
    });
}

// Function calls
// partTwo('example.txt');
partTwo('Input.txt');
