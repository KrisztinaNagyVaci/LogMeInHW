// **************view*****************************

var view = (function(){

var messages = {
  start : " gets to start.",
  wonAlready : " already won the game.",
  squareTaken : "That square is already taken.",
  congrats : "Congratulations, ",
  win : "! You win!"
};

function drawOneSquare(place) {
  place.innerText = document.turn;
};

function drawAllSquares() {
  var list = model.getItemsfromLocalstorage()
  for (var i = 0; i <= 9; i++) {
    if (isSquareNull(list[i])) {
      var x = document.getElementById("s" + i);
      x.innerText = list[i];
    }
  };
};

function getBox(number) {
  return document.getElementById("s" + number).innerText;
};

function getSquareNumber(square) {
  return document.getElementById("s" + square);
};

function clearBox(number) {
  document.getElementById("s" + number).innerText = "";
};

function clearBoxes() {
  for (var i = 1; i <= 9; i++) {
    clearBox(i);
  };
};

function isSquareNull(square) {
  if (square != null) {
    return true;
  };
};

function isEmpty(number) {
  var result = false;
  var place = document.getElementById("s" + number);
  if (place.innerText === "") {
    result = true;
  };
  return result;
};

function setTurntoX() {
  return document.turn = "X";
};

function setTurntoO() {
  return document.turn = "O";
};

function setTurntoEmpty() {
  return document.turn = " ";
};

function setWinner() {
  document.winner = document.turn;
};

function setWinnertoNull() {
  return document.winner = null;
};

function isWinner() {
  if (document.winner != null) {
    return true;
  };
};

function setMessage(msg) {
  document.getElementById("message").innerText = msg;
};

return {
    messages: messages,
    drawOneSquare: drawOneSquare,
    drawAllSquares: drawAllSquares,
    getBox: getBox,
    getSquareNumber: getSquareNumber,
    clearBox: clearBox,
    clearBoxes: clearBoxes,
    isSquareNull: isSquareNull,
    isEmpty: isEmpty,
    setTurntoX: setTurntoX,
    setTurntoO: setTurntoO,
    setTurntoEmpty: setTurntoEmpty,
    setWinner: setWinner,
    setWinnertoNull: setWinnertoNull,
    isWinner: isWinner,
    setMessage: setMessage
  }

})();


// **************controller****************************

function startGame() {
  model.clearLocalstorage();
  view.clearBoxes();
  view.setTurntoX();
  view.setWinnertoNull();
  view.setMessage(document.turn + view.messages.start);
};

function setPreviousGame() {
  view.setTurntoEmpty();
  view.drawAllSquares();
  view.setTurntoX();
  view.setMessage(document.turn + view.messages.start);
};

function nextMove(square) {
  this.square = square;
  var place = view.getSquareNumber(square);
  if (view.isWinner()) {
    view.setMessage(document.winner + view.messages.wonAlready);
  } else if (view.isEmpty(square)) {
    view.drawOneSquare(place);
    model.setItemInLocalstorage(this.square, document.turn);
    computersTurn();
  } else {
    view.setMessage(view.messages.squareTaken);
  };
};

function computersTurn() {
  if (model.checkForWinner(document.turn)) {
    view.setMessage(view.messages.congrats + document.turn + view.messages.win);
    view.setWinner();
  } else if (document.turn === "X") {
    view.setTurntoO();
    model.checkForDoubles();
  };
};

// **********************model*********************************

var model = (function(){

var listOfLocalstorageItems = [];

function clearLocalstorage() {
  localStorage.clear();
};

function getItemsfromLocalstorage() {
  for (var i = 0; i <= 9; i++) {
    var square = localStorage.getItem(i);
    listOfLocalstorageItems.push(square);
  };
  return listOfLocalstorageItems;
};

function setItemInLocalstorage(square, turn) {
  localStorage.setItem(square, turn);
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

function moveOrRandom (number) {
  if (view.isEmpty(number)) {
    nextMove(number);
    view.setTurntoX()
  } else {
    randomCalc();
  };
};

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
  if (view.getBox(a) === move && view.getBox(b) === move && view.getBox(c) === move) {
    result = true;
  };
  return result;
};

function checkDouble(a, b) {
  var result = false;
  if (view.getBox(a) === "X" && view.getBox(b) === "X") {
    result = true;
  };
  return result;
};

return {
    listOfLocalstorageItems: listOfLocalstorageItems,
    clearLocalstorage: clearLocalstorage,
    getItemsfromLocalstorage: getItemsfromLocalstorage,
    setItemInLocalstorage: setItemInLocalstorage,
    randomCalc: randomCalc,
    moveOrRandom: moveOrRandom,
    checkForDoubles: checkForDoubles,
    checkForWinner: checkForWinner,
    checkRow: checkRow,
    checkDouble: checkDouble
  }

})();
