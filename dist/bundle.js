/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ "./src/player.js");




const Game = () => {
  const computerGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();
  const humanGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();

  const placeImportedShipAt = ({ x, y, board, shipLength, direction }) =>
    board.placeShipAt(x, y, (0,_ship__WEBPACK_IMPORTED_MODULE_1__["default"])(shipLength), direction);

  const computer = (0,_player__WEBPACK_IMPORTED_MODULE_2__["default"])("Computer", humanGameboard);
  const human = (0,_player__WEBPACK_IMPORTED_MODULE_2__["default"])("Human", computerGameboard);
  const attackThisTurn = (x, y) => {
    human.attack(x, y);
    computer.attack(x, y);
  };

  const isGameFinished = () => {
    if (
      (computerGameboard.areAllShipsSunk() === true &&
        computerGameboard.shipsOnBoard.length !== 0) ||
      (humanGameboard.areAllShipsSunk() === true &&
        humanGameboard.shipsOnBoard.length !== 0)
    ) {
      return true;
    }
    return false;
  };

  return {
    placeImportedShipAt,
    computer,
    human,
    computerGameboard,
    humanGameboard,
    attackThisTurn,
    isGameFinished,
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);


/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Gameboard = () => {
  const board = [
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
  ];
  const shipsOnBoard = [];
  const availableShips = [5, 4, 3, 2, 1]; // only used by computer
  const placeShipAt = (x, y, ship, direction) => {
    const maxX = 10 - ship.shipLength;
    const maxY = 10 - ship.shipLength;
    let isVertical;

    direction === 0 ? (isVertical = false) : (isVertical = true);
    if (!isVertical && y > maxY) {
      return false;
    }
    if (isVertical && x > maxX) {
      return false;
    }
    if (board[x] === undefined || board[x][y] === undefined) {
      return false;
    }
    for (let i = 0; i < ship.shipLength; i++) {
      if (!isVertical) {
        if (board[x][y + i] !== "" && board[x][y + i] !== undefined) {
          return false;
        }
        board[x][y + i] = ship.shipBody[i];
      } else if (isVertical) {
        if (board[x + i][y] !== "" && board[x + i][y] !== undefined) {
          return false;
        }
        board[x + i][y] = ship.shipBody[i];
      }
    }

    shipsOnBoard.push(ship);
    availableShips.shift();
    return board;
  };
  const receiveAttack = (x, y) => {
    if (board[x][y] !== "" && board[x][y] !== "o") {
      const hitShip = shipsOnBoard.filter(
        (ship) => ship.shipLength === board[x][y]
      );
      hitShip[0].hit((hitShip[0].counterOfHits += 1));
      board[x][y] = "x";
      return board;
    }
    board[x][y] = "o";
    return board;
  };
  const areAllShipsSunk = () => {
    const areAllSunk = shipsOnBoard.every((ship) => ship.isSunk() === true);
    if (areAllSunk === true) {
      return true;
    }
    return false;
  };

  return {
    board,
    shipsOnBoard,
    placeShipAt,
    receiveAttack,
    areAllShipsSunk,
    availableShips,
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);


/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Player = (name, enemyGameboard) => {
  const playerName = name;
  const attack = (x, y) => {
    if (playerName === "Computer") {
      //
      const randomX = Math.floor(Math.random() * 10);
      const randomY = Math.floor(Math.random() * 10);
      if (
        enemyGameboard.board[randomX][randomY] !== "o" &&
        enemyGameboard.board[randomX][randomY] !== "x"
      ) {
        const target = enemyGameboard.receiveAttack(randomX, randomY);
        return target;
      }
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          if (
            enemyGameboard.board[i][j] !== "o" &&
            enemyGameboard.board[i][j] !== "x"
          ) {
            const target = enemyGameboard.receiveAttack(i, j);
            return target;
          }
        }
      }
    }
    const target = enemyGameboard.receiveAttack(x, y);
    return target;
  };
  return {
    attack,
    playerName,
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);


/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Ship = (length) => {
  const shipLength = length;
  const shipBody = new Array(length).fill(length);
  const counterOfHits = -1;
  const hit = (num) => {
    shipBody[num] = "x";
    return shipBody;
  };
  const isSunk = () => {
    const isEveryPartHit = shipBody.every((part) => part === "x");
    return isEveryPartHit;
  };

  return {
    shipLength,
    shipBody,
    counterOfHits,
    hit,
    isSunk,
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");


const hiddenModal = document.querySelector(".hidden-modal");
const modal = document.querySelector(".modal");
const shipModelContainer = document.querySelector(".made-ships-container");
const [computerContainer, humanContainer] =
  document.querySelectorAll(".board-container");
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

const game1 = (0,_game__WEBPACK_IMPORTED_MODULE_0__["default"])();
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
  renderOtherElements();

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
  const [xCoordinate, yCoordinate] = coordinateToAttack;

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
          updateContainer(onGame.humanGameboard.board, humanContainer);
          onBoardsChange();
        },
        { once: true }
      );
      renderOtherElements();
      container.appendChild(box);
    }
  }
};

function updateContainer(board, container, game) {
  if (game === undefined) {
    container.replaceChildren();
    renderHumanBoard(board, container);
  } else {
    container.replaceChildren();
    renderComputerBoard(board, container, game);
  }
}

