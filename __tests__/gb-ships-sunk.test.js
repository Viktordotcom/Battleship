import makeShip from "../src/ship";
import makeGameboard from "../src/gameboard";

describe("Displays sunk ships correctly", () => {
  test("displays true when every ships is sunk", () => {
    const ship1 = makeShip(2);
    const ship2 = makeShip(3);
    const gameboard1 = makeGameboard();
    gameboard1.placeShipAt(0, 0, ship1, 0);
    gameboard1.placeShipAt(2, 0, ship2, 0);
    gameboard1.receiveAttack(0, 0);
    gameboard1.receiveAttack(0, 1);
    gameboard1.receiveAttack(2, 0);
    gameboard1.receiveAttack(2, 1);
    gameboard1.receiveAttack(2, 2);
    expect(gameboard1.areAllShipsSunk()).toBeTruthy();
  });

  test("displays false when not every ships is sunk", () => {
    const gameboard1 = makeGameboard();
    const ship3 = makeShip(4);
    gameboard1.placeShipAt(3, 0, ship3, 1);
    expect(gameboard1.areAllShipsSunk()).toBeFalsy();
  });
});
