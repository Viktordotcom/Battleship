import Game from "../src/game";

describe("Game tests", () => {
  test("New game has 2 players", () => {
    const newGame = Game();
    expect(newGame).toHaveProperty("computer");
    expect(newGame).toHaveProperty("human");
  });

  test("Every new game has 2 boards", () => {
    const newGame = Game();
    expect(newGame).toHaveProperty("computerGameboard");
    expect(newGame).toHaveProperty("humanGameboard");
  });

  test("Returns true if game is finished", () => {
    // there are no ships therefor the game finished before starting :D
    // will only be used after the ships are being setup
    const newGame = Game();
    expect(newGame.isGameFinished()).toBeFalsy();
  });
});
