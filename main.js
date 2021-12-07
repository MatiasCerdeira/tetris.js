import { grid } from "./modules/grid.js";
import { gameManager } from "./modules/gameManager.js";
import { tetromino } from "./modules/tetromino.js";
import { inputManager } from "./modules/inputManager.js";
import { tetrominosManager } from "./modules/tetrominosManager.js";

const fps = 30;

//Gets called once
grid.initiate();
let currentTetromino = tetrominosManager.newTetromino();
let localVelocity = gameManager.getVelocity();

console.log(currentTetromino.cells);
console.log(grid.cells);

//Listens for key inputs
document.addEventListener("keypress", (e) => {
  inputManager.handleKeyPress(e, currentTetromino);
});

//Starts the game loop
setInterval(() => {
  gameManager.render();
  currentTetromino.collisionDetection();
}, 1000 / fps);

//Falling loop --> depends on the game velocity instead of the fps
let fallLoop = setInterval(() => {
  if (currentTetromino.grounded == true) {
    currentTetromino = tetrominosManager.newTetromino();
  }
  currentTetromino.fall();
}, 1000 / gameManager.velocity);
