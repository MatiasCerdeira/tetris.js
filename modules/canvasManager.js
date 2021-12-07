import { grid } from "./grid.js";

export let canvasManager = {
  canvas: document.getElementById("myCanvas"),
  getCtx() {
    return this.canvas.getContext("2d");
  },
  Draw(x, y, value) {
    switch (value) {
      case 0: // Empty
        this.getCtx().fillStyle = "#D8D8D8";
        break;
      case 1: //Long
        this.getCtx().fillStyle = "#32FFC4";
        break;
      case 2: // J
        this.getCtx().fillStyle = "#3240FF";
        break;
      case 3: // L
        this.getCtx().fillStyle = "#FF8F32";
        break;
      case 4: // Square
        this.getCtx().fillStyle = "#FFD732";
        break;
      case 5: // T
        this.getCtx().fillStyle = "#CC32FF";
        break;
      case 6: // S
        this.getCtx().fillStyle = "#5AFF32";
        break;
      case 7: // Z
        this.getCtx().fillStyle = "#FF3232";
        break;
    }
    this.getCtx().fillRect(x, y, grid.cellSize, grid.cellSize);
  },
};
