import Game from "./game";

const hiddenModal = document.querySelector(".hidden-modal");
const modal = document.querySelector(".modal");
const shipModelContainer = document.querySelector(".made-ships-container");
const computerContainer = document.querySelectorAll(".board-container")[0];
const humanContainer = document.querySelectorAll(".board-container")[1];
const computerImagesContainer = document.getElementById("images-computer");
const humanImagesContainer = document.getElementById("images-human");
const btnNewGame = document.getElementById("btn-new-game");
const computerPara = document.getElementById("computer-ships");
const humanPara = document.getElementById("human-ships");
const ships = document.querySelectorAll(".ship");
const btnRotate = document.getElementById("btn-rotate");
const winnerH2 = document.getElementById("winner");
const computerName = document.getElementById("name-computer");
const humanName = document.getElementById("name-human");

let isVertical = false;
let draggedShip;
let draggedShipLength;
let draggedShipDireciton;
let selectedShipName;
let selectedShipIndex;
let x;
let y;

const game1 = Game();
const games = [game1];

function rotateShips() {
  shipModelContainer.classList.toggle("vertical-models");
  isVertical = !isVertical;
  ships.forEach((ship) => {
    ship.classList.toggle("vertical");
    if (isVertical) {
      ship.dataset.direction = 1;
    } else if (!isVertical) {
      ship.dataset.direction = 0;
    }
  });
}

function dragStart(e) {
  draggedShip = e.target;
  draggedShipLength = draggedShip.children.length;
  draggedShipDireciton = Number(e.target.dataset.direction);
}
function dragOver(e) {
  e.preventDefault();
}

function dragDrop(e) {
  e.preventDefault();
  const draggedClassIndex = Array.from(humanContainer.children).indexOf(
    e.target
  );
  if (isVertical) {
    for (let i = 0; i < draggedShipLength; i++) {
      const squareBelowSelected =
        humanContainer.children[
          draggedClassIndex + 10 * i - selectedShipIndex * 10
        ];

      if (squareBelowSelected.className !== "default") {
        return;
      }
    }
    x = Number(e.target.dataset.key.charAt(0)) - selectedShipIndex;
    y = Number(e.target.dataset.key.charAt(2));
    const shipClass = selectedShipName.slice(0, -8);
    e.target.classList.add(shipClass);
  } else if (!isVertical) {
    for (let i = 0; i < draggedShipLength; i++) {
      const squareNextToSelected =
        humanContainer.children[draggedClassIndex + i];
      if (squareNextToSelected.className !== "default") {
        return;
      }
    }

    x = Number(e.target.dataset.key.charAt(0));
    y = Number(e.target.dataset.key.charAt(2)) - selectedShipIndex;
    const shipClass = selectedShipName.slice(0, -2);
    e.target.classList.add(shipClass);
  }

  placeShipOnHumanboard();
  if (
    games[games.length - 1].humanGameboard.board[x][y] === draggedShipLength
  ) {
    draggedShip.style.display = "none";
  }
  if (games[games.length - 1].humanGameboard.shipsOnBoard.length === 5) {
    startGame();
  }
}

function addClassToSquare(board, i, j, box) {
  switch (board[i][j]) {
    case 1:
      box.classList.add("patrol-boat");
      break;
    case 2:
      box.classList.add("submarine");
      break;
    case 3:
      box.classList.add("destroyer");
      break;
    case 4:
      box.classList.add("battleship");
      break;
    case 5:
      box.classList.add("carrier");
      break;
    case "x":
      box.classList.add("hit");
      break;
    case "o":
      box.classList.add("miss");
      break;
    default:
      box.classList.add("default");
  }
}

const renderHumanBoard = (board, container) => {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const box = document.createElement("div");
      box.addEventListener("dragstart", dragStart);
      box.addEventListener("dragover", dragOver);
      box.addEventListener("drop", dragDrop);
      box.setAttribute("data-key", `${[i, j]}`);
      addClassToSquare(board, i, j, box);
      container.appendChild(box);
    }
  }
};

function attack(board, square, game) {
  const coordinateToAttack = square.dataset.key.split(",");
  const xCoordinate = coordinateToAttack[0];
  const yCoordinate = coordinateToAttack[1];

  game.attackThisTurn(xCoordinate, yCoordinate);
  addClassToSquare(board, xCoordinate, yCoordinate, square);
  square.classList.add("clicked");
}

const renderComputerBoard = (board, container, onGame) => {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const box = document.createElement("div");
      box.setAttribute("data-key", `${[i, j]}`);
      box.addEventListener(
        "click",
        () => {
          attack(board, box, onGame);
          humanContainer.replaceChildren();
          renderHumanBoard(onGame.humanGameboard.board, humanContainer);
        },
        { once: true }
      );
      container.appendChild(box);
    }
  }
};

function placeShipOnHumanboard() {
  const currentGame = games[games.length - 1];
  currentGame.placeImportedShipAt({
    x,
    y,
    board: currentGame.humanGameboard,
    shipLength: draggedShipLength,
    direction: draggedShipDireciton,
  });
  humanContainer.replaceChildren();
  renderHumanBoard(currentGame.humanGameboard.board, humanContainer);
}

function placeShipOnComputerboard() {
  const currentGame = games[games.length - 1];
  do {
    currentGame.placeImportedShipAt({
      x: Math.floor(Math.random() * (10 - 0 + 1)) + 0,
      y: Math.floor(Math.random() * (10 - 0 + 1)) + 0,
      board: currentGame.computerGameboard,
      shipLength: currentGame.computerGameboard.availableShips[0],
      direction: Math.floor(Math.random() * 2),
    });

    computerContainer.replaceChildren();
    renderComputerBoard(
      currentGame.computerGameboard.board,
      computerContainer,
      currentGame
    );
  } while (currentGame.computerGameboard.shipsOnBoard.length <= 4);
}

