import Ship from "../src/ship";
describe("Ship Factory", () => {
  const ship1 = Ship(3);
  test("the ship object has the required properties", () => {
    expect(ship1).toHaveProperty("shipLength");
    expect(ship1).toHaveProperty("hit");
    expect(ship1).toHaveProperty("isSunk");
  });
  test("shipLength returns the exact length of the ship", () => {
    expect(ship1.shipLength).toBe(3);
  });

  test("every hit is being registered", () => {
    expect(ship1.hit(0)).toEqual(["x", 3, 3]);
    expect(ship1.hit(1)).toEqual(["x", "x", 3]);
  });
  test("returns false if the ship is not sunk", () => {
    expect(ship1.isSunk()).toBe(false);
  });
});
