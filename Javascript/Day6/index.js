import { readFileSync } from "node:fs";

function Part1(file) {
  let input = readFileSync(file, "utf-8");
  const lines = input.split("\n");

  let result = 1;
  const times = lines[0].split(" ").map(Number).filter(Boolean);
  const distances = lines[1].split(" ").map(Number).filter(Boolean);

  let currentBest = [];
  for (let i = 0; i < times.length; i++) {
    currentBest.push({
      time: times[i],
      distance: distances[i],
    });
  }
  // console.log(currentBest);

  for (let i = 0; i < currentBest.length; i++) {
    const time = currentBest[i].time;
    const distance = currentBest[i].distance;

    // Lets find all the possible permutations
    let runPermutations = [];
    for (let j = 0; j < time; j++) {
      let buttonHeld = j; // milliseconds
      let boatDist = buttonHeld * (time - buttonHeld);
      runPermutations.push({
        time: time,
        distance: boatDist,
      });
    }
    // console.log(runPermutations);

    let runsBeatsBest = 0;
    for (const run of runPermutations) {
      if (run.distance > distance) {
        runsBeatsBest++;
      }
    }

    // Possible ways
    result *= runsBeatsBest;
  }

  return result;
}

function Part2(file) {
  let input = readFileSync(file, "utf-8");
  const lines = input.split("\n");

  let result = 1;
  let times = lines[0].split(" ").map(Number).filter(Boolean);
  let distances = lines[1].split(" ").map(Number).filter(Boolean);

  times = Number(times.join(""));
  distances = Number(distances.join(""));

  let currentBest = [];
  currentBest.push({
    time: times,
    distance: distances,
  });
  // console.log(currentBest);

  for (let i = 0; i < currentBest.length; i++) {
    const time = currentBest[i].time;
    const distance = currentBest[i].distance;

    let runsBeatsBest = 0;
    for (let j = 0; j < time; j++) {
      let buttonHeld = j;
      let boatDist = buttonHeld * (time - buttonHeld);

      if (boatDist > distance) {
        runsBeatsBest++;
      }
    }

    result *= runsBeatsBest;
  }

  return result;
}

console.log(Part1("Example.txt"));
console.log(Part1("Input.txt"));

console.log(Part2("Example.txt"));
console.log(Part2("Input.txt"));
