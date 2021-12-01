const fs = require("fs").promises;
const testTxt = "/Users/jackjury/code/aoc21/01/1/test.txt";
const inputTxt = "/Users/jackjury/code/aoc21/01/1/input.txt";

async function importTxt(file) {
  try {
    const data = await fs.readFile(file, "utf8");
    return data.split("\n").map((el) => parseInt(el));
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function run() {
  let data = await importTxt(inputTxt);
  console.log(data);
  let increaseCount = 0;
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    console.log(element);

    if (element > data[i - 1]) {
      increaseCount++;
    }
  }
  console.log(increaseCount);
}

run();
