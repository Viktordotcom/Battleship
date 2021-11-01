import makeGameboard from "../src/gameboard";
import makeShip from "../src/ship";

describe("Gameboards should handle received attacks", () => {
  const ship1 = makeShip(3);
  const gameboard1 = makeGameboard();
  gameboard1.placeShipAt(0, 5, ship1, 0);
  test("marks the board with 'o' if it's a missed shot", () => {
    gameboard1.receiveAttack(0, 1);
    expect(gameboard1.board[0][1]).toBe("o");
  });

  test("marks the board with 'x' if it hit a ship", () => {
    gameboard1.receiveAttack(0, 5);
    expect(gameboard1.board[0][5]).toBe("x");
  });

  test("sends the 'hit' function to the correct ship", () => {
    const ship2 = makeShip(2);
    gameboard1.placeShipAt(3, 0, ship2, 1);
    gameboard1.receiveAttack(0, 6);
    gameboard1.receiveAttack(4, 0);
    expect(ship2.shipBody.includes("x")).toBeTruthy();
  });
});
