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
export default Gameboard;
