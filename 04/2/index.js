const fs = require("fs").promises;
const testTxt = "/Users/jackjury/code/aoc21/04/1/test.txt";
const inputTxt = "/Users/jackjury/code/aoc21/04/1/input.txt";

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
  let calls = data.splice(0, 1)[0].split(",");
  console.log(calls);
  data.splice(0, 1); // Get rid of the first element
  let cards = [];

  while (data.indexOf("") > -1) {
    let card = data.splice(0, data.indexOf("") + 1);
    card.pop();
    cards.push(card);
  }
  cards.push(data); // add the last card
  console.log(cards);
  cards = cards.map((card, index) => processCard(card, index));
  let playedCards = cards.map((card) => {
    console.log(card);
    let output = {
      ...card,
      id: card.id,
      bestWin: playCard(card, calls),
    };
    return output;
  });
  console.log(playedCards);
  playedCards = playedCards.sort((a, b) => {
    if (a.bestWin > b.bestWin) {
      return -1;
    } else {
      return 1;
    }
  });
  console.log(playedCards);
  let score = calcScore(playedCards[0], calls);
  console.log(score);
}

function processCard(card, id) {
  let rows = card.map((row) => {
    let output = row.split(" ");
    output = output.filter((element) => {
      return element != "";
    });
    output = output.map((element) => parseInt(element));
    return output;
  });
  let cols = [];
  for (let row = 0; row < rows[0].length; row++) {
    let col = [];
    for (let index = 0; index < rows.length; index++) {
      const element = rows[index][row];
      col.push(element);
    }
    cols.push(col);
  }
  let output = {
    id,
    rows,
    cols,
  };
  return output;
}

function playLine(inputline, calls) {
  let line = inputline;
  let dabbed = [];
  for (let index = 0; index < calls.length; index++) {
    const call = calls[index];
    line.forEach((number, lineIndex) => {
      if (call == number) {
        console.log("Match!", call);
        dabbed.push(line[lineIndex]);
      }
    });
    if (dabbed.length == 5) {
      console.log("Win at: ", index);
      return index;
    }
  }
  return false;
}

function playCard(card, calls) {
  console.log(card);
  let bestWin;
  let lines = card.rows.concat(card.cols);
  lines.forEach((line) => {
    let win = playLine(line, calls);
    console.log(win);
    if (!bestWin || win < bestWin) {
      bestWin = win;
    }
  });
  console.log(card.id, "wins at", bestWin);
  return bestWin;
}

function calcScore(card, calls) {
  console.log(calls);
  calls.splice(card.bestWin + 1);
  calls = calls.map((call) => parseInt(call));
  console.log(calls);
  let lines = card.rows.concat(card.cols);
  lines = lines[0].concat(
    lines[1],
    lines[2],
    lines[3],
    lines[4],
    lines[5],
    lines[6],
    lines[7],
    lines[8],
    lines[9]
  );
  lines = lines.map((number) => parseInt(number));
  lines = new Set(lines);
  console.log(lines);
  console.log();
  // go through the calls and remove all from the lines
  calls.forEach((number) => {
    lines.delete(number);
  });
  let linesArr = Array.from(lines);
  let sum = linesArr.reduce((a, b) => a + b);
  console.log(sum);
  let lastCalled = calls[card.bestWin];
  let answer = lastCalled * sum;
  return answer;
}

run();
