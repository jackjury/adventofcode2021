const fs = require("fs").promises;
const testTxt = "/Users/jackjury/code/aoc21/05/1/test.txt";
const inputTxt = "/Users/jackjury/code/aoc21/05/1/input.txt";

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
  let instructions = data.map((input) => {
    let instruction = input.split(" -> ");
    let start = instruction[0].split(",").map((num) => parseInt(num));
    let end = instruction[1].split(",").map((num) => parseInt(num));
    let output = {
      start,
      end,
      type: getLineType(start, end),
    };
    return output;
  });
  console.log(instructions);
  instructions = instructions.filter((instruction) => {
    if (instruction.type != "diag") {
      return true;
    }
  }); // Filter out the diags
  let lines = instructions.map((instruction) => {
    let line = drawLine(instruction);
    return line;
  });

  let occupied = lines.flat(1).map((pair) => pair.join());
  // let [grid, cross] = makeGrid(occupied);
  // console.log(cross.length);
  // console.log(grid);
  // let a = occupied.length;
  // a;
  // let unique = new Set(occupied);
  // let b = unique.size;
  // let answer = a - b;
  // console.log(answer);
  let crosses = new Set();
  let unique = new Set();
  occupied.forEach((point) => {
    if (unique.has(point)) {
      crosses.add(point);
    } else {
      unique.add(point);
    }
  });

  console.log(crosses.size);

  // for (let index = 0; index < occupied.length; index++) {
  //   let comparison = occupied.shift();
  //   occupied.forEach((element) => {
  //     if (element == comparison) {
  //       set.add(comparison);
  //       console.log(set.size);
  //     }
  //   });
  // }
  // console.log(set.size);
}

function getLineType(start, end) {
  switch (true) {
    case start[0] == end[0]:
      return "horz";
      break;
    case start[1] == end[1]:
      return "vert";
      break;
    default:
      return "diag";
      break;
  }
}

function drawLine(instruction) {
  let line = [];
  if (instruction.type == "vert") {
    // X increases
    if (instruction.start[0] > instruction.end[0]) {
      // Is Reverse
      for (let x = instruction.end[0]; x <= instruction.start[0]; x++) {
        line.push([x, instruction.start[1]]);
      }
      return line;
    } else {
      // Is Forward
      for (let x = instruction.start[0]; x <= instruction.end[0]; x++) {
        line.push([x, instruction.start[1]]);
      }
      return line;
    }
  }
  if (instruction.type == "horz") {
    // Y increase
    if (instruction.start[1] > instruction.end[1]) {
      // Is reverse
      for (let y = instruction.end[1]; y <= instruction.start[1]; y++) {
        line.push([instruction.start[0], y]);
      }
      return line;
    } else {
      // is forward
      for (let y = instruction.start[1]; y <= instruction.end[1]; y++) {
        line.push([instruction.start[0], y]);
      }
      return line;
    }
  }
}

function makeGrid(lines) {
  let cross = new Set();
  let grid = new Array(10);
  for (let index = 0; index < grid.length; index++) {
    grid[index] = new Array(10);
    for (let j = 0; j < grid[index].length; j++) {
      grid[index][j] = ".";
    }
  }

  lines.forEach((point) => {
    let [y, x] = point.split(",");
    if (grid[x][y] == ".") {
      grid[x][y] = 1;
    } else {
      cross.add(point);
      grid[x][y]++;
    }
  });
  let crossOutput = Array.from(cross);
  return [grid, crossOutput];
}

run();
