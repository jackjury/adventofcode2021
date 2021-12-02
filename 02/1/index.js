const fs = require("fs").promises;
const testTxt = "/Users/jackjury/code/aoc21/02/1/test.txt";
const inputTxt = "/Users/jackjury/code/aoc21/02/1/input.txt";

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
  let data = await (
    await importTxt(inputTxt)
  ).map((instruction) => {
    let arr = instruction.split(" ");
    arr[1] = parseInt(arr[1]);
    return arr;
  });
  let horzontalPos = 0;
  let depthPos = 0;
  let aim = 0;
  for (let i = 0; i < data.length; i++) {
    const [direction, amount] = data[i];
    switch (direction) {
      case "forward":
        horzontalPos = horzontalPos + amount;
        depthPos = depthPos + aim * amount;
        break;
      case "down":
        aim = aim + amount;
        break;
      case "up":
        aim = aim - amount;
        break;
      default:
        break;
    }
  }
  console.log(horzontalPos * depthPos);
}

run();
