const canvas = document.getElementById("snake-game");
const ctx = canvas.getContext("2d");
var snakeDirection = "right";
var snakePositions = [[5, 0]];
var moveLock = false;
var queuedMove = "";
var appleCount = 10;
var startGameFlag = false;
var eatenFoodFlag = true;
var aliveFlag = true;
var restartFlag = false;
const gameOver = new Image();
gameOver.src = "img/gameover.png";

const pressRToRestart1 = new Image();
pressRToRestart1.src = "img/pressR1.png";

const pressRToRestart2 = new Image();
pressRToRestart2.src = "img/pressR2.png";

const controls = new Image();
controls.src = "img/controls.png";

const one = new Image();
one.src = "img/one.png";

const two = new Image();
two.src = "img/two.png";

const three = new Image();
three.src = "img/three.png";

const four = new Image();
four.src = "img/four.png";

const five = new Image();
five.src = "img/five.png";

const six = new Image();
six.src = "img/six.png";

const seven = new Image();
seven.src = "img/seven.png";

const eight = new Image();
eight.src = "img/eight.png";

const nine = new Image();
nine.src = "img/nine.png";

const zero = new Image();
zero.src = "img/zero.png";

const scoreImage = new Image();
scoreImage.src = "img/score.png";
var score = 1;

const musicButton = document.getElementById("music-button");
var musicFlag = false;

function musicToggle() {
  if (musicFlag) {
    musicButton.src = "img/musicOFF.png";
  } else {
    musicButton.src = "img/musicON.png";
  }
  musicFlag = !musicFlag;
}

const minusButton = document.getElementById("remove-apple-button");
minusButton.addEventListener("mousedown", minusMouseDown);
minusButton.addEventListener("mouseup", minusMouseUp);

function minusMouseDown() {
  minusButton.src = "img/minusPressed.png";
}

function minusMouseUp() {
  minusButton.src = "img/minus.png";
}

const plusButton = document.getElementById("add-apple-button");
plusButton.addEventListener("mousedown", plusMouseDown);
plusButton.addEventListener("mouseup", plusMouseUp);

function plusMouseDown() {
  plusButton.src = "img/plusPressed.png";
}

function plusMouseUp() {
  plusButton.src = "img/plus.png";
}

ctx.fillStyle = "#3f4f38";
ctx.fillRect(0, 0, 800, 800);

var gameState = Array.from(Array(20), () => new Array(20).fill(0));
gameState[5][0] = 1;

const drawAppleCountList = document.getElementById("apple-count");
const drawScoreCountList = document.getElementById("score-count");
document.getElementById("score-count").value = score;
drawScoreCount();

document.getElementById("apple-count").value = appleCount;
drawAppleCount();

var opacity = 0.5;
var opacityFlipSwitch = false;

var eatApple = new Audio("audio/eatApple.wav");

window.addEventListener("keydown", handleKeyPress);

window.addEventListener(
  "keydown",
  function (e) {
    if (
      ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
        e.code
      ) > -1
    ) {
      e.preventDefault();
    }
  },
  false
);

function appleCountManipulator(change) {
  appleCount = document.getElementById("apple-count").value;
  if (change) {
    if (appleCount < 400) appleCount++;
  } else if (appleCount > 1) {
    appleCount--;
  }
  document.getElementById("apple-count").value = appleCount;
  drawAppleCount();
}

function drawNumbers(list, numberString) {
  for (var i = 0; i < numberString.length; i++) {
    switch (numberString[i]) {
      case "0":
        list.appendChild(zero.cloneNode(true));
        break;
      case "1":
        list.appendChild(one.cloneNode(true));
        break;
      case "2":
        list.appendChild(two.cloneNode(true));
        break;
      case "3":
        list.appendChild(three.cloneNode(true));
        break;
      case "4":
        list.appendChild(four.cloneNode(true));
        break;
      case "5":
        list.appendChild(five.cloneNode(true));
        break;
      case "6":
        list.appendChild(six.cloneNode(true));
        break;
      case "7":
        list.appendChild(seven.cloneNode(true));
        break;
      case "8":
        list.appendChild(eight.cloneNode(true));
        break;
      case "9":
        list.appendChild(nine.cloneNode(true));
        break;
    }
  }
}

function drawAppleCount() {
  const appleCountString = appleCount.toString();
  drawAppleCountList.innerHTML = "";
  drawNumbers(drawAppleCountList, appleCountString);
}

function drawScoreCount() {
  const scoreCountString = score.toString();
  drawScoreCountList.innerHTML = "";
  drawNumbers(drawScoreCountList, scoreCountString);
}

function setSnakeDirection(desiredDirection, oppositeOfDesiredDirection) {
  if (snakeDirection != oppositeOfDesiredDirection) {
    if (!moveLock) {
      moveLock = true;
      snakeDirection = desiredDirection;
    } else {
      queuedMove = desiredDirection;
    }
  }
}

