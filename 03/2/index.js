const fs = require("fs").promises;
const testTxt = "/Users/jackjury/code/aoc21/03/2/test.txt";
const inputTxt = "/Users/jackjury/code/aoc21/03/2/input.txt";

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

  let o2 = findOxygenRating(data);
  o2 = parseInt(o2[0].join(""), 2);
  console.log(o2);
  let co2 = parseInt(findco2Rating(data)[0].join(""), 2);
  console.log(co2);
  let answer = o2 * co2;
  console.log(answer);
}
run();

function findOxygenRating(data) {
  console.log("Oxygen: ", data);
  let col = 0;
  for (let col = 0; col < data[0].length; col++) {
    let ones = null;
    let zeros = null;
    for (let row = 0; row < data.length; row++) {
      const element = data[row][col];
      if (element == 0) {
        zeros++;
      } else {
        ones++;
      }
    }
    if (ones >= zeros) {
      console.log("One is most significant bit");
      data = returnIf(data, 1, col);
    } else {
      console.log("Zero is most significant bit");
      data = returnIf(data, 0, col);
    }
  }
  return data;
}

function findco2Rating(data) {
  console.log("CO2: ", data);
  let col = 0;
  for (let col = 0; col < data[0].length; col++) {
    let ones = null;
    let zeros = null;
    if (data.length > 1) {
      for (let row = 0; row < data.length; row++) {
        const element = data[row][col];
        if (element == 0) {
          zeros++;
        } else {
          ones++;
        }
      }
      if (ones >= zeros) {
        console.log("One is most significant bit");
        data = returnIf(data, 0, col);
        console.log(data);
      } else {
        console.log("Zero is most significant bit");
        data = returnIf(data, 1, col);
      }
    }
  }
  return data;
}

function returnIf(inputArr, target, targetIndex) {
  let output = [];
  inputArr.forEach((element, index) => {
    if (element[targetIndex] == target) {
      console.log(element, index);
      output.push(element);
    }
  });
  return output;
}
// 00100
// 11110
// 10110
// 10111
// 10101
// 01111
// 00111
// 11100
// 10000
// 11001
// 00010
// 01010
