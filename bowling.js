const calculateFrame = (frame, frames, currentIndex) => {
  const firstValue = frame[0];
  const nextFrame = frames[currentIndex + 1] || [0, 0];
  if (isStrike(frame)) return 10 + calculateNextBalls(frames, currentIndex + 1);

  const secondValue = frame[1];

  if (isSpare(frame)) return 10 + getBallValue(nextFrame[0]);

  return getBallValue(firstValue) + getBallValue(secondValue);
};

const getBallValue = ball => {
  if (ball === "X") return 10;
  if (ball === "/") return 10;

  return parseInt(ball);
};

const calculateNextBalls = (frames, index) => {
  const current = frames[index];
  if (isStrike(current)) {
    const nextFrame = frames[index + 1];
    return 10 + getBallValue(nextFrame[0]);
  }

  if (isSpare(current)) return 10;

  return getBallValue(current[0]) + getBallValue(current[1]);
};

const isStrike = frame => {
  return frame[0] === "X";
};

const isSpare = frame => {
  return frame[1] === "/";
};

const getFrames = scoreBoard => {
  return scoreBoard
    .replace(/-/g, "0")
    .replace("||", "|")
    .split("|");
};

const calculateScore = scoreBoard => {
  const frames = getFrames(scoreBoard);

  let total = 0;

  for (let index = 0; index < 10; index++) {
    total += calculateFrame(frames[index], frames, index);
  }

  return total;
};

module.exports = {
  calculateScore
};