function placeShipOnHumanboard() {
  const currentGame = games[games.length - 1];
  currentGame.placeImportedShipAt({
    x,
    y,
    board: currentGame.humanGameboard,
    shipLength: draggedShipLength,
    direction: draggedShipDireciton,
  });
  updateContainer(currentGame.humanGameboard.board, humanContainer);
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

    updateContainer(
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
  const game2 = (0,_game__WEBPACK_IMPORTED_MODULE_0__["default"])();
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

function onBoardsChange() {
  greyOutSunkShips(games[games.length - 1]);
  gameOver(games[games.length - 1]);
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
renderOtherElements();
renderShipImages();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QW9DLGFBQWE7O0FBRWpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQsT0FBTztBQUNoRTtBQUNBLFFBQVE7QUFDUjtBQUNBLDhCQUE4QixPQUFPO0FBQ3JDO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSw4QkFBOEIsT0FBTztBQUNyQztBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsOEJBQThCLE9BQU87QUFDckM7QUFDQTtBQUNBLFFBQVEsd0RBQXdELE9BQU87QUFDdkU7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBeUQsa0RBQWtEO0FBQzNHLDBDQUEwQyxnQ0FBZ0M7QUFDMUUsbURBQW1ELCtDQUErQztBQUNsRyx1Q0FBdUMsNkJBQTZCO0FBQ3BFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsZ0JBQWdCLGlEQUFJO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90NC1wcm9qZWN0LWJhdHRsZXNoaXAvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly90NC1wcm9qZWN0LWJhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL3Q0LXByb2plY3QtYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vdDQtcHJvamVjdC1iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vdDQtcHJvamVjdC1iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Q0LXByb2plY3QtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdDQtcHJvamVjdC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdDQtcHJvamVjdC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdDQtcHJvamVjdC1iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuXG5jb25zdCBHYW1lID0gKCkgPT4ge1xuICBjb25zdCBjb21wdXRlckdhbWVib2FyZCA9IEdhbWVib2FyZCgpO1xuICBjb25zdCBodW1hbkdhbWVib2FyZCA9IEdhbWVib2FyZCgpO1xuXG4gIGNvbnN0IHBsYWNlSW1wb3J0ZWRTaGlwQXQgPSAoeyB4LCB5LCBib2FyZCwgc2hpcExlbmd0aCwgZGlyZWN0aW9uIH0pID0+XG4gICAgYm9hcmQucGxhY2VTaGlwQXQoeCwgeSwgU2hpcChzaGlwTGVuZ3RoKSwgZGlyZWN0aW9uKTtcblxuICBjb25zdCBjb21wdXRlciA9IFBsYXllcihcIkNvbXB1dGVyXCIsIGh1bWFuR2FtZWJvYXJkKTtcbiAgY29uc3QgaHVtYW4gPSBQbGF5ZXIoXCJIdW1hblwiLCBjb21wdXRlckdhbWVib2FyZCk7XG4gIGNvbnN0IGF0dGFja1RoaXNUdXJuID0gKHgsIHkpID0+IHtcbiAgICBodW1hbi5hdHRhY2soeCwgeSk7XG4gICAgY29tcHV0ZXIuYXR0YWNrKHgsIHkpO1xuICB9O1xuXG4gIGNvbnN0IGlzR2FtZUZpbmlzaGVkID0gKCkgPT4ge1xuICAgIGlmIChcbiAgICAgIChjb21wdXRlckdhbWVib2FyZC5hcmVBbGxTaGlwc1N1bmsoKSA9PT0gdHJ1ZSAmJlxuICAgICAgICBjb21wdXRlckdhbWVib2FyZC5zaGlwc09uQm9hcmQubGVuZ3RoICE9PSAwKSB8fFxuICAgICAgKGh1bWFuR2FtZWJvYXJkLmFyZUFsbFNoaXBzU3VuaygpID09PSB0cnVlICYmXG4gICAgICAgIGh1bWFuR2FtZWJvYXJkLnNoaXBzT25Cb2FyZC5sZW5ndGggIT09IDApXG4gICAgKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcGxhY2VJbXBvcnRlZFNoaXBBdCxcbiAgICBjb21wdXRlcixcbiAgICBodW1hbixcbiAgICBjb21wdXRlckdhbWVib2FyZCxcbiAgICBodW1hbkdhbWVib2FyZCxcbiAgICBhdHRhY2tUaGlzVHVybixcbiAgICBpc0dhbWVGaW5pc2hlZCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7XG4iLCJjb25zdCBHYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IGJvYXJkID0gW1xuICAgIFtcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiXSxcbiAgICBbXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIl0sXG4gICAgW1wiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCJdLFxuICAgIFtcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiXSxcbiAgICBbXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIl0sXG4gICAgW1wiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCJdLFxuICAgIFtcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiXSxcbiAgICBbXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIl0sXG4gICAgW1wiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCJdLFxuICAgIFtcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiXSxcbiAgXTtcbiAgY29uc3Qgc2hpcHNPbkJvYXJkID0gW107XG4gIGNvbnN0IGF2YWlsYWJsZVNoaXBzID0gWzUsIDQsIDMsIDIsIDFdOyAvLyBvbmx5IHVzZWQgYnkgY29tcHV0ZXJcbiAgY29uc3QgcGxhY2VTaGlwQXQgPSAoeCwgeSwgc2hpcCwgZGlyZWN0aW9uKSA9PiB7XG4gICAgY29uc3QgbWF4WCA9IDEwIC0gc2hpcC5zaGlwTGVuZ3RoO1xuICAgIGNvbnN0IG1heFkgPSAxMCAtIHNoaXAuc2hpcExlbmd0aDtcbiAgICBsZXQgaXNWZXJ0aWNhbDtcblxuICAgIGRpcmVjdGlvbiA9PT0gMCA/IChpc1ZlcnRpY2FsID0gZmFsc2UpIDogKGlzVmVydGljYWwgPSB0cnVlKTtcbiAgICBpZiAoIWlzVmVydGljYWwgJiYgeSA+IG1heFkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGlzVmVydGljYWwgJiYgeCA+IG1heFgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGJvYXJkW3hdID09PSB1bmRlZmluZWQgfHwgYm9hcmRbeF1beV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuc2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoIWlzVmVydGljYWwpIHtcbiAgICAgICAgaWYgKGJvYXJkW3hdW3kgKyBpXSAhPT0gXCJcIiAmJiBib2FyZFt4XVt5ICsgaV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBib2FyZFt4XVt5ICsgaV0gPSBzaGlwLnNoaXBCb2R5W2ldO1xuICAgICAgfSBlbHNlIGlmIChpc1ZlcnRpY2FsKSB7XG4gICAgICAgIGlmIChib2FyZFt4ICsgaV1beV0gIT09IFwiXCIgJiYgYm9hcmRbeCArIGldW3ldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgYm9hcmRbeCArIGldW3ldID0gc2hpcC5zaGlwQm9keVtpXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzaGlwc09uQm9hcmQucHVzaChzaGlwKTtcbiAgICBhdmFpbGFibGVTaGlwcy5zaGlmdCgpO1xuICAgIHJldHVybiBib2FyZDtcbiAgfTtcbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh4LCB5KSA9PiB7XG4gICAgaWYgKGJvYXJkW3hdW3ldICE9PSBcIlwiICYmIGJvYXJkW3hdW3ldICE9PSBcIm9cIikge1xuICAgICAgY29uc3QgaGl0U2hpcCA9IHNoaXBzT25Cb2FyZC5maWx0ZXIoXG4gICAgICAgIChzaGlwKSA9PiBzaGlwLnNoaXBMZW5ndGggPT09IGJvYXJkW3hdW3ldXG4gICAgICApO1xuICAgICAgaGl0U2hpcFswXS5oaXQoKGhpdFNoaXBbMF0uY291bnRlck9mSGl0cyArPSAxKSk7XG4gICAgICBib2FyZFt4XVt5XSA9IFwieFwiO1xuICAgICAgcmV0dXJuIGJvYXJkO1xuICAgIH1cbiAgICBib2FyZFt4XVt5XSA9IFwib1wiO1xuICAgIHJldHVybiBib2FyZDtcbiAgfTtcbiAgY29uc3QgYXJlQWxsU2hpcHNTdW5rID0gKCkgPT4ge1xuICAgIGNvbnN0IGFyZUFsbFN1bmsgPSBzaGlwc09uQm9hcmQuZXZlcnkoKHNoaXApID0+IHNoaXAuaXNTdW5rKCkgPT09IHRydWUpO1xuICAgIGlmIChhcmVBbGxTdW5rID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgYm9hcmQsXG4gICAgc2hpcHNPbkJvYXJkLFxuICAgIHBsYWNlU2hpcEF0LFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgYXJlQWxsU2hpcHNTdW5rLFxuICAgIGF2YWlsYWJsZVNoaXBzLFxuICB9O1xufTtcbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImNvbnN0IFBsYXllciA9IChuYW1lLCBlbmVteUdhbWVib2FyZCkgPT4ge1xuICBjb25zdCBwbGF5ZXJOYW1lID0gbmFtZTtcbiAgY29uc3QgYXR0YWNrID0gKHgsIHkpID0+IHtcbiAgICBpZiAocGxheWVyTmFtZSA9PT0gXCJDb21wdXRlclwiKSB7XG4gICAgICAvL1xuICAgICAgY29uc3QgcmFuZG9tWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGNvbnN0IHJhbmRvbVkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBpZiAoXG4gICAgICAgIGVuZW15R2FtZWJvYXJkLmJvYXJkW3JhbmRvbVhdW3JhbmRvbVldICE9PSBcIm9cIiAmJlxuICAgICAgICBlbmVteUdhbWVib2FyZC5ib2FyZFtyYW5kb21YXVtyYW5kb21ZXSAhPT0gXCJ4XCJcbiAgICAgICkge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHJhbmRvbVgsIHJhbmRvbVkpO1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGVuZW15R2FtZWJvYXJkLmJvYXJkW2ldW2pdICE9PSBcIm9cIiAmJlxuICAgICAgICAgICAgZW5lbXlHYW1lYm9hcmQuYm9hcmRbaV1bal0gIT09IFwieFwiXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGksIGopO1xuICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdGFyZ2V0ID0gZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9O1xuICByZXR1cm4ge1xuICAgIGF0dGFjayxcbiAgICBwbGF5ZXJOYW1lLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiY29uc3QgU2hpcCA9IChsZW5ndGgpID0+IHtcbiAgY29uc3Qgc2hpcExlbmd0aCA9IGxlbmd0aDtcbiAgY29uc3Qgc2hpcEJvZHkgPSBuZXcgQXJyYXkobGVuZ3RoKS5maWxsKGxlbmd0aCk7XG4gIGNvbnN0IGNvdW50ZXJPZkhpdHMgPSAtMTtcbiAgY29uc3QgaGl0ID0gKG51bSkgPT4ge1xuICAgIHNoaXBCb2R5W251bV0gPSBcInhcIjtcbiAgICByZXR1cm4gc2hpcEJvZHk7XG4gIH07XG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICBjb25zdCBpc0V2ZXJ5UGFydEhpdCA9IHNoaXBCb2R5LmV2ZXJ5KChwYXJ0KSA9PiBwYXJ0ID09PSBcInhcIik7XG4gICAgcmV0dXJuIGlzRXZlcnlQYXJ0SGl0O1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgc2hpcExlbmd0aCxcbiAgICBzaGlwQm9keSxcbiAgICBjb3VudGVyT2ZIaXRzLFxuICAgIGhpdCxcbiAgICBpc1N1bmssXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgR2FtZSBmcm9tIFwiLi9nYW1lXCI7XG5cbmNvbnN0IGhpZGRlbk1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oaWRkZW4tbW9kYWxcIik7XG5jb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxcIik7XG5jb25zdCBzaGlwTW9kZWxDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1hZGUtc2hpcHMtY29udGFpbmVyXCIpO1xuY29uc3QgW2NvbXB1dGVyQ29udGFpbmVyLCBodW1hbkNvbnRhaW5lcl0gPVxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmJvYXJkLWNvbnRhaW5lclwiKTtcbmNvbnN0IGNvbXB1dGVySW1hZ2VzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbWFnZXMtY29tcHV0ZXJcIik7XG5jb25zdCBodW1hbkltYWdlc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW1hZ2VzLWh1bWFuXCIpO1xuY29uc3QgYnRuTmV3R2FtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnRuLW5ldy1nYW1lXCIpO1xuY29uc3QgY29tcHV0ZXJQYXJhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21wdXRlci1zaGlwc1wiKTtcbmNvbnN0IGh1bWFuUGFyYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaHVtYW4tc2hpcHNcIik7XG5jb25zdCBzaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2hpcFwiKTtcbmNvbnN0IGJ0blJvdGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnRuLXJvdGF0ZVwiKTtcbmNvbnN0IHdpbm5lckgyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aW5uZXJcIik7XG5jb25zdCBjb21wdXRlck5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hbWUtY29tcHV0ZXJcIik7XG5jb25zdCBodW1hbk5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hbWUtaHVtYW5cIik7XG5cbmxldCBpc1ZlcnRpY2FsID0gZmFsc2U7XG5sZXQgZHJhZ2dlZFNoaXA7XG5sZXQgZHJhZ2dlZFNoaXBMZW5ndGg7XG5sZXQgZHJhZ2dlZFNoaXBEaXJlY2l0b247XG5sZXQgc2VsZWN0ZWRTaGlwTmFtZTtcbmxldCBzZWxlY3RlZFNoaXBJbmRleDtcbmxldCB4O1xubGV0IHk7XG5cbmNvbnN0IGdhbWUxID0gR2FtZSgpO1xuY29uc3QgZ2FtZXMgPSBbZ2FtZTFdO1xuXG5mdW5jdGlvbiByb3RhdGVTaGlwcygpIHtcbiAgc2hpcE1vZGVsQ29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoXCJ2ZXJ0aWNhbC1tb2RlbHNcIik7XG4gIGlzVmVydGljYWwgPSAhaXNWZXJ0aWNhbDtcbiAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIHNoaXAuY2xhc3NMaXN0LnRvZ2dsZShcInZlcnRpY2FsXCIpO1xuICAgIGlmIChpc1ZlcnRpY2FsKSB7XG4gICAgICBzaGlwLmRhdGFzZXQuZGlyZWN0aW9uID0gMTtcbiAgICB9IGVsc2UgaWYgKCFpc1ZlcnRpY2FsKSB7XG4gICAgICBzaGlwLmRhdGFzZXQuZGlyZWN0aW9uID0gMDtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBkcmFnU3RhcnQoZSkge1xuICBkcmFnZ2VkU2hpcCA9IGUudGFyZ2V0O1xuICBkcmFnZ2VkU2hpcExlbmd0aCA9IGRyYWdnZWRTaGlwLmNoaWxkcmVuLmxlbmd0aDtcbiAgZHJhZ2dlZFNoaXBEaXJlY2l0b24gPSBOdW1iZXIoZS50YXJnZXQuZGF0YXNldC5kaXJlY3Rpb24pO1xufVxuZnVuY3Rpb24gZHJhZ092ZXIoZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG59XG5cbmZ1bmN0aW9uIGRyYWdEcm9wKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBkcmFnZ2VkQ2xhc3NJbmRleCA9IEFycmF5LmZyb20oaHVtYW5Db250YWluZXIuY2hpbGRyZW4pLmluZGV4T2YoXG4gICAgZS50YXJnZXRcbiAgKTtcbiAgaWYgKGlzVmVydGljYWwpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRyYWdnZWRTaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHNxdWFyZUJlbG93U2VsZWN0ZWQgPVxuICAgICAgICBodW1hbkNvbnRhaW5lci5jaGlsZHJlbltcbiAgICAgICAgICBkcmFnZ2VkQ2xhc3NJbmRleCArIDEwICogaSAtIHNlbGVjdGVkU2hpcEluZGV4ICogMTBcbiAgICAgICAgXTtcblxuICAgICAgaWYgKHNxdWFyZUJlbG93U2VsZWN0ZWQuY2xhc3NOYW1lICE9PSBcImRlZmF1bHRcIikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIHggPSBOdW1iZXIoZS50YXJnZXQuZGF0YXNldC5rZXkuY2hhckF0KDApKSAtIHNlbGVjdGVkU2hpcEluZGV4O1xuICAgIHkgPSBOdW1iZXIoZS50YXJnZXQuZGF0YXNldC5rZXkuY2hhckF0KDIpKTtcbiAgICBjb25zdCBzaGlwQ2xhc3MgPSBzZWxlY3RlZFNoaXBOYW1lLnNsaWNlKDAsIC04KTtcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKHNoaXBDbGFzcyk7XG4gIH0gZWxzZSBpZiAoIWlzVmVydGljYWwpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRyYWdnZWRTaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHNxdWFyZU5leHRUb1NlbGVjdGVkID1cbiAgICAgICAgaHVtYW5Db250YWluZXIuY2hpbGRyZW5bZHJhZ2dlZENsYXNzSW5kZXggKyBpXTtcbiAgICAgIGlmIChzcXVhcmVOZXh0VG9TZWxlY3RlZC5jbGFzc05hbWUgIT09IFwiZGVmYXVsdFwiKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB4ID0gTnVtYmVyKGUudGFyZ2V0LmRhdGFzZXQua2V5LmNoYXJBdCgwKSk7XG4gICAgeSA9IE51bWJlcihlLnRhcmdldC5kYXRhc2V0LmtleS5jaGFyQXQoMikpIC0gc2VsZWN0ZWRTaGlwSW5kZXg7XG4gICAgY29uc3Qgc2hpcENsYXNzID0gc2VsZWN0ZWRTaGlwTmFtZS5zbGljZSgwLCAtMik7XG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChzaGlwQ2xhc3MpO1xuICB9XG5cbiAgcGxhY2VTaGlwT25IdW1hbmJvYXJkKCk7XG4gIHJlbmRlck90aGVyRWxlbWVudHMoKTtcblxuICBpZiAoXG4gICAgZ2FtZXNbZ2FtZXMubGVuZ3RoIC0gMV0uaHVtYW5HYW1lYm9hcmQuYm9hcmRbeF1beV0gPT09IGRyYWdnZWRTaGlwTGVuZ3RoXG4gICkge1xuICAgIGRyYWdnZWRTaGlwLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgfVxuICBpZiAoZ2FtZXNbZ2FtZXMubGVuZ3RoIC0gMV0uaHVtYW5HYW1lYm9hcmQuc2hpcHNPbkJvYXJkLmxlbmd0aCA9PT0gNSkge1xuICAgIHN0YXJ0R2FtZSgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFkZENsYXNzVG9TcXVhcmUoYm9hcmQsIGksIGosIGJveCkge1xuICBzd2l0Y2ggKGJvYXJkW2ldW2pdKSB7XG4gICAgY2FzZSAxOlxuICAgICAgYm94LmNsYXNzTGlzdC5hZGQoXCJwYXRyb2wtYm9hdFwiKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMjpcbiAgICAgIGJveC5jbGFzc0xpc3QuYWRkKFwic3VibWFyaW5lXCIpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAzOlxuICAgICAgYm94LmNsYXNzTGlzdC5hZGQoXCJkZXN0cm95ZXJcIik7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDQ6XG4gICAgICBib3guY2xhc3NMaXN0LmFkZChcImJhdHRsZXNoaXBcIik7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDU6XG4gICAgICBib3guY2xhc3NMaXN0LmFkZChcImNhcnJpZXJcIik7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwieFwiOlxuICAgICAgYm94LmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwib1wiOlxuICAgICAgYm94LmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGJveC5jbGFzc0xpc3QuYWRkKFwiZGVmYXVsdFwiKTtcbiAgfVxufVxuXG5jb25zdCByZW5kZXJIdW1hbkJvYXJkID0gKGJvYXJkLCBjb250YWluZXIpID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgZHJhZ1N0YXJ0KTtcbiAgICAgIGJveC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgZHJhZ092ZXIpO1xuICAgICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIGRyYWdEcm9wKTtcbiAgICAgIGJveC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWtleVwiLCBgJHtbaSwgal19YCk7XG4gICAgICBhZGRDbGFzc1RvU3F1YXJlKGJvYXJkLCBpLCBqLCBib3gpO1xuICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJveCk7XG4gICAgfVxuICB9XG59O1xuXG5mdW5jdGlvbiBhdHRhY2soYm9hcmQsIHNxdWFyZSwgZ2FtZSkge1xuICBjb25zdCBjb29yZGluYXRlVG9BdHRhY2sgPSBzcXVhcmUuZGF0YXNldC5rZXkuc3BsaXQoXCIsXCIpO1xuICBjb25zdCBbeENvb3JkaW5hdGUsIHlDb29yZGluYXRlXSA9IGNvb3JkaW5hdGVUb0F0dGFjaztcblxuICBnYW1lLmF0dGFja1RoaXNUdXJuKHhDb29yZGluYXRlLCB5Q29vcmRpbmF0ZSk7XG4gIGFkZENsYXNzVG9TcXVhcmUoYm9hcmQsIHhDb29yZGluYXRlLCB5Q29vcmRpbmF0ZSwgc3F1YXJlKTtcbiAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJjbGlja2VkXCIpO1xufVxuXG5jb25zdCByZW5kZXJDb21wdXRlckJvYXJkID0gKGJvYXJkLCBjb250YWluZXIsIG9uR2FtZSkgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBib3guc2V0QXR0cmlidXRlKFwiZGF0YS1rZXlcIiwgYCR7W2ksIGpdfWApO1xuICAgICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgIFwiY2xpY2tcIixcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGF0dGFjayhib2FyZCwgYm94LCBvbkdhbWUpO1xuICAgICAgICAgIHVwZGF0ZUNvbnRhaW5lcihvbkdhbWUuaHVtYW5HYW1lYm9hcmQuYm9hcmQsIGh1bWFuQ29udGFpbmVyKTtcbiAgICAgICAgICBvbkJvYXJkc0NoYW5nZSgpO1xuICAgICAgICB9LFxuICAgICAgICB7IG9uY2U6IHRydWUgfVxuICAgICAgKTtcbiAgICAgIHJlbmRlck90aGVyRWxlbWVudHMoKTtcbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChib3gpO1xuICAgIH1cbiAgfVxufTtcblxuZnVuY3Rpb24gdXBkYXRlQ29udGFpbmVyKGJvYXJkLCBjb250YWluZXIsIGdhbWUpIHtcbiAgaWYgKGdhbWUgPT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnRhaW5lci5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgICByZW5kZXJIdW1hbkJvYXJkKGJvYXJkLCBjb250YWluZXIpO1xuICB9IGVsc2Uge1xuICAgIGNvbnRhaW5lci5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgICByZW5kZXJDb21wdXRlckJvYXJkKGJvYXJkLCBjb250YWluZXIsIGdhbWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBsYWNlU2hpcE9uSHVtYW5ib2FyZCgpIHtcbiAgY29uc3QgY3VycmVudEdhbWUgPSBnYW1lc1tnYW1lcy5sZW5ndGggLSAxXTtcbiAgY3VycmVudEdhbWUucGxhY2VJbXBvcnRlZFNoaXBBdCh7XG4gICAgeCxcbiAgICB5LFxuICAgIGJvYXJkOiBjdXJyZW50R2FtZS5odW1hbkdhbWVib2FyZCxcbiAgICBzaGlwTGVuZ3RoOiBkcmFnZ2VkU2hpcExlbmd0aCxcbiAgICBkaXJlY3Rpb246IGRyYWdnZWRTaGlwRGlyZWNpdG9uLFxuICB9KTtcbiAgdXBkYXRlQ29udGFpbmVyKGN1cnJlbnRHYW1lLmh1bWFuR2FtZWJvYXJkLmJvYXJkLCBodW1hbkNvbnRhaW5lcik7XG59XG5cbmZ1bmN0aW9uIHBsYWNlU2hpcE9uQ29tcHV0ZXJib2FyZCgpIHtcbiAgY29uc3QgY3VycmVudEdhbWUgPSBnYW1lc1tnYW1lcy5sZW5ndGggLSAxXTtcbiAgZG8ge1xuICAgIGN1cnJlbnRHYW1lLnBsYWNlSW1wb3J0ZWRTaGlwQXQoe1xuICAgICAgeDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEwIC0gMCArIDEpKSArIDAsXG4gICAgICB5OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAgLSAwICsgMSkpICsgMCxcbiAgICAgIGJvYXJkOiBjdXJyZW50R2FtZS5jb21wdXRlckdhbWVib2FyZCxcbiAgICAgIHNoaXBMZW5ndGg6IGN1cnJlbnRHYW1lLmNvbXB1dGVyR2FtZWJvYXJkLmF2YWlsYWJsZVNoaXBzWzBdLFxuICAgICAgZGlyZWN0aW9uOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKSxcbiAgICB9KTtcblxuICAgIHVwZGF0ZUNvbnRhaW5lcihcbiAgICAgIGN1cnJlbnRHYW1lLmNvbXB1dGVyR2FtZWJvYXJkLmJvYXJkLFxuICAgICAgY29tcHV0ZXJDb250YWluZXIsXG4gICAgICBjdXJyZW50R2FtZVxuICAgICk7XG4gIH0gd2hpbGUgKGN1cnJlbnRHYW1lLmNvbXB1dGVyR2FtZWJvYXJkLnNoaXBzT25Cb2FyZC5sZW5ndGggPD0gNCk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclNoaXBJbWFnZXMoKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgY29tcHV0ZXJJbWFnZXNDb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIGh1bWFuSW1hZ2VzQ29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcblxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgNTsgaisrKSB7XG4gICAgICBjb25zdCBjb21wdXRlclNoaXBJbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGNvbnN0IGh1bWFuU2hpcEltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgY29uc3Qgc2hpcE5hbWVzID0gW1xuICAgICAgICBcImJvYXRcIixcbiAgICAgICAgXCJzdWJtYXJpbmVcIixcbiAgICAgICAgXCJkZXN0cm95ZXJcIixcbiAgICAgICAgXCJiYXR0bGVzaGlwXCIsXG4gICAgICAgIFwiY2FycmllclwiLFxuICAgICAgXTtcblxuICAgICAgY29tcHV0ZXJTaGlwSW1nLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIHJlZFwiO1xuICAgICAgaHVtYW5TaGlwSW1nLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIGJsdWVcIjtcbiAgICAgIGNvbXB1dGVyU2hpcEltZy5zcmMgPSBgLi9pbWdzL0Mke3NoaXBOYW1lc1tqXX0ucG5nYDtcbiAgICAgIGh1bWFuU2hpcEltZy5zcmMgPSBgLi9pbWdzL0gke3NoaXBOYW1lc1tqXX0ucG5nYDtcblxuICAgICAgY29tcHV0ZXJJbWFnZXNDb250YWluZXIuYXBwZW5kQ2hpbGQoY29tcHV0ZXJTaGlwSW1nKTtcbiAgICAgIGh1bWFuSW1hZ2VzQ29udGFpbmVyLmFwcGVuZENoaWxkKGh1bWFuU2hpcEltZyk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlTdW5rSW1hZ2Uoc3Vua0FycmF5LCBzaGlwSW1hZ2VzLCBsZXR0ZXIpIHtcbiAgc3Vua0FycmF5LmZvckVhY2goKHNoaXApID0+IHtcbiAgICBzaGlwSW1hZ2VzLmZvckVhY2goKGltYWdlKSA9PiB7XG4gICAgICBjb25zdCBhZGRTdW5rQ2xhc3MgPSAoKSA9PiBpbWFnZS5jbGFzc0xpc3QuYWRkKFwic3Vua1wiKTtcbiAgICAgIGlmIChzaGlwLnNoaXBMZW5ndGggPT09IDUgJiYgaW1hZ2Uuc3JjLmluY2x1ZGVzKGAke2xldHRlcn1jYXJyaWVyYCkpIHtcbiAgICAgICAgYWRkU3Vua0NsYXNzKCk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBzaGlwLnNoaXBMZW5ndGggPT09IDQgJiZcbiAgICAgICAgaW1hZ2Uuc3JjLmluY2x1ZGVzKGAke2xldHRlcn1iYXR0bGVzaGlwYClcbiAgICAgICkge1xuICAgICAgICBhZGRTdW5rQ2xhc3MoKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIHNoaXAuc2hpcExlbmd0aCA9PT0gMyAmJlxuICAgICAgICBpbWFnZS5zcmMuaW5jbHVkZXMoYCR7bGV0dGVyfWRlc3Ryb3llcmApXG4gICAgICApIHtcbiAgICAgICAgYWRkU3Vua0NsYXNzKCk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBzaGlwLnNoaXBMZW5ndGggPT09IDIgJiZcbiAgICAgICAgaW1hZ2Uuc3JjLmluY2x1ZGVzKGAke2xldHRlcn1zdWJtYXJpbmVgKVxuICAgICAgKSB7XG4gICAgICAgIGFkZFN1bmtDbGFzcygpO1xuICAgICAgfSBlbHNlIGlmIChzaGlwLnNoaXBMZW5ndGggPT09IDEgJiYgaW1hZ2Uuc3JjLmluY2x1ZGVzKGAke2xldHRlcn1ib2F0YCkpIHtcbiAgICAgICAgYWRkU3Vua0NsYXNzKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBncmV5T3V0U3Vua1NoaXBzKGN1cnJlbnRHYW1lKSB7XG4gIGNvbnN0IHN1bmtDb21wdXRlclNoaXBzID0gY3VycmVudEdhbWUuY29tcHV0ZXJHYW1lYm9hcmQuc2hpcHNPbkJvYXJkLmZpbHRlcihcbiAgICAoc2hpcCkgPT4gc2hpcC5pc1N1bmsoKSA9PT0gdHJ1ZVxuICApO1xuICBjb25zdCBzdW5rSHVtYW5TaGlwcyA9IGN1cnJlbnRHYW1lLmh1bWFuR2FtZWJvYXJkLnNoaXBzT25Cb2FyZC5maWx0ZXIoXG4gICAgKHNoaXApID0+IHNoaXAuaXNTdW5rKCkgPT09IHRydWVcbiAgKTtcbiAgY29uc3QgY29tcHV0ZXJTaGlwSW1hZ2VzID0gQXJyYXkuZnJvbShjb21wdXRlckltYWdlc0NvbnRhaW5lci5jaGlsZHJlbik7XG4gIGNvbnN0IGh1bWFuU2hpcEltYWdlcyA9IEFycmF5LmZyb20oaHVtYW5JbWFnZXNDb250YWluZXIuY2hpbGRyZW4pO1xuXG4gIGRpc3BsYXlTdW5rSW1hZ2Uoc3Vua0NvbXB1dGVyU2hpcHMsIGNvbXB1dGVyU2hpcEltYWdlcywgXCJDXCIpO1xuICBkaXNwbGF5U3Vua0ltYWdlKHN1bmtIdW1hblNoaXBzLCBodW1hblNoaXBJbWFnZXMsIFwiSFwiKTtcbn1cblxuZnVuY3Rpb24gcmVzdG9yZUltYWdlQ2xhc3MoKSB7XG4gIGNvbnN0IGNvbXB1dGVyU2hpcEltYWdlcyA9IEFycmF5LmZyb20oY29tcHV0ZXJJbWFnZXNDb250YWluZXIuY2hpbGRyZW4pO1xuICBjb25zdCBodW1hblNoaXBJbWFnZXMgPSBBcnJheS5mcm9tKGh1bWFuSW1hZ2VzQ29udGFpbmVyLmNoaWxkcmVuKTtcblxuICBjb21wdXRlclNoaXBJbWFnZXMuZm9yRWFjaCgoaW1hZ2UpID0+IGltYWdlLmNsYXNzTGlzdC5yZW1vdmUoXCJzdW5rXCIpKTtcbiAgaHVtYW5TaGlwSW1hZ2VzLmZvckVhY2goKGltYWdlKSA9PiBpbWFnZS5jbGFzc0xpc3QucmVtb3ZlKFwic3Vua1wiKSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlck90aGVyRWxlbWVudHMoKSB7XG4gIGNvbnN0IGN1cnJlbnRHYW1lID0gZ2FtZXNbZ2FtZXMubGVuZ3RoIC0gMV07XG4gIGNvbXB1dGVyUGFyYS50ZXh0Q29udGVudCA9IGBTaGlwcyBvbiBDb21wdXRlciBib2FyZDogJHtjdXJyZW50R2FtZS5jb21wdXRlckdhbWVib2FyZC5zaGlwc09uQm9hcmQubGVuZ3RofWA7XG4gIGNvbXB1dGVyTmFtZS50ZXh0Q29udGVudCA9IGBQbGF5ZXIgMTogJHtjdXJyZW50R2FtZS5jb21wdXRlci5wbGF5ZXJOYW1lfWA7XG4gIGh1bWFuUGFyYS50ZXh0Q29udGVudCA9IGBTaGlwcyBvbiBIdW1hbiBib2FyZDogJHtjdXJyZW50R2FtZS5odW1hbkdhbWVib2FyZC5zaGlwc09uQm9hcmQubGVuZ3RofWA7XG4gIGh1bWFuTmFtZS50ZXh0Q29udGVudCA9IGBQbGF5ZXIgMjogJHtjdXJyZW50R2FtZS5odW1hbi5wbGF5ZXJOYW1lfWA7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcbiAgY29uc3QgY3VycmVudEdhbWUgPSBnYW1lc1tnYW1lcy5sZW5ndGggLSAxXTtcbiAgaWYgKGN1cnJlbnRHYW1lLmh1bWFuR2FtZWJvYXJkLnNoaXBzT25Cb2FyZC5sZW5ndGggIT09IDUpIHtcbiAgICBhbGVydChcIlBsZWFzZSBwbGFjZSBldmVyeSBzaGlwIG9uIHRoZSBib2FyZFwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcGxhY2VTaGlwT25Db21wdXRlcmJvYXJkKCk7XG4gIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBwbGF5TmV3R2FtZSgpIHtcbiAgaGlkZGVuTW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XG4gIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBzaGlwLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgfSk7XG4gIHJlc3RvcmVJbWFnZUNsYXNzKCk7XG4gIGNvbnN0IGdhbWUyID0gR2FtZSgpO1xuICBjb21wdXRlckNvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG4gIGh1bWFuQ29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcbiAgcmVuZGVyQ29tcHV0ZXJCb2FyZChnYW1lMi5jb21wdXRlckdhbWVib2FyZC5ib2FyZCwgY29tcHV0ZXJDb250YWluZXIsIGdhbWUyKTtcbiAgcmVuZGVySHVtYW5Cb2FyZChnYW1lMi5odW1hbkdhbWVib2FyZC5ib2FyZCwgaHVtYW5Db250YWluZXIpO1xuICBjb21wdXRlckNvbnRhaW5lci5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJhdXRvXCI7XG4gIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgZ2FtZXMucHVzaChnYW1lMik7XG59XG5cbmZ1bmN0aW9uIGdhbWVPdmVyKCkge1xuICBjb25zdCBjdXJyZW50R2FtZSA9IGdhbWVzW2dhbWVzLmxlbmd0aCAtIDFdO1xuICBpZiAoY3VycmVudEdhbWUuaXNHYW1lRmluaXNoZWQoKSA9PT0gdHJ1ZSkge1xuICAgIGlmIChjdXJyZW50R2FtZS5jb21wdXRlckdhbWVib2FyZC5hcmVBbGxTaGlwc1N1bmsoKSA9PT0gdHJ1ZSkge1xuICAgICAgd2lubmVySDIudGV4dENvbnRlbnQgPSBgWW91IFdvbiFgO1xuICAgICAgaGlkZGVuTW9kYWwuY2xhc3NMaXN0LmFkZChcInZpc2libGVcIik7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50R2FtZS5odW1hbkdhbWVib2FyZC5hcmVBbGxTaGlwc1N1bmsoKSkge1xuICAgICAgd2lubmVySDIudGV4dENvbnRlbnQgPSBgQ29tcHV0ZXIgV29uIWA7XG4gICAgICBoaWRkZW5Nb2RhbC5jbGFzc0xpc3QuYWRkKFwidmlzaWJsZVwiKTtcbiAgICB9XG4gICAgY29tcHV0ZXJDb250YWluZXIuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICB9XG59XG5cbmZ1bmN0aW9uIG9uQm9hcmRzQ2hhbmdlKCkge1xuICBncmV5T3V0U3Vua1NoaXBzKGdhbWVzW2dhbWVzLmxlbmd0aCAtIDFdKTtcbiAgZ2FtZU92ZXIoZ2FtZXNbZ2FtZXMubGVuZ3RoIC0gMV0pO1xufVxuXG5idG5Sb3RhdGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJvdGF0ZVNoaXBzKTtcbmJ0bk5ld0dhbWUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHBsYXlOZXdHYW1lKTtcblxuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4gc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIGRyYWdTdGFydCkpO1xuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT5cbiAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChlKSA9PiB7XG4gICAgc2VsZWN0ZWRTaGlwTmFtZSA9IGUudGFyZ2V0LmlkO1xuICAgIHNlbGVjdGVkU2hpcEluZGV4ID0gTnVtYmVyKGUudGFyZ2V0LmlkLnN1YnN0cigtMSkpO1xuICB9KVxuKTtcblxucmVuZGVyQ29tcHV0ZXJCb2FyZChnYW1lMS5jb21wdXRlckdhbWVib2FyZC5ib2FyZCwgY29tcHV0ZXJDb250YWluZXIsIGdhbWUxKTtcbnJlbmRlckh1bWFuQm9hcmQoZ2FtZTEuaHVtYW5HYW1lYm9hcmQuYm9hcmQsIGh1bWFuQ29udGFpbmVyKTtcbnJlbmRlck90aGVyRWxlbWVudHMoKTtcbnJlbmRlclNoaXBJbWFnZXMoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==