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

const renderComputerBoard = (board, container, onGame) => {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const box = document.createElement("div");
      box.setAttribute("data-key", `${[i, j]}`);
      box.addEventListener(
        "click",
        () => {
          const squaresToAttack = box.dataset.key.split(",");
          const xSquare = squaresToAttack[0];
          const ySquare = squaresToAttack[1];
          onGame.attackThisTurn(xSquare, ySquare);
          addClassToSquare(board, i, j, box);
          box.classList.add("clicked");
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUF5RCxPQUFPO0FBQ2hFO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsOEJBQThCLE9BQU87QUFDckM7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBLDhCQUE4QixPQUFPO0FBQ3JDO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSw4QkFBOEIsT0FBTztBQUNyQztBQUNBO0FBQ0EsUUFBUSx3REFBd0QsT0FBTztBQUN2RTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUF5RCxrREFBa0Q7QUFDM0csMENBQTBDLGdDQUFnQztBQUMxRSxtREFBbUQsK0NBQStDO0FBQ2xHLHVDQUF1Qyw2QkFBNkI7QUFDcEU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxnQkFBZ0IsaURBQUk7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdDQtcHJvamVjdC1iYXR0bGVzaGlwLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vdDQtcHJvamVjdC1iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly90NC1wcm9qZWN0LWJhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL3Q0LXByb2plY3QtYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL3Q0LXByb2plY3QtYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90NC1wcm9qZWN0LWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Q0LXByb2plY3QtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Q0LXByb2plY3QtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Q0LXByb2plY3QtYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcblxuY29uc3QgR2FtZSA9ICgpID0+IHtcbiAgY29uc3QgY29tcHV0ZXJHYW1lYm9hcmQgPSBHYW1lYm9hcmQoKTtcbiAgY29uc3QgaHVtYW5HYW1lYm9hcmQgPSBHYW1lYm9hcmQoKTtcblxuICBjb25zdCBwbGFjZUltcG9ydGVkU2hpcEF0ID0gKHsgeCwgeSwgYm9hcmQsIHNoaXBMZW5ndGgsIGRpcmVjdGlvbiB9KSA9PlxuICAgIGJvYXJkLnBsYWNlU2hpcEF0KHgsIHksIFNoaXAoc2hpcExlbmd0aCksIGRpcmVjdGlvbik7XG5cbiAgY29uc3QgY29tcHV0ZXIgPSBQbGF5ZXIoXCJDb21wdXRlclwiLCBodW1hbkdhbWVib2FyZCk7XG4gIGNvbnN0IGh1bWFuID0gUGxheWVyKFwiSHVtYW5cIiwgY29tcHV0ZXJHYW1lYm9hcmQpO1xuICBjb25zdCBhdHRhY2tUaGlzVHVybiA9ICh4LCB5KSA9PiB7XG4gICAgaHVtYW4uYXR0YWNrKHgsIHkpO1xuICAgIGNvbXB1dGVyLmF0dGFjayh4LCB5KTtcbiAgfTtcblxuICBjb25zdCBpc0dhbWVGaW5pc2hlZCA9ICgpID0+IHtcbiAgICBpZiAoXG4gICAgICAoY29tcHV0ZXJHYW1lYm9hcmQuYXJlQWxsU2hpcHNTdW5rKCkgPT09IHRydWUgJiZcbiAgICAgICAgY29tcHV0ZXJHYW1lYm9hcmQuc2hpcHNPbkJvYXJkLmxlbmd0aCAhPT0gMCkgfHxcbiAgICAgIChodW1hbkdhbWVib2FyZC5hcmVBbGxTaGlwc1N1bmsoKSA9PT0gdHJ1ZSAmJlxuICAgICAgICBodW1hbkdhbWVib2FyZC5zaGlwc09uQm9hcmQubGVuZ3RoICE9PSAwKVxuICAgICkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHBsYWNlSW1wb3J0ZWRTaGlwQXQsXG4gICAgY29tcHV0ZXIsXG4gICAgaHVtYW4sXG4gICAgY29tcHV0ZXJHYW1lYm9hcmQsXG4gICAgaHVtYW5HYW1lYm9hcmQsXG4gICAgYXR0YWNrVGhpc1R1cm4sXG4gICAgaXNHYW1lRmluaXNoZWQsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lO1xuIiwiY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBib2FyZCA9IFtcbiAgICBbXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIl0sXG4gICAgW1wiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCJdLFxuICAgIFtcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiXSxcbiAgICBbXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIl0sXG4gICAgW1wiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCJdLFxuICAgIFtcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiXSxcbiAgICBbXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIl0sXG4gICAgW1wiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCJdLFxuICAgIFtcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiXSxcbiAgICBbXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIl0sXG4gIF07XG4gIGNvbnN0IHNoaXBzT25Cb2FyZCA9IFtdO1xuICBjb25zdCBhdmFpbGFibGVTaGlwcyA9IFs1LCA0LCAzLCAyLCAxXTsgLy8gb25seSB1c2VkIGJ5IGNvbXB1dGVyXG4gIGNvbnN0IHBsYWNlU2hpcEF0ID0gKHgsIHksIHNoaXAsIGRpcmVjdGlvbikgPT4ge1xuICAgIGNvbnN0IG1heFggPSAxMCAtIHNoaXAuc2hpcExlbmd0aDtcbiAgICBjb25zdCBtYXhZID0gMTAgLSBzaGlwLnNoaXBMZW5ndGg7XG4gICAgbGV0IGlzVmVydGljYWw7XG5cbiAgICBkaXJlY3Rpb24gPT09IDAgPyAoaXNWZXJ0aWNhbCA9IGZhbHNlKSA6IChpc1ZlcnRpY2FsID0gdHJ1ZSk7XG4gICAgaWYgKCFpc1ZlcnRpY2FsICYmIHkgPiBtYXhZKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChpc1ZlcnRpY2FsICYmIHggPiBtYXhYKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChib2FyZFt4XSA9PT0gdW5kZWZpbmVkIHx8IGJvYXJkW3hdW3ldID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLnNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCFpc1ZlcnRpY2FsKSB7XG4gICAgICAgIGlmIChib2FyZFt4XVt5ICsgaV0gIT09IFwiXCIgJiYgYm9hcmRbeF1beSArIGldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgYm9hcmRbeF1beSArIGldID0gc2hpcC5zaGlwQm9keVtpXTtcbiAgICAgIH0gZWxzZSBpZiAoaXNWZXJ0aWNhbCkge1xuICAgICAgICBpZiAoYm9hcmRbeCArIGldW3ldICE9PSBcIlwiICYmIGJvYXJkW3ggKyBpXVt5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGJvYXJkW3ggKyBpXVt5XSA9IHNoaXAuc2hpcEJvZHlbaV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2hpcHNPbkJvYXJkLnB1c2goc2hpcCk7XG4gICAgYXZhaWxhYmxlU2hpcHMuc2hpZnQoKTtcbiAgICByZXR1cm4gYm9hcmQ7XG4gIH07XG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoeCwgeSkgPT4ge1xuICAgIGlmIChib2FyZFt4XVt5XSAhPT0gXCJcIiAmJiBib2FyZFt4XVt5XSAhPT0gXCJvXCIpIHtcbiAgICAgIGNvbnN0IGhpdFNoaXAgPSBzaGlwc09uQm9hcmQuZmlsdGVyKFxuICAgICAgICAoc2hpcCkgPT4gc2hpcC5zaGlwTGVuZ3RoID09PSBib2FyZFt4XVt5XVxuICAgICAgKTtcbiAgICAgIGhpdFNoaXBbMF0uaGl0KChoaXRTaGlwWzBdLmNvdW50ZXJPZkhpdHMgKz0gMSkpO1xuICAgICAgYm9hcmRbeF1beV0gPSBcInhcIjtcbiAgICAgIHJldHVybiBib2FyZDtcbiAgICB9XG4gICAgYm9hcmRbeF1beV0gPSBcIm9cIjtcbiAgICByZXR1cm4gYm9hcmQ7XG4gIH07XG4gIGNvbnN0IGFyZUFsbFNoaXBzU3VuayA9ICgpID0+IHtcbiAgICBjb25zdCBhcmVBbGxTdW5rID0gc2hpcHNPbkJvYXJkLmV2ZXJ5KChzaGlwKSA9PiBzaGlwLmlzU3VuaygpID09PSB0cnVlKTtcbiAgICBpZiAoYXJlQWxsU3VuayA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGJvYXJkLFxuICAgIHNoaXBzT25Cb2FyZCxcbiAgICBwbGFjZVNoaXBBdCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGFyZUFsbFNoaXBzU3VuayxcbiAgICBhdmFpbGFibGVTaGlwcyxcbiAgfTtcbn07XG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XG4iLCJjb25zdCBQbGF5ZXIgPSAobmFtZSwgZW5lbXlHYW1lYm9hcmQpID0+IHtcbiAgY29uc3QgcGxheWVyTmFtZSA9IG5hbWU7XG4gIGNvbnN0IGF0dGFjayA9ICh4LCB5KSA9PiB7XG4gICAgaWYgKHBsYXllck5hbWUgPT09IFwiQ29tcHV0ZXJcIikge1xuICAgICAgLy9cbiAgICAgIGNvbnN0IHJhbmRvbVggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBjb25zdCByYW5kb21ZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgaWYgKFxuICAgICAgICBlbmVteUdhbWVib2FyZC5ib2FyZFtyYW5kb21YXVtyYW5kb21ZXSAhPT0gXCJvXCIgJiZcbiAgICAgICAgZW5lbXlHYW1lYm9hcmQuYm9hcmRbcmFuZG9tWF1bcmFuZG9tWV0gIT09IFwieFwiXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhyYW5kb21YLCByYW5kb21ZKTtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBlbmVteUdhbWVib2FyZC5ib2FyZFtpXVtqXSAhPT0gXCJvXCIgJiZcbiAgICAgICAgICAgIGVuZW15R2FtZWJvYXJkLmJvYXJkW2ldW2pdICE9PSBcInhcIlxuICAgICAgICAgICkge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhpLCBqKTtcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHRhcmdldCA9IGVuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcbiAgcmV0dXJuIHtcbiAgICBhdHRhY2ssXG4gICAgcGxheWVyTmFtZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsImNvbnN0IFNoaXAgPSAobGVuZ3RoKSA9PiB7XG4gIGNvbnN0IHNoaXBMZW5ndGggPSBsZW5ndGg7XG4gIGNvbnN0IHNoaXBCb2R5ID0gbmV3IEFycmF5KGxlbmd0aCkuZmlsbChsZW5ndGgpO1xuICBjb25zdCBjb3VudGVyT2ZIaXRzID0gLTE7XG4gIGNvbnN0IGhpdCA9IChudW0pID0+IHtcbiAgICBzaGlwQm9keVtudW1dID0gXCJ4XCI7XG4gICAgcmV0dXJuIHNoaXBCb2R5O1xuICB9O1xuICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgY29uc3QgaXNFdmVyeVBhcnRIaXQgPSBzaGlwQm9keS5ldmVyeSgocGFydCkgPT4gcGFydCA9PT0gXCJ4XCIpO1xuICAgIHJldHVybiBpc0V2ZXJ5UGFydEhpdDtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHNoaXBMZW5ndGgsXG4gICAgc2hpcEJvZHksXG4gICAgY291bnRlck9mSGl0cyxcbiAgICBoaXQsXG4gICAgaXNTdW5rLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IEdhbWUgZnJvbSBcIi4vZ2FtZVwiO1xuXG5jb25zdCBoaWRkZW5Nb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGlkZGVuLW1vZGFsXCIpO1xuY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsXCIpO1xuY29uc3Qgc2hpcE1vZGVsQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWRlLXNoaXBzLWNvbnRhaW5lclwiKTtcbmNvbnN0IGNvbXB1dGVyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ib2FyZC1jb250YWluZXJcIilbMF07XG5jb25zdCBodW1hbkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYm9hcmQtY29udGFpbmVyXCIpWzFdO1xuY29uc3QgY29tcHV0ZXJJbWFnZXNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImltYWdlcy1jb21wdXRlclwiKTtcbmNvbnN0IGh1bWFuSW1hZ2VzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbWFnZXMtaHVtYW5cIik7XG5jb25zdCBidG5OZXdHYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidG4tbmV3LWdhbWVcIik7XG5jb25zdCBjb21wdXRlclBhcmEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbXB1dGVyLXNoaXBzXCIpO1xuY29uc3QgaHVtYW5QYXJhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJodW1hbi1zaGlwc1wiKTtcbmNvbnN0IHNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zaGlwXCIpO1xuY29uc3QgYnRuUm90YXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidG4tcm90YXRlXCIpO1xuY29uc3Qgd2lubmVySDIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpbm5lclwiKTtcbmNvbnN0IGNvbXB1dGVyTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmFtZS1jb21wdXRlclwiKTtcbmNvbnN0IGh1bWFuTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmFtZS1odW1hblwiKTtcblxubGV0IGlzVmVydGljYWwgPSBmYWxzZTtcbmxldCBkcmFnZ2VkU2hpcDtcbmxldCBkcmFnZ2VkU2hpcExlbmd0aDtcbmxldCBkcmFnZ2VkU2hpcERpcmVjaXRvbjtcbmxldCBzZWxlY3RlZFNoaXBOYW1lO1xubGV0IHNlbGVjdGVkU2hpcEluZGV4O1xubGV0IHg7XG5sZXQgeTtcblxuY29uc3QgZ2FtZTEgPSBHYW1lKCk7XG5jb25zdCBnYW1lcyA9IFtnYW1lMV07XG5cbmZ1bmN0aW9uIHJvdGF0ZVNoaXBzKCkge1xuICBzaGlwTW9kZWxDb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZShcInZlcnRpY2FsLW1vZGVsc1wiKTtcbiAgaXNWZXJ0aWNhbCA9ICFpc1ZlcnRpY2FsO1xuICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgc2hpcC5jbGFzc0xpc3QudG9nZ2xlKFwidmVydGljYWxcIik7XG4gICAgaWYgKGlzVmVydGljYWwpIHtcbiAgICAgIHNoaXAuZGF0YXNldC5kaXJlY3Rpb24gPSAxO1xuICAgIH0gZWxzZSBpZiAoIWlzVmVydGljYWwpIHtcbiAgICAgIHNoaXAuZGF0YXNldC5kaXJlY3Rpb24gPSAwO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGRyYWdTdGFydChlKSB7XG4gIGRyYWdnZWRTaGlwID0gZS50YXJnZXQ7XG4gIGRyYWdnZWRTaGlwTGVuZ3RoID0gZHJhZ2dlZFNoaXAuY2hpbGRyZW4ubGVuZ3RoO1xuICBkcmFnZ2VkU2hpcERpcmVjaXRvbiA9IE51bWJlcihlLnRhcmdldC5kYXRhc2V0LmRpcmVjdGlvbik7XG59XG5mdW5jdGlvbiBkcmFnT3ZlcihlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbn1cblxuZnVuY3Rpb24gZHJhZ0Ryb3AoZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IGRyYWdnZWRDbGFzc0luZGV4ID0gQXJyYXkuZnJvbShodW1hbkNvbnRhaW5lci5jaGlsZHJlbikuaW5kZXhPZihcbiAgICBlLnRhcmdldFxuICApO1xuICBpZiAoaXNWZXJ0aWNhbCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZHJhZ2dlZFNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc3F1YXJlQmVsb3dTZWxlY3RlZCA9XG4gICAgICAgIGh1bWFuQ29udGFpbmVyLmNoaWxkcmVuW1xuICAgICAgICAgIGRyYWdnZWRDbGFzc0luZGV4ICsgMTAgKiBpIC0gc2VsZWN0ZWRTaGlwSW5kZXggKiAxMFxuICAgICAgICBdO1xuXG4gICAgICBpZiAoc3F1YXJlQmVsb3dTZWxlY3RlZC5jbGFzc05hbWUgIT09IFwiZGVmYXVsdFwiKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgeCA9IE51bWJlcihlLnRhcmdldC5kYXRhc2V0LmtleS5jaGFyQXQoMCkpIC0gc2VsZWN0ZWRTaGlwSW5kZXg7XG4gICAgeSA9IE51bWJlcihlLnRhcmdldC5kYXRhc2V0LmtleS5jaGFyQXQoMikpO1xuICAgIGNvbnN0IHNoaXBDbGFzcyA9IHNlbGVjdGVkU2hpcE5hbWUuc2xpY2UoMCwgLTgpO1xuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoc2hpcENsYXNzKTtcbiAgfSBlbHNlIGlmICghaXNWZXJ0aWNhbCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZHJhZ2dlZFNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc3F1YXJlTmV4dFRvU2VsZWN0ZWQgPVxuICAgICAgICBodW1hbkNvbnRhaW5lci5jaGlsZHJlbltkcmFnZ2VkQ2xhc3NJbmRleCArIGldO1xuICAgICAgaWYgKHNxdWFyZU5leHRUb1NlbGVjdGVkLmNsYXNzTmFtZSAhPT0gXCJkZWZhdWx0XCIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIHggPSBOdW1iZXIoZS50YXJnZXQuZGF0YXNldC5rZXkuY2hhckF0KDApKTtcbiAgICB5ID0gTnVtYmVyKGUudGFyZ2V0LmRhdGFzZXQua2V5LmNoYXJBdCgyKSkgLSBzZWxlY3RlZFNoaXBJbmRleDtcbiAgICBjb25zdCBzaGlwQ2xhc3MgPSBzZWxlY3RlZFNoaXBOYW1lLnNsaWNlKDAsIC0yKTtcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKHNoaXBDbGFzcyk7XG4gIH1cblxuICBwbGFjZVNoaXBPbkh1bWFuYm9hcmQoKTtcbiAgaWYgKFxuICAgIGdhbWVzW2dhbWVzLmxlbmd0aCAtIDFdLmh1bWFuR2FtZWJvYXJkLmJvYXJkW3hdW3ldID09PSBkcmFnZ2VkU2hpcExlbmd0aFxuICApIHtcbiAgICBkcmFnZ2VkU2hpcC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIH1cbiAgaWYgKGdhbWVzW2dhbWVzLmxlbmd0aCAtIDFdLmh1bWFuR2FtZWJvYXJkLnNoaXBzT25Cb2FyZC5sZW5ndGggPT09IDUpIHtcbiAgICBzdGFydEdhbWUoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRDbGFzc1RvU3F1YXJlKGJvYXJkLCBpLCBqLCBib3gpIHtcbiAgc3dpdGNoIChib2FyZFtpXVtqXSkge1xuICAgIGNhc2UgMTpcbiAgICAgIGJveC5jbGFzc0xpc3QuYWRkKFwicGF0cm9sLWJvYXRcIik7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDI6XG4gICAgICBib3guY2xhc3NMaXN0LmFkZChcInN1Ym1hcmluZVwiKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMzpcbiAgICAgIGJveC5jbGFzc0xpc3QuYWRkKFwiZGVzdHJveWVyXCIpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSA0OlxuICAgICAgYm94LmNsYXNzTGlzdC5hZGQoXCJiYXR0bGVzaGlwXCIpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSA1OlxuICAgICAgYm94LmNsYXNzTGlzdC5hZGQoXCJjYXJyaWVyXCIpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInhcIjpcbiAgICAgIGJveC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIm9cIjpcbiAgICAgIGJveC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBib3guY2xhc3NMaXN0LmFkZChcImRlZmF1bHRcIik7XG4gIH1cbn1cblxuY29uc3QgcmVuZGVySHVtYW5Cb2FyZCA9IChib2FyZCwgY29udGFpbmVyKSA9PiB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGJveC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIGRyYWdTdGFydCk7XG4gICAgICBib3guYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIGRyYWdPdmVyKTtcbiAgICAgIGJveC5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCBkcmFnRHJvcCk7XG4gICAgICBib3guc2V0QXR0cmlidXRlKFwiZGF0YS1rZXlcIiwgYCR7W2ksIGpdfWApO1xuICAgICAgYWRkQ2xhc3NUb1NxdWFyZShib2FyZCwgaSwgaiwgYm94KTtcbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChib3gpO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgcmVuZGVyQ29tcHV0ZXJCb2FyZCA9IChib2FyZCwgY29udGFpbmVyLCBvbkdhbWUpID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgYm94LnNldEF0dHJpYnV0ZShcImRhdGEta2V5XCIsIGAke1tpLCBqXX1gKTtcbiAgICAgIGJveC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICBcImNsaWNrXCIsXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBjb25zdCBzcXVhcmVzVG9BdHRhY2sgPSBib3guZGF0YXNldC5rZXkuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgIGNvbnN0IHhTcXVhcmUgPSBzcXVhcmVzVG9BdHRhY2tbMF07XG4gICAgICAgICAgY29uc3QgeVNxdWFyZSA9IHNxdWFyZXNUb0F0dGFja1sxXTtcbiAgICAgICAgICBvbkdhbWUuYXR0YWNrVGhpc1R1cm4oeFNxdWFyZSwgeVNxdWFyZSk7XG4gICAgICAgICAgYWRkQ2xhc3NUb1NxdWFyZShib2FyZCwgaSwgaiwgYm94KTtcbiAgICAgICAgICBib3guY2xhc3NMaXN0LmFkZChcImNsaWNrZWRcIik7XG4gICAgICAgICAgaHVtYW5Db250YWluZXIucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgICAgICAgcmVuZGVySHVtYW5Cb2FyZChvbkdhbWUuaHVtYW5HYW1lYm9hcmQuYm9hcmQsIGh1bWFuQ29udGFpbmVyKTtcbiAgICAgICAgfSxcbiAgICAgICAgeyBvbmNlOiB0cnVlIH1cbiAgICAgICk7XG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYm94KTtcbiAgICB9XG4gIH1cbn07XG5cbmZ1bmN0aW9uIHBsYWNlU2hpcE9uSHVtYW5ib2FyZCgpIHtcbiAgY29uc3QgY3VycmVudEdhbWUgPSBnYW1lc1tnYW1lcy5sZW5ndGggLSAxXTtcbiAgY3VycmVudEdhbWUucGxhY2VJbXBvcnRlZFNoaXBBdCh7XG4gICAgeCxcbiAgICB5LFxuICAgIGJvYXJkOiBjdXJyZW50R2FtZS5odW1hbkdhbWVib2FyZCxcbiAgICBzaGlwTGVuZ3RoOiBkcmFnZ2VkU2hpcExlbmd0aCxcbiAgICBkaXJlY3Rpb246IGRyYWdnZWRTaGlwRGlyZWNpdG9uLFxuICB9KTtcbiAgaHVtYW5Db250YWluZXIucmVwbGFjZUNoaWxkcmVuKCk7XG4gIHJlbmRlckh1bWFuQm9hcmQoY3VycmVudEdhbWUuaHVtYW5HYW1lYm9hcmQuYm9hcmQsIGh1bWFuQ29udGFpbmVyKTtcbn1cblxuZnVuY3Rpb24gcGxhY2VTaGlwT25Db21wdXRlcmJvYXJkKCkge1xuICBjb25zdCBjdXJyZW50R2FtZSA9IGdhbWVzW2dhbWVzLmxlbmd0aCAtIDFdO1xuICBkbyB7XG4gICAgY3VycmVudEdhbWUucGxhY2VJbXBvcnRlZFNoaXBBdCh7XG4gICAgICB4OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAgLSAwICsgMSkpICsgMCxcbiAgICAgIHk6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxMCAtIDAgKyAxKSkgKyAwLFxuICAgICAgYm9hcmQ6IGN1cnJlbnRHYW1lLmNvbXB1dGVyR2FtZWJvYXJkLFxuICAgICAgc2hpcExlbmd0aDogY3VycmVudEdhbWUuY29tcHV0ZXJHYW1lYm9hcmQuYXZhaWxhYmxlU2hpcHNbMF0sXG4gICAgICBkaXJlY3Rpb246IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpLFxuICAgIH0pO1xuXG4gICAgY29tcHV0ZXJDb250YWluZXIucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgcmVuZGVyQ29tcHV0ZXJCb2FyZChcbiAgICAgIGN1cnJlbnRHYW1lLmNvbXB1dGVyR2FtZWJvYXJkLmJvYXJkLFxuICAgICAgY29tcHV0ZXJDb250YWluZXIsXG4gICAgICBjdXJyZW50R2FtZVxuICAgICk7XG4gIH0gd2hpbGUgKGN1cnJlbnRHYW1lLmNvbXB1dGVyR2FtZWJvYXJkLnNoaXBzT25Cb2FyZC5sZW5ndGggPD0gNCk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclNoaXBJbWFnZXMoKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgY29tcHV0ZXJJbWFnZXNDb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIGh1bWFuSW1hZ2VzQ29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcblxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgNTsgaisrKSB7XG4gICAgICBjb25zdCBjb21wdXRlclNoaXBJbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGNvbnN0IGh1bWFuU2hpcEltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgY29uc3Qgc2hpcE5hbWVzID0gW1xuICAgICAgICBcImJvYXRcIixcbiAgICAgICAgXCJzdWJtYXJpbmVcIixcbiAgICAgICAgXCJkZXN0cm95ZXJcIixcbiAgICAgICAgXCJiYXR0bGVzaGlwXCIsXG4gICAgICAgIFwiY2FycmllclwiLFxuICAgICAgXTtcblxuICAgICAgY29tcHV0ZXJTaGlwSW1nLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIHJlZFwiO1xuICAgICAgaHVtYW5TaGlwSW1nLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIGJsdWVcIjtcbiAgICAgIGNvbXB1dGVyU2hpcEltZy5zcmMgPSBgLi9pbWdzL0Mke3NoaXBOYW1lc1tqXX0ucG5nYDtcbiAgICAgIGh1bWFuU2hpcEltZy5zcmMgPSBgLi9pbWdzL0gke3NoaXBOYW1lc1tqXX0ucG5nYDtcblxuICAgICAgY29tcHV0ZXJJbWFnZXNDb250YWluZXIuYXBwZW5kQ2hpbGQoY29tcHV0ZXJTaGlwSW1nKTtcbiAgICAgIGh1bWFuSW1hZ2VzQ29udGFpbmVyLmFwcGVuZENoaWxkKGh1bWFuU2hpcEltZyk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlTdW5rSW1hZ2Uoc3Vua0FycmF5LCBzaGlwSW1hZ2VzLCBsZXR0ZXIpIHtcbiAgc3Vua0FycmF5LmZvckVhY2goKHNoaXApID0+IHtcbiAgICBzaGlwSW1hZ2VzLmZvckVhY2goKGltYWdlKSA9PiB7XG4gICAgICBjb25zdCBhZGRTdW5rQ2xhc3MgPSAoKSA9PiBpbWFnZS5jbGFzc0xpc3QuYWRkKFwic3Vua1wiKTtcbiAgICAgIGlmIChzaGlwLnNoaXBMZW5ndGggPT09IDUgJiYgaW1hZ2Uuc3JjLmluY2x1ZGVzKGAke2xldHRlcn1jYXJyaWVyYCkpIHtcbiAgICAgICAgYWRkU3Vua0NsYXNzKCk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBzaGlwLnNoaXBMZW5ndGggPT09IDQgJiZcbiAgICAgICAgaW1hZ2Uuc3JjLmluY2x1ZGVzKGAke2xldHRlcn1iYXR0bGVzaGlwYClcbiAgICAgICkge1xuICAgICAgICBhZGRTdW5rQ2xhc3MoKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIHNoaXAuc2hpcExlbmd0aCA9PT0gMyAmJlxuICAgICAgICBpbWFnZS5zcmMuaW5jbHVkZXMoYCR7bGV0dGVyfWRlc3Ryb3llcmApXG4gICAgICApIHtcbiAgICAgICAgYWRkU3Vua0NsYXNzKCk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBzaGlwLnNoaXBMZW5ndGggPT09IDIgJiZcbiAgICAgICAgaW1hZ2Uuc3JjLmluY2x1ZGVzKGAke2xldHRlcn1zdWJtYXJpbmVgKVxuICAgICAgKSB7XG4gICAgICAgIGFkZFN1bmtDbGFzcygpO1xuICAgICAgfSBlbHNlIGlmIChzaGlwLnNoaXBMZW5ndGggPT09IDEgJiYgaW1hZ2Uuc3JjLmluY2x1ZGVzKGAke2xldHRlcn1ib2F0YCkpIHtcbiAgICAgICAgYWRkU3Vua0NsYXNzKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBncmV5T3V0U3Vua1NoaXBzKGN1cnJlbnRHYW1lKSB7XG4gIGNvbnN0IHN1bmtDb21wdXRlclNoaXBzID0gY3VycmVudEdhbWUuY29tcHV0ZXJHYW1lYm9hcmQuc2hpcHNPbkJvYXJkLmZpbHRlcihcbiAgICAoc2hpcCkgPT4gc2hpcC5pc1N1bmsoKSA9PT0gdHJ1ZVxuICApO1xuICBjb25zdCBzdW5rSHVtYW5TaGlwcyA9IGN1cnJlbnRHYW1lLmh1bWFuR2FtZWJvYXJkLnNoaXBzT25Cb2FyZC5maWx0ZXIoXG4gICAgKHNoaXApID0+IHNoaXAuaXNTdW5rKCkgPT09IHRydWVcbiAgKTtcbiAgY29uc3QgY29tcHV0ZXJTaGlwSW1hZ2VzID0gQXJyYXkuZnJvbShjb21wdXRlckltYWdlc0NvbnRhaW5lci5jaGlsZHJlbik7XG4gIGNvbnN0IGh1bWFuU2hpcEltYWdlcyA9IEFycmF5LmZyb20oaHVtYW5JbWFnZXNDb250YWluZXIuY2hpbGRyZW4pO1xuXG4gIGRpc3BsYXlTdW5rSW1hZ2Uoc3Vua0NvbXB1dGVyU2hpcHMsIGNvbXB1dGVyU2hpcEltYWdlcywgXCJDXCIpO1xuICBkaXNwbGF5U3Vua0ltYWdlKHN1bmtIdW1hblNoaXBzLCBodW1hblNoaXBJbWFnZXMsIFwiSFwiKTtcbn1cblxuZnVuY3Rpb24gcmVzdG9yZUltYWdlQ2xhc3MoKSB7XG4gIGNvbnN0IGNvbXB1dGVyU2hpcEltYWdlcyA9IEFycmF5LmZyb20oY29tcHV0ZXJJbWFnZXNDb250YWluZXIuY2hpbGRyZW4pO1xuICBjb25zdCBodW1hblNoaXBJbWFnZXMgPSBBcnJheS5mcm9tKGh1bWFuSW1hZ2VzQ29udGFpbmVyLmNoaWxkcmVuKTtcblxuICBjb21wdXRlclNoaXBJbWFnZXMuZm9yRWFjaCgoaW1hZ2UpID0+IGltYWdlLmNsYXNzTGlzdC5yZW1vdmUoXCJzdW5rXCIpKTtcbiAgaHVtYW5TaGlwSW1hZ2VzLmZvckVhY2goKGltYWdlKSA9PiBpbWFnZS5jbGFzc0xpc3QucmVtb3ZlKFwic3Vua1wiKSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlck90aGVyRWxlbWVudHMoKSB7XG4gIGNvbnN0IGN1cnJlbnRHYW1lID0gZ2FtZXNbZ2FtZXMubGVuZ3RoIC0gMV07XG4gIGNvbXB1dGVyUGFyYS50ZXh0Q29udGVudCA9IGBTaGlwcyBvbiBDb21wdXRlciBib2FyZDogJHtjdXJyZW50R2FtZS5jb21wdXRlckdhbWVib2FyZC5zaGlwc09uQm9hcmQubGVuZ3RofWA7XG4gIGNvbXB1dGVyTmFtZS50ZXh0Q29udGVudCA9IGBQbGF5ZXIgMTogJHtjdXJyZW50R2FtZS5jb21wdXRlci5wbGF5ZXJOYW1lfWA7XG4gIGh1bWFuUGFyYS50ZXh0Q29udGVudCA9IGBTaGlwcyBvbiBIdW1hbiBib2FyZDogJHtjdXJyZW50R2FtZS5odW1hbkdhbWVib2FyZC5zaGlwc09uQm9hcmQubGVuZ3RofWA7XG4gIGh1bWFuTmFtZS50ZXh0Q29udGVudCA9IGBQbGF5ZXIgMjogJHtjdXJyZW50R2FtZS5odW1hbi5wbGF5ZXJOYW1lfWA7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcbiAgY29uc3QgY3VycmVudEdhbWUgPSBnYW1lc1tnYW1lcy5sZW5ndGggLSAxXTtcbiAgaWYgKGN1cnJlbnRHYW1lLmh1bWFuR2FtZWJvYXJkLnNoaXBzT25Cb2FyZC5sZW5ndGggIT09IDUpIHtcbiAgICBhbGVydChcIlBsZWFzZSBwbGFjZSBldmVyeSBzaGlwIG9uIHRoZSBib2FyZFwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcGxhY2VTaGlwT25Db21wdXRlcmJvYXJkKCk7XG4gIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBwbGF5TmV3R2FtZSgpIHtcbiAgaGlkZGVuTW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XG4gIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBzaGlwLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgfSk7XG4gIHJlc3RvcmVJbWFnZUNsYXNzKCk7XG4gIGNvbnN0IGdhbWUyID0gR2FtZSgpO1xuICBjb21wdXRlckNvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG4gIGh1bWFuQ29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcbiAgcmVuZGVyQ29tcHV0ZXJCb2FyZChnYW1lMi5jb21wdXRlckdhbWVib2FyZC5ib2FyZCwgY29tcHV0ZXJDb250YWluZXIsIGdhbWUyKTtcbiAgcmVuZGVySHVtYW5Cb2FyZChnYW1lMi5odW1hbkdhbWVib2FyZC5ib2FyZCwgaHVtYW5Db250YWluZXIpO1xuICBjb21wdXRlckNvbnRhaW5lci5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJhdXRvXCI7XG4gIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgZ2FtZXMucHVzaChnYW1lMik7XG59XG5cbmZ1bmN0aW9uIGdhbWVPdmVyKCkge1xuICBjb25zdCBjdXJyZW50R2FtZSA9IGdhbWVzW2dhbWVzLmxlbmd0aCAtIDFdO1xuICBpZiAoY3VycmVudEdhbWUuaXNHYW1lRmluaXNoZWQoKSA9PT0gdHJ1ZSkge1xuICAgIGlmIChjdXJyZW50R2FtZS5jb21wdXRlckdhbWVib2FyZC5hcmVBbGxTaGlwc1N1bmsoKSA9PT0gdHJ1ZSkge1xuICAgICAgd2lubmVySDIudGV4dENvbnRlbnQgPSBgWW91IFdvbiFgO1xuICAgICAgaGlkZGVuTW9kYWwuY2xhc3NMaXN0LmFkZChcInZpc2libGVcIik7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50R2FtZS5odW1hbkdhbWVib2FyZC5hcmVBbGxTaGlwc1N1bmsoKSkge1xuICAgICAgd2lubmVySDIudGV4dENvbnRlbnQgPSBgQ29tcHV0ZXIgV29uIWA7XG4gICAgICBoaWRkZW5Nb2RhbC5jbGFzc0xpc3QuYWRkKFwidmlzaWJsZVwiKTtcbiAgICB9XG4gICAgY29tcHV0ZXJDb250YWluZXIuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICB9XG59XG5cbmZ1bmN0aW9uIHdhdGNoQm9hcmRzT25DaGFuZ2UoKSB7XG4gIHNldEludGVydmFsKCgpID0+IHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHJlbmRlck90aGVyRWxlbWVudHMoKTtcbiAgICAgIHJlbmRlclNoaXBJbWFnZXMoKTtcbiAgICAgIGdyZXlPdXRTdW5rU2hpcHMoZ2FtZXNbZ2FtZXMubGVuZ3RoIC0gMV0pO1xuICAgICAgZ2FtZU92ZXIoZ2FtZXNbZ2FtZXMubGVuZ3RoIC0gMV0pO1xuICAgIH0sIDEwMCk7XG4gIH0sIDUwMCk7XG59XG5cbmJ0blJvdGF0ZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcm90YXRlU2hpcHMpO1xuYnRuTmV3R2FtZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcGxheU5ld0dhbWUpO1xuXG5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgZHJhZ1N0YXJ0KSk7XG5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PlxuICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGUpID0+IHtcbiAgICBzZWxlY3RlZFNoaXBOYW1lID0gZS50YXJnZXQuaWQ7XG4gICAgc2VsZWN0ZWRTaGlwSW5kZXggPSBOdW1iZXIoZS50YXJnZXQuaWQuc3Vic3RyKC0xKSk7XG4gIH0pXG4pO1xuXG5yZW5kZXJDb21wdXRlckJvYXJkKGdhbWUxLmNvbXB1dGVyR2FtZWJvYXJkLmJvYXJkLCBjb21wdXRlckNvbnRhaW5lciwgZ2FtZTEpO1xucmVuZGVySHVtYW5Cb2FyZChnYW1lMS5odW1hbkdhbWVib2FyZC5ib2FyZCwgaHVtYW5Db250YWluZXIpO1xud2F0Y2hCb2FyZHNPbkNoYW5nZSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9