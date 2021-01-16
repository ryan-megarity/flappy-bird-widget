const context = game.getContext("2d");
const bird = new Image();
bird.src = "bird.png";
const interval = 24; // 42fps
const canvasSize = 400;
const birdSize = 24;
let birdX = 0;
let birdY = canvasSize / 2;
let birdDy = 0;
game.onclick = () => {
  birdDy = 8;
};
const pipeWidth = 24;
const pipeGap = 200;
let pipeX = 400;
let topPipeBottomY = 50;
let score = 0;
let bestScore = 0;

gameFn = () => {
  context.fillStyle = "skyblue";
  context.fillRect(0, 0, canvasSize, canvasSize);
  birdY -= birdDy -= 0.3; // any clicks minus gravity
  context.drawImage(bird, birdX, birdY, birdSize, birdSize);
  context.fillStyle = "grey";
  pipeX -= 5;
  if (pipeX < -pipeWidth) {
    pipeX = canvasSize;
    topPipeBottomY = Math.random() * pipeGap;
  }
  context.fillRect(pipeX, 0, pipeWidth, topPipeBottomY);
  context.fillRect(pipeX, topPipeBottomY + pipeGap, pipeWidth, canvasSize);
  if (
    birdY < -birdSize ||
    birdY > canvasSize ||
    (pipeX < birdSize &&
      (birdY < topPipeBottomY || birdY > topPipeBottomY + pipeGap))
  ) {
    birdY = canvasSize / 2; // reset
    birdDy = 0;
    pipeX = 400;
    score = 0;
  } else {
    score += 1;
  }
  context.fillText(`SCORE: ${score}`, 25, 25 ); // Increase and draw score
  bestScore = bestScore < score ? score : bestScore; // New best score?
  context.fillText(`BEST SCORE: ${bestScore}`, 25, 50); // Draw best score
};

// start the game
const main = () => {
  timer = setInterval(() => {
    gameFn();
  }, interval);
};

main();
