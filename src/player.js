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

export default Player;
