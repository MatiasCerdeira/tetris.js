import { grid } from "./grid.js";
import { rotationTables } from "./rotationTables.js";

export class tetromino {
  constructor(type) {
    this.type = type;
    this.cells = [];
    this.grounded = false;
    this.orientation = 1;
  }

  instantiate() {
    switch (this.type) {
      case 1: // Long tetromino
        this.cells.push({ x: 5, y: 0, value: this.type, defaultOrder: 1 });
        this.cells.push({ x: 5, y: -1, value: this.type, defaultOrder: 2 });
        this.cells.push({ x: 5, y: -2, value: this.type, defaultOrder: 3 });
        this.cells.push({ x: 5, y: -3, value: this.type, defaultOrder: 4 });
        break;
      case 2: // J tetromino
        this.cells.push({ x: 5, y: 0, value: this.type, defaultOrder: 1 });
        this.cells.push({ x: 5, y: -1, value: this.type, defaultOrder: 2 });
        this.cells.push({ x: 5, y: -2, value: this.type, defaultOrder: 3 });
        this.cells.push({ x: 4, y: 0, value: this.type, defaultOrder: 4 });
        break;
      case 3: // L tetromino
        this.cells.push({ x: 6, y: 0, value: this.type, defaultOrder: 1 });
        this.cells.push({ x: 5, y: 0, value: this.type, defaultOrder: 2 });
        this.cells.push({ x: 5, y: -1, value: this.type, defaultOrder: 3 });
        this.cells.push({ x: 5, y: -2, value: this.type, defaultOrder: 4 });
        break;
      case 4: // Square tetromino
        this.cells.push({ x: 6, y: 0, value: this.type, defaultOrder: 1 });
        this.cells.push({ x: 6, y: -1, value: this.type, defaultOrder: 2 });
        this.cells.push({ x: 5, y: 0, value: this.type, defaultOrder: 3 });
        this.cells.push({ x: 5, y: -1, value: this.type, defaultOrder: 4 });
        break;
      case 5: // T tetromino
        this.cells.push({ x: 6, y: 0, value: this.type, defaultOrder: 1 });
        this.cells.push({ x: 5, y: 0, value: this.type, defaultOrder: 2 });
        this.cells.push({ x: 4, y: 0, value: this.type, defaultOrder: 3 });
        this.cells.push({ x: 5, y: -1, value: this.type, defaultOrder: 4 });
        break;
      case 6: // S tetromino
        this.cells.push({ x: 5, y: 0, value: this.type, defaultOrder: 1 });
        this.cells.push({ x: 4, y: 0, value: this.type, defaultOrder: 2 });
        this.cells.push({ x: 6, y: -1, value: this.type, defaultOrder: 3 });
        this.cells.push({ x: 5, y: -1, value: this.type, defaultOrder: 4 });
        break;
      case 7: // Z tetromino
        this.cells.push({ x: 6, y: 0, value: this.type, defaultOrder: 1 });
        this.cells.push({ x: 5, y: 0, value: this.type, defaultOrder: 2 });
        this.cells.push({ x: 5, y: -1, value: this.type, defaultOrder: 3 });
        this.cells.push({ x: 4, y: -1, value: this.type, defaultOrder: 4 });
        break;
    }
  }
  fall() {
    if (this.grounded == false) {
      let oldYArray = [];
      let oldXArray = [];
      for (let i = 0; i < this.cells.length; i++) {
        oldYArray.push(this.cells[i].y);
        oldXArray.push(this.cells[i].x);

        //Fall
        this.cells[i].y = this.cells[i].y + 1;

        grid.updateAll(oldXArray, oldYArray, this.cells, this.type);
      }
    }
  }
  //Returns true if a given index is part of the tetromino
  isPartOfTetromino(index) {
    for (let i = 0; i < this.cells.length; i++) {
      if (grid.getCellIndex(this.cells[i].x, this.cells[i].y) == index) {
        return true;
      }
    }
  }

