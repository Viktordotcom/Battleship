import Gameboard from "./gameboard";
import Ship from "./ship";
import Player from "./player";

const Game = () => {
  const computerGameboard = Gameboard();
  const humanGameboard = Gameboard();

  const placeImportedShipAt = ({ x, y, board, shipLength, direction }) =>
    board.placeShipAt(x, y, Ship(shipLength), direction);

  const computer = Player("Computer", humanGameboard);
  const human = Player("Human", computerGameboard);
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

export default Game;
