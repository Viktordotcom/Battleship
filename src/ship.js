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

export default Ship;
