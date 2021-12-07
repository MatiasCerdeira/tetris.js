import { tetromino } from "./tetromino.js";
import { grid } from "./grid.js";

export let tetrominosManager = {
  //Bag of tetrominos
  bag: [1, 2, 3, 4, 5, 6, 7],
  newTetromino() {
    if (this.bag.length != 0) {
      let randomIndex = Math.floor(Math.random() * this.bag.length); //Random 0 to 6
      //Gets a type from the bag and creates a new tetromino
      let currentTetromino = new tetromino(this.bag[randomIndex]);
      currentTetromino.instantiate();
      //Removes the used type from the bag
      this.bag.splice(randomIndex, 1);

      return currentTetromino;
    } else {
      //Repopulates the tetromino bag
      for (let i = 1; i <= 7; i++) {
        this.bag.push(i);
      }

      let randomIndex = Math.floor(Math.random() * this.bag.length); //Random 0 to 6
      //Gets a type from the bag and creates a new tetromino
      let currentTetromino = new tetromino(this.bag[randomIndex]);
      currentTetromino.instantiate();
      //Removes the used type from the bag
      this.bag.splice(randomIndex, 1);

      return currentTetromino;
    }
  },
};