  move(deltaX) {
    let blocked = false;

    for (let i = 0; i < this.cells.length; i++) {
      let currentX = this.cells[i].x;
      let newX = currentX + deltaX;

      let currentY = this.cells[i].y;

      //Checks collision with sides
      if (newX < 1 || newX > grid.columns) {
        blocked = true;
      }

      //Checks collision with other Tetromino
      let newXIndex = grid.getCellIndex(newX, currentY);
      if (grid.cells[newXIndex]) {
        if (
          grid.cells[newXIndex].value != 0 &&
          this.isPartOfTetromino(newXIndex) != true
        ) {
          blocked = true;
        }
      }
    }

    //Reorder the cells to prevent a visual bug
    this.cells = this.decideRenderingOrder(this.cells, deltaX);

    if (!blocked) {
      for (let cell of this.cells) {
        let currentX = cell.x;
        let currentY = cell.y;
        cell.x = cell.x + deltaX;

        grid.update(currentX, currentY, cell.x, currentY, this.type);
      }
    }
  }

  //Re orders the tetromino cells to render the ones in the direction of deltaX first
  decideRenderingOrder(tetrominoCells, deltaX) {
    let orderedArray = tetrominoCells;

    if (deltaX == 1) {
      orderedArray.sort((a, b) => {
        return (a.x - b.x) * -1;
      });
    } else {
      orderedArray.sort((a, b) => {
        return a.x - b.x;
      });
    }
    return orderedArray;
  }
  //Return the cell order to its default state
  defaultRenderingOrder(tetrominoCells) {
    let orderedArray = tetrominoCells;

    orderedArray.sort((a, b) => {
      return a.defaultOrder - b.defaultOrder;
    });
    return orderedArray;
  }

  verticalRenderingOrder(tetrominoCells) {
    let orderedArray = tetrominoCells;

    orderedArray.sort((a, b) => {
      return a.y - b.y;
    });
    return orderedArray;
  }

  rotate() {
    //Long, S, and Z - Pieces with two states

    this.cells = this.defaultRenderingOrder(this.cells);
    let previousX = [];
    let previousY = [];

    if (this.type == 1 || this.type == 6 || this.type == 7) {
      for (let i = 0; i < this.cells.length; i++) {
        previousX.push(this.cells[i].x);
        previousY.push(this.cells[i].y);

        this.cells[i].x =
          this.cells[i].x + rotationTables[this.type][i][0] * this.orientation;
        this.cells[i].y =
          this.cells[i].y + rotationTables[this.type][i][1] * this.orientation;
      }
      grid.updateAll(previousX, previousY, this.cells, this.type);
      this.orientation = this.orientation * -1;
    } else if (this.type == 2 || this.type == 3 || this.type == 5) {
      for (let i = 0; i < this.cells.length; i++) {
        previousX.push(this.cells[i].x);
        previousY.push(this.cells[i].y);

        this.cells[i].x =
          this.cells[i].x + rotationTables[this.type][this.orientation][i][0];
        this.cells[i].y =
          this.cells[i].y + rotationTables[this.type][this.orientation][i][1];
      }
      grid.updateAll(previousX, previousY, this.cells, this.type);
      this.orientation >= 4 ? (this.orientation = 1) : this.orientation++;
    }
  }

  collisionDetection() {
    for (let i = 0; i < this.cells.length; i++) {
      let cell = this.cells[i];

      //If a cell touches the lower boundary
      if (cell.y >= grid.rows) {
        this.grounded = true;
      }

      //Collision with other tetrminos
      if (cell.y > 0) {
        //Stores the index of the tetromino right below
        let downwardsTetrominoCellIndex = grid.getCellIndex(cell.x, cell.y + 1);

        //Checks that the downwards cell is not part of the same tetromino
        if (
          downwardsTetrominoCellIndex !=
            grid.getCellIndex(this.cells[0].x, this.cells[0].y) &&
          downwardsTetrominoCellIndex !=
            grid.getCellIndex(this.cells[1].x, this.cells[1].y) &&
          downwardsTetrominoCellIndex !=
            grid.getCellIndex(this.cells[2].x, this.cells[2].y) &&
          downwardsTetrominoCellIndex !=
            grid.getCellIndex(this.cells[3].x, this.cells[3].y)
        ) {
          if (grid.cells[downwardsTetrominoCellIndex]) {
            if (grid.cells[downwardsTetrominoCellIndex].value != 0) {
              this.grounded = true;
              console.log("Second Grounded");
            }
          }
        }
      }
    }
  }
}
