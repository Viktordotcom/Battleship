import Gameboard from "../src/gameboard";
import Ship from "../src/ship";
import Player from "../src/player";

describe("Player factory", () => {
  test("player has name", () => {
    const computer = Player("Computer");
    expect(computer.playerName).toBe("Computer");
  });

  test("human player can attack computerGameboard at given coordinates", () => {
    const computerGameboard = Gameboard();
    const ship1 = Ship(3);
    computerGameboard.placeShipAt(2, 0, ship1, 1);
    const human = Player("Rick", computerGameboard);
    human.attack(0, 0);
    human.attack(3, 0);
    expect(computerGameboard.board[0][0]).toBe("o");
    expect(computerGameboard.board[3][0]).toBe("x");
  });

  test("computer player attacks humanGameboard at random coordinates", () => {
    const humanGameboard = Gameboard();
    const computer = Player("Computer", humanGameboard);
    computer.attack(4, 0);
    expect(humanGameboard.board[4][0]).not.toBe("o");
    computer.attack(5, 0);
    expect(humanGameboard.board[5][0]).not.toBe("o");
  });

  test("target gameboard receives the right coordinates for attack", () => {
    const computerGameboard = Gameboard();
    const humanGameboard = Gameboard();
    const computer = Player("Computer", humanGameboard);
    const human = Player("Rick", computerGameboard);
    computer.attack(3, 0);
    human.attack(0, 0);
    expect(humanGameboard.board[3][0]).not.toBe("o");
    expect(computerGameboard.board[0][0]).toBe("o");
  });
});