function renderShipImages() {
  for (let i = 0; i < 5; i++) {
    computerImagesContainer.textContent = "";
    humanImagesContainer.textContent = "";

    for (let j = 0; j < 5; j++) {
      const computerShipImg = new Image();
      const humanShipImg = new Image();
      const shipNames = [
        "boat",
        "submarine",
        "destroyer",
        "battleship",
        "carrier",
      ];

      computerShipImg.style.border = "1px solid red";
      humanShipImg.style.border = "1px solid blue";
      computerShipImg.src = `./imgs/C${shipNames[j]}.png`;
      humanShipImg.src = `./imgs/H${shipNames[j]}.png`;

      computerImagesContainer.appendChild(computerShipImg);
      humanImagesContainer.appendChild(humanShipImg);
    }
  }
}

function displaySunkImage(sunkArray, shipImages, letter) {
  sunkArray.forEach((ship) => {
    shipImages.forEach((image) => {
      const addSunkClass = () => image.classList.add("sunk");
      if (ship.shipLength === 5 && image.src.includes(`${letter}carrier`)) {
        addSunkClass();
      } else if (
        ship.shipLength === 4 &&
        image.src.includes(`${letter}battleship`)
      ) {
        addSunkClass();
      } else if (
        ship.shipLength === 3 &&
        image.src.includes(`${letter}destroyer`)
      ) {
        addSunkClass();
      } else if (
        ship.shipLength === 2 &&
        image.src.includes(`${letter}submarine`)
      ) {
        addSunkClass();
      } else if (ship.shipLength === 1 && image.src.includes(`${letter}boat`)) {
        addSunkClass();
      }
    });
  });
}

function greyOutSunkShips(currentGame) {
  const sunkComputerShips = currentGame.computerGameboard.shipsOnBoard.filter(
    (ship) => ship.isSunk() === true
  );
  const sunkHumanShips = currentGame.humanGameboard.shipsOnBoard.filter(
    (ship) => ship.isSunk() === true
  );
  const computerShipImages = Array.from(computerImagesContainer.children);
  const humanShipImages = Array.from(humanImagesContainer.children);

  displaySunkImage(sunkComputerShips, computerShipImages, "C");
  displaySunkImage(sunkHumanShips, humanShipImages, "H");
}

function restoreImageClass() {
  const computerShipImages = Array.from(computerImagesContainer.children);
  const humanShipImages = Array.from(humanImagesContainer.children);

  computerShipImages.forEach((image) => image.classList.remove("sunk"));
  humanShipImages.forEach((image) => image.classList.remove("sunk"));
}

function renderOtherElements() {
  const currentGame = games[games.length - 1];
  computerPara.textContent = `Ships on Computer board: ${currentGame.computerGameboard.shipsOnBoard.length}`;
  computerName.textContent = `Player 1: ${currentGame.computer.playerName}`;
  humanPara.textContent = `Ships on Human board: ${currentGame.humanGameboard.shipsOnBoard.length}`;
  humanName.textContent = `Player 2: ${currentGame.human.playerName}`;
}

function startGame() {
  const currentGame = games[games.length - 1];
  if (currentGame.humanGameboard.shipsOnBoard.length !== 5) {
    alert("Please place every ship on the board");
    return false;
  }
  placeShipOnComputerboard();
  modal.style.display = "block";
  return true;
}

function playNewGame() {
  hiddenModal.classList.remove("visible");
  ships.forEach((ship) => {
    ship.style.display = "flex";
  });
  restoreImageClass();
  const game2 = Game();
  computerContainer.textContent = "";
  humanContainer.textContent = "";
  renderComputerBoard(game2.computerGameboard.board, computerContainer, game2);
  renderHumanBoard(game2.humanGameboard.board, humanContainer);
  computerContainer.style.pointerEvents = "auto";
  modal.style.display = "none";
  games.push(game2);
}

function gameOver() {
  const currentGame = games[games.length - 1];
  if (currentGame.isGameFinished() === true) {
    if (currentGame.computerGameboard.areAllShipsSunk() === true) {
      winnerH2.textContent = `You Won!`;
      hiddenModal.classList.add("visible");
    } else if (currentGame.humanGameboard.areAllShipsSunk()) {
      winnerH2.textContent = `Computer Won!`;
      hiddenModal.classList.add("visible");
    }
    computerContainer.style.pointerEvents = "none";
  }
}

function watchBoardsOnChange() {
  setInterval(() => {
    setTimeout(() => {
      renderOtherElements();
      renderShipImages();
      greyOutSunkShips(games[games.length - 1]);
      gameOver(games[games.length - 1]);
    }, 100);
  }, 500);
}

btnRotate.addEventListener("click", rotateShips);
btnNewGame.addEventListener("click", playNewGame);

ships.forEach((ship) => ship.addEventListener("dragstart", dragStart));
ships.forEach((ship) =>
  ship.addEventListener("mousedown", (e) => {
    selectedShipName = e.target.id;
    selectedShipIndex = Number(e.target.id.substr(-1));
  })
);

renderComputerBoard(game1.computerGameboard.board, computerContainer, game1);
renderHumanBoard(game1.humanGameboard.board, humanContainer);
watchBoardsOnChange();
