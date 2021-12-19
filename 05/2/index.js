const fs = require("fs").promises;
const testTxt = "/Users/jackjury/code/aoc21/05/1/test.txt";
const inputTxt = "/Users/jackjury/code/aoc21/05/1/input.txt";

async function importTxt(file) {
  try {
    const data = await fs.readFile(file, "utf8");
    return data.split("\n");
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function run() {
  let data = await await importTxt(inputTxt);
  console.log(data);
}

run();
