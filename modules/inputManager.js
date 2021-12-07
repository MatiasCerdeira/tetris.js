import { gameManager } from "./gameManager.js";

export let inputManager = {
  handleKeyPress(e, currentTetromino) {
    switch (e.key) {
      case "a":
        currentTetromino.move(-1);
        break;
      case "d":
        currentTetromino.move(1);
        break;
      case "s":
        gameManager.setVelocity(gameManager.getVelocity() + 5);
        break;
      case "w":
        currentTetromino.rotate();
        break;
    }
  },
};