function handleKeyPress(event) {
  switch (event.keyCode) {
    case 39:
    case 68:
      setSnakeDirection("right", "left");
      break;
    case 37:
    case 65:
      setSnakeDirection("left", "right");
      break;
    case 38:
    case 87:
      setSnakeDirection("up", "down");
      break;
    case 40:
    case 83:
      setSnakeDirection("down", "up");
      break;
    case 82:
      if (!aliveFlag) {
        restartFlag = true;
      }
      break;
    case 32:
      if (aliveFlag) {
        startGameFlag = !startGameFlag;
      }
  }
}

function drawState() {
  for (var i = 0; i < 20; i++) {
    for (var j = 0; j < 20; j++) {
      switch (gameState[j][i]) {
        case 0:
          ctx.fillStyle = "#3f4f38";
          break;
        case 1:
          ctx.fillStyle = "#402d33";
          break;
        case 2:
          ctx.fillStyle = "#661e1e";
          break;
      }
      ctx.fillRect(i * 40, j * 40, 40, 40);
    }
  }
}

function processSnakeMovement(direction) {
  var first, second, conditional, coordinate;
  if (direction == "right" || direction == "down") {
    if (direction == "right") {
      first = 0;
      second = 1;
      coordinate = 1;
    } else {
      first = 1;
      second = 0;
      coordinate = 0;
    }
    conditional = +snakePositions[0][coordinate] + 1 < 20;
  } else {
    if (direction == "up") {
      first = -1;
      second = 0;
      coordinate = 0;
    } else {
      first = 0;
      second = -1;
      coordinate = 1;
    }
    conditional = +snakePositions[0][coordinate] - 1 >= 0;
  }

  if (conditional) {
    if (
      gameState[+snakePositions[0][0] + first][
        +snakePositions[0][1] + second
      ] == 0
    ) {
      var newPosition = [
        +snakePositions[0][0] + first,
        +snakePositions[0][1] + second,
      ];
      var oldPosition = snakePositions.pop();
      gameState[oldPosition[0]][oldPosition[1]] = 0;
      snakePositions.unshift(newPosition);
      gameState[snakePositions[0][0]][snakePositions[0][1]] = 1;
    } else if (
      gameState[+snakePositions[0][0] + first][
        +snakePositions[0][1] + second
      ] == 2
    ) {
      eatenFoodFlag = true;
      score++;
      if (musicFlag) {
        eatApple.cloneNode(true).play();
      }
      snakePositions.unshift([
        [+snakePositions[0][0] + first],
        [+snakePositions[0][1] + second],
      ]);
      gameState[snakePositions[0][0]][snakePositions[0][1]] = 1;
    } else {
      aliveFlag = false;
    }
  } else {
    aliveFlag = false;
  }
}

function updateState() {
  if (!moveLock && queuedMove != "") {
    snakeDirection = queuedMove;
    queuedMove = "";
  }
  processSnakeMovement(snakeDirection);
  moveLock = false;
}

function generateNewFood() {
  var emptyList = [];
  for (var i = 0; i < 20; i++) {
    for (var j = 0; j < 20; j++) {
      if (gameState[i][j] == 0) {
        emptyList.push([i, j]);
      }
    }
  }
  while (eatenFoodFlag && appleCount >= 0 && emptyList.length > 0) {
    let x = Math.floor(Math.random() * emptyList.length);
    gameState[emptyList[x][0]][emptyList[x][1]] = 2;
    emptyList.splice(x);
    appleCount--;
    if (appleCount == 0) {
      appleCount++;
      eatenFoodFlag = false;
    }
  }
}

function drawGameOver() {
  drawState();
  incrementOpacity();
  ctx.globalAlpha = opacity;
  ctx.drawImage(gameOver, 185, 200);
  ctx.drawImage(pressRToRestart1, 195, 410);
  ctx.globalAlpha = 1;
}

function incrementOpacity() {
  var increment = 0.04;
  if (opacity <= 0.2 || opacity >= 1) {
    opacityFlipSwitch = !opacityFlipSwitch;
  }
  if (opacityFlipSwitch) {
    opacity -= increment;
  } else {
    opacity += increment;
  }
}

function restartGame() {
  gameState = Array.from(Array(20), () => new Array(20).fill(0));
  eatenFoodFlag = true;
  aliveFlag = true;
  queuedMove = [];
  restartFlag = false;
  gameState[5][0] = 1;
  snakeDirection = "right";
  snakePositions = [[5, 0]];
  score = 1;
  appleCount = document.getElementById("apple-count").value;
  opacity = 0.5;
  opacityFlipSwitch = false;
  generateNewFood();
  drawState();
}

function gameLoop() {
  setTimeout(() => {
    if (startGameFlag) {
      if (aliveFlag) {
        if (eatenFoodFlag) {
          generateNewFood();
        }
        updateState();
        drawState();
        drawScoreCount();
      } else {
        if (restartFlag) {
          restartGame();
        }
        drawGameOver();
      }
    } else {
      if (aliveFlag) {
        drawState();
      } else {
        ctx.fillStyle = "#3f4f38";
        ctx.fillRect(0, 0, 800, 800);
      }
      incrementOpacity();
      ctx.globalAlpha = opacity;
      ctx.drawImage(controls, 200, 200);
      ctx.globalAlpha = 1;
    }
    requestAnimationFrame(gameLoop);
  }, 1000 / 20);
}
requestAnimationFrame(gameLoop);
