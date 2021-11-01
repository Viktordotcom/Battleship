import Ship from "../src/ship";
import Gameboard from "../src/gameboard";

describe("Gameboard Factory should call ship factory and place ships", () => {
  test("places the ship horizontally on the board", () => {
    const gameboard1 = Gameboard();
    const ship1 = Ship(3);
    gameboard1.placeShipAt(0, 0, ship1, 0);
    expect(gameboard1.board[0]).toEqual([3, 3, 3, "", "", "", "", "", "", ""]);
  });

  test("places the ship vertically on the board", () => {
    const gameboard1 = Gameboard();
    const ship1 = Ship(3);
    gameboard1.placeShipAt(1, 0, ship1, 1);
    expect(gameboard1.board[1][0]).toBe(ship1.shipLength);
    expect(gameboard1.board[2][0]).toBe(ship1.shipLength);
    expect(gameboard1.board[3][0]).toBe(ship1.shipLength);
  });

  test("works with 2 ships added", () => {
    const gameboard1 = Gameboard();
    const ship1 = Ship(3);
    const ship2 = Ship(4);
    gameboard1.placeShipAt(0, 0, ship1, 0);
    gameboard1.placeShipAt(5, 1, ship2, 0);
    expect(gameboard1.shipsOnBoard.length).toBe(2);
  });

  test("ships don't overlap eachother", () => {
    // hard to test because of the way the errors are handled

    const gameboard1 = Gameboard();
    const ship1 = Ship(3);
    gameboard1.placeShipAt(0, 2, ship1, 1);

    expect(gameboard1.placeShipAt(0, 0, Ship(4), 0)).toBeFalsy();
  });

  test("ships don't hang off the edge of the board", () => {
    const gameboard1 = Gameboard();
    const ship1 = Ship(3);
    expect(gameboard1.placeShipAt(0, 8, ship1, 0)).toBeFalsy();

    expect(gameboard1.placeShipAt(8, 0, ship1, 1)).toBeFalsy();
  });

  test("Cannot be placed on top of eachother", () => {
    const gameboard1 = Gameboard();
    const ship1 = Ship(3);
    gameboard1.placeShipAt(0, 1, ship1, 0);
    expect(gameboard1.placeShipAt(0, 1, Ship(5), 0)).toBeFalsy();
  });

  test("Ships on board are being tracked correctly", () => {
    const gameboard1 = Gameboard();
    const ship1 = Ship(3);
    expect(gameboard1.shipsOnBoard).toEqual([]);
    gameboard1.placeShipAt(0, 0, ship1, 0);
    expect(gameboard1.shipsOnBoard).toEqual([ship1]);
  });

  test("First ship of availableShips is being removed correctly", () => {
    // only computer uses availableShips for now
    const gameboard1 = Gameboard();
    const ship1 = Ship(3);
    expect(gameboard1.availableShips).toEqual([5, 4, 3, 2, 1]);
    gameboard1.placeShipAt(0, 0, ship1, 0);
    expect(gameboard1.availableShips).toEqual([4, 3, 2, 1]);
  });
});
