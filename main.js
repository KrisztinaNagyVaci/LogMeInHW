function startGame() {
  localStorage.clear();
  for (var i = 1; i <= 9; i = i + 1) {
    clearBox(i);
  };
  document.turn = "X";
  document.winner = null;
  setMessage(document.turn + " gets to start.");
};

function setPreviousGame() {
  document.turn = " ";
  for (var i = 1; i<=9; i++) {
    var square = localStorage.getItem(i);
    if (square != null) {
      var x = document.getElementById("s" + i);
      x.innerText = square;
    };
  };
  document.turn = "X";
  setMessage(document.turn + " gets to start.");
};

function setMessage(msg) {
  document.getElementById("message").innerText = msg;
};

function nextMove(square) {
  var place = document.getElementById("s" + square);
  this.square = square;
  if (document.winner != null) {
    setMessage(document.winner + " already won the game.")
  } else if (place.innerText === "") {
    place.innerText = document.turn;
    var id = this.square;
    localStorage.setItem(id, document.turn);
    computersTurn();
  } else {
    setMessage("That square is already taken.");
  };
};

function randomCalc() {
  var randInt = Math.random();
  randInt = Math.floor(randInt * 10);
  if (randInt === 0) {
    randomCalc();
  } else {
    moveOrRandom(randInt);
  };
};

function computersTurn() {
  if (checkForWinner(document.turn)) {
    setMessage("Congratulations, " + document.turn + "! You win!");
    document.winner = document.turn;
  } else if (document.turn === "X") {
    document.turn = "O";
    checkForDoubles();
  };
};

function moveOrRandom (number) {
  if (isEmpty(number)) {
    nextMove(number);
    document.turn = "X";
  } else {
    randomCalc();
  };
}

function checkForDoubles() {
  if (checkDouble(1, 2)) {
    moveOrRandom(3);
  } else if (checkDouble(1, 4)) {
    moveOrRandom(7);
  } else if (checkDouble(1, 5)) {
    moveOrRandom(9);
  } else if (checkDouble(2, 3)) {
    moveOrRandom(1);
  } else if (checkDouble(2, 5)) {
    moveOrRandom(8);
  } else if (checkDouble(3, 5)) {
    moveOrRandom(7);
  } else if (checkDouble(3, 6)) {
    moveOrRandom(9);
  } else if (checkDouble(4, 5)) {
    moveOrRandom(6);
  } else if (checkDouble(4, 7)) {
    moveOrRandom(1);
  } else if (checkDouble(5, 6)) {
    moveOrRandom(4);
  } else if (checkDouble(5, 7)) {
    moveOrRandom(3);
  } else if (checkDouble(7, 8)) {
    moveOrRandom(9);
  } else if (checkDouble(5, 8)) {
    moveOrRandom(2);
  } else if (checkDouble(5, 9)) {
    moveOrRandom(1);
  } else if (checkDouble(6, 9)) {
    moveOrRandom(3);
  } else if (checkDouble(8, 9)) {
    moveOrRandom(7);
  } else {
    randomCalc();
  };
};

function checkForWinner(move) {
  var result = false;
  if (checkRow(1, 2, 3, move) ||
      checkRow(4, 5, 6, move) ||
      checkRow(7, 8, 9, move) ||
      checkRow(1, 4, 7, move) ||
      checkRow(2, 5, 8, move) ||
      checkRow(3, 6, 9, move) ||
      checkRow(1, 5, 9, move) ||
      checkRow(3, 5, 7, move)) {
      result = true;
  };
  return result;
};

function checkRow(a, b, c, move) {
  var result = false;
  if (getBox(a) === move && getBox(b) === move && getBox(c) === move) {
    result = true;
  };
  return result;
};

function checkDouble(a, b) {
  var result = false;
  if (getBox(a) === "X" && getBox(b) === "X") {
    result = true;
  };
  return result;
};

function isEmpty(number) {
  var result = false;
  var place = document.getElementById("s" + number);
  if (place.innerText === "") {
    result = true;
  };
  return result;
};

function getBox(number) {
  return document.getElementById("s" + number).innerText;
};

function clearBox(number) {
  document.getElementById("s" + number).innerText = "";
};
