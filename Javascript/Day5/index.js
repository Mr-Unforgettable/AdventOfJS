// import fs from "fs";
// import util from "util";

// function part1(input) {
//     let [seeds, ...maps] = input.split("\n\n");
//     seeds = seeds.match(/\d+/g).map(Number);

//     for (let map of maps) {
//         map = map.split("\n").splice(1).map(line => line.match(/\d+/g).map(Number));
//         for (let i = 0; i < seeds.length; i++) {
//             const seed = seeds[i];
//             for (const [dest, source, len] of map) {
//                 if (seed >= source && seed < source + len) {
//                     seeds[i] = seeds[i] - source + dest;
//                     break;
//                 }
//             }
//         }
//     }

//     return (Math.min(...seeds));
// }

// // function part2() {

// // }

// const readFileAsync = util.promisify(fs.readFile);
// async function fileReaderFunc(file) {
//     try {
//         const data = (await readFileAsync(file, "utf-8")).trimEnd();
//         const result1 = part1(data);
//         // const result2 = part2(data);

//         console.log(`Result 1 is: ${result1}`);
//         // console.log(`Result 2 is: ${result2}`);
//     } catch (err) {
//         console.error("Error reading the file.");
//         throw err;
//     }
// }

// async function run() {
//     try {
//         await fileReaderFunc("Example.txt");
//         // await fileReaderFunc("Input.txt");
//     } catch (err) {
//         console.log("Error:", err);
//     }
// }

// run();

import { readFileSync } from "node:fs";

const input = readFileSync("./Input.txt", "utf8").trimEnd();

function solve1(input) {
  const lists = input
    .split(/[\n]*[a-z- ]*:[ ]*/g)
    .filter((l) => l)
    .map((l) =>
      l
        .trim()
        .split(/[\n]+/g)
        .map((n) => n.split(/[\n ]/).map((m) => parseInt(m, 10)))
    );

  const min = lists[0][0].reduce((min, seed) => {
    let val = seed;
    for (let i = 1; i < lists.length; i++) {
      const map = lists[i].find((m) => val >= m[1] && val < m[1] + m[2]);
      map && (val = val - map[1] + map[0]);
    }
    return Math.min(min, val);
  }, Infinity);
  console.log(min);
}

function solve2(input) {
  const lists = input.split(/[\n]*[a-z- ]*:[ ]*/g).filter((l) => l).map((l) => l.trim().split(/[\n]+/g).map((n) => n.split(/[\n ]/).map((m) => parseInt(m, 10))));
  const maxMap = lists[lists.length - 1].reduce((max, map) => Math.max(max, map[0] + map[2]), 0);
  let lowestPost;
  for (let pos = 0; pos < maxMap && isNaN(lowestPost); pos++) {
    let val = pos;
    for (let i = lists.length - 1; i > 0; i--) {
      const map = lists[i].find((m) => val >= m[0] && val < m[0] + m[2]);
      map && (val = val - map[0] + map[1]);
    }
    for(let i = 0; i < lists[0][0].length && isNaN(lowestPost); i += 2) {
      if(val >= lists[0][0][i] && val < lists[0][0][i] + lists[0][0][i + 1]) {
        lowestPost = pos
      }
    }
  }

  console.log(lowestPost);
};

solve1(input);
solve2(input);
