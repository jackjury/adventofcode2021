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

// Refactored using the method from the below video:
// https://www.youtube.com/watch?v=-ihdC-AKqPM
// to make a more performant version that doesn't overflow the max array issue.

async function run() {
  let data = await await importTxt(inputTxt);
  let fishes = data;
  let queue = Array(9).fill(0); // Create a new array, with 9 elements to represent the days
  fishes.forEach((fish) => {
    queue[fish] == queue[fish]++;
  }); // Fill the queue with the current fishes
  console.log(queue);
  // Run a loop to simulate the life stages
  for (let i = 0; i < 256; i++) {
    const currentFishes = queue.shift(); // Get the number of fishes at zero
    queue.push(currentFishes); // add on the children
    queue[6] += currentFishes; // Add back in the parents
  }
  let total = queue.reduce((a, b) => a + b, 0); // Count the fishes in the array
  console.log(total);
}

run();
