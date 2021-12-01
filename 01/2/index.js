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
  let sampleWindows = [];
  let index = 0;
  while (index < data.length - 2) {
    let window = data.slice(index, index + 3);
    window;
    let sum = window.reduce((a, b) => a + b, 0);
    console.log(sum);
    sampleWindows.push(sum);
    index++;
  }
  for (let i = 0; i < sampleWindows.length; i++) {
    const element = sampleWindows[i];
    console.log(element);

    if (element > sampleWindows[i - 1]) {
      increaseCount++;
    }
  }

  console.log(increaseCount);
}

run();
