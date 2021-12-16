const fs = require("fs").promises;
const testTxt = "/Users/jackjury/code/aoc21/03/1/test.txt";
const inputTxt = "/Users/jackjury/code/aoc21/03/1/input.txt";

async function importTxt(file) {
  try {
    const data = await fs.readFile(file, "utf8");
    return data.split("\n");
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function run() {
  let data = await await importTxt(inputTxt);
  data = data.map((ele) => {
    let output = ele.split("").map((innerEle) => parseInt(innerEle));
    return output;
  });
  let col;
  let output = [];
  for (col = 0; col < data[0].length; col++) {
    let zeros = 0;
    let ones = 0;
    for (let row = 0; row < data.length; row++) {
      const element = data[row][col];
      if (element === 0) {
        zeros++;
      } else {
        ones++;
      }
    }
    if (zeros > ones) {
      output.push(0);
    } else {
      output.push(1);
    }
  }
  let gamma = parseInt(output.join(""), 2);
  let epsilon = output.map((digit) => {
    if (digit === 0) {
      return 1;
    } else {
      return 0;
    }
  });
  epsilon = parseInt(epsilon.join(""), 2);
  gamma;
  epsilon;
  let answer = gamma * epsilon;
  console.log(answer, answer);
}

run();
