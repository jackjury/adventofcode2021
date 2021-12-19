const fs = require("fs").promises;
const testTxt = "/Users/jackjury/code/aoc21/06/1/test.txt";
const inputTxt = "/Users/jackjury/code/aoc21/06/1/input.txt";

async function importTxt(file) {
  try {
    const data = await fs.readFile(file, "utf8");
    return data.split(",");
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function run() {
  let data = await await importTxt(inputTxt);
  console.log(data);
  let fishes = data;
  for (let index = 0; index < 80; index++) {
    let newArr = [];
    fishes.forEach((fish, index) => {
      if (fish == 0) {
        newArr.push(8);
        fishes[index] = 6;
      } else {
        fishes[index] = fish - 1;
      }
    });
    fishes = fishes.concat(newArr);
    console.log(fishes.length);
  }
  console.log(fishes.length);
}

run();
