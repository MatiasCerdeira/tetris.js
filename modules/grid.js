export let grid = {
  rows: 20,
  columns: 10,
  cells: [],
  cellSize: 25,
  initiate() {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        this.cells.push({
          x: x + 1,
          y: y + 1,
          value: 0,
        });
      }
    }
  },
  getCellIndex(x, y) {
    return (y - 1) * this.columns + (x - 1);
  },

  //updates the grid - Can take null instead of oldX and oldY
  update(oldX, oldY, newX, newY, value) {
    if (oldX != null && oldY != null) {
      let oldIndex = this.getCellIndex(oldX, oldY);
      if (oldIndex >= 0 && oldIndex < this.cells.length) {
        this.cells[oldIndex].value = 0;
      }
    }

    let newIndex = this.getCellIndex(newX, newY);
    if (newIndex >= 0 && newIndex < this.cells.length) {
      this.cells[newIndex].value = value;
    }
  },

  updateAll(oldXArray, oldYArray, tetrominosArray, value) {
    for (let i = 0; i < tetrominosArray.length; i++) {
      let oldIndex = this.getCellIndex(oldXArray[i], oldYArray[i]);

      if (oldIndex >= 0 && oldIndex < this.cells.length) {
        this.cells[oldIndex].value = 0;
      }
    }
    for (let i = 0; i < tetrominosArray.length; i++) {
      let newIndex = this.getCellIndex(
        tetrominosArray[i].x,
        tetrominosArray[i].y
      );
      if (newIndex >= 0 && newIndex < this.cells.length) {
        this.cells[newIndex].value = value;
      }
    }
  },
};
