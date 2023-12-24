import fs from "fs";

function partOne(file) {
  const lines = fs.readFileSync(file, "utf-8").trim().split("\n");
  const values = lines.map((line) => {
    // Use RE to find the first and last occurance of digits
    const firstDigit = line.match(/\d/)?.[0]; // Match the first digit
    const lastDigit = [...line.matchAll(/\d/g)].pop()?.[0]; // Match the last digit

    // console.log(`First digits: ${firstDigit}`);
    // console.log(`Last digits: ${lastDigit}`);

    // Check if both first and last digits are found
    if (firstDigit !== undefined && lastDigit !== undefined) {
      // Concatenate the first and last digits
      return Number(`${firstDigit}${lastDigit}`);
    } else {
      // If any digit is not found, return 0
      return 0;
    }
  });

  // Sum the resulting array of numbers
  return values.reduce((sum, value) => sum + value, 0);
}

function partTwo(file) {
  const lines = fs.readFileSync(file, 'utf-8').trim().split('\n');
  const values = lines.map((line) => {
    // Regular Express to find the first and last digits in the string
    const firstDigitMatch = line.match(/\d|one|two|three|four|five|six|seven|eight|nine/)?.[0];
    const lastDigitMatch = [...line.matchAll(/\d|one|two|three|four|five|six|seven|eight|nine/g)].pop()?.[0];

    // console.log(`First Digit: ${firstDigitMatch}`);
    // console.log(`Last Digit: ${lastDigitMatch}`);

    // Check if both first and last digits are found
    if (firstDigitMatch !== undefined && lastDigitMatch !== undefined) {
      // Convert spelled-out digits to their numeric representation
      const numericFirstDigit = spelledOutToNumeric(firstDigitMatch);
      const numericLastDigit = spelledOutToNumeric(lastDigitMatch);

      // Return the concatenated numeric values
      return Number(`${numericFirstDigit}${numericLastDigit}`);
    } else {
      // If any digit is not found, return 0
      return 0;
    }
  });

  // Sum the resulting array of numbers
  return values.reduce((sum, value) => sum + value, 0);
}

// Helper function to convert spelled-out digits to numeric representation
function spelledOutToNumeric(s) {
  switch (s) {
    case "one": return 1;
    case "two": return 2;
    case "three": return 3;
    case "four": return 4;
    case "five": return 5;
    case "six": return 6;
    case "seven": return 7;
    case "eight": return 8;
    case "nine": return 9;
    default: return Number(s);
  }
}

// // Call the function with the path to your file
console.log(partOne("./example1.txt"));
console.log(partTwo("./example2.txt"));

// console.log(partOne("./input.txt"));
// console.log(partTwo("./input.txt"));
