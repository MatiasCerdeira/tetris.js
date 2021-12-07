import { canvasManager } from "./canvasManager.js";
import { grid } from "./grid.js";

export let gameManager = {
  score: 0,
  heldPiece: 0,
  velocity: 7,
  render() {
    for (let i = 0; i < grid.cells.length; i++) {
      let cell = grid.cells[i];
      canvasManager.Draw(
        cell.x * grid.cellSize,
        cell.y * grid.cellSize,
        cell.value
      );
    }
  },
  setVelocity(newVelocity) {
    this.velocity = newVelocity;
  },
  getVelocity() {
    return this.velocity;
  },
};
