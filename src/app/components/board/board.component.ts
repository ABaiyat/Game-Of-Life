import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  numOfRows:number;
  numOfCols:number;
  simulationSpeed:number;
  board2d:any = [];
  nextBoard:any = [];
  nCol:any = [];
  nRow:any = [];
  rowId: number = 0;
  colId: number = 0;
  generationNum : number = 0;
  isSimRunning: boolean = false;

  constructor() {
    this.numOfRows = 30;
    this.numOfCols = 50;

    for (var i = 1; i <= this.numOfCols; i++) {
      this.nCol[i-1] = i;
    }

    for (var i=1; i <= this.numOfRows; i++) {
      this.nRow[i-1] = i;
    }

    for (var i = 0; i<this.numOfRows; i++) {
      var tempArr = [];
      for (var j = 0; j<this.numOfCols; j++) {
        tempArr.push(false);
      }

      this.board2d.push(tempArr);
    }

    for (var i = 0; i<this.numOfRows; i++) {
      var tempArr = [];
      for (var j = 0; j<this.numOfCols; j++) {
        tempArr.push(false);
      }

      this.nextBoard.push(tempArr);
    }


  }

  ngOnInit() {
    this.randomizeBoard();
    this.checkSimState();
  }


  // When a cell is clicked, changes to the opposite state of what it
  // was before, choosing from true or false;
  changeCellState(rowIndex, colIndex) {
    console.log(rowIndex - 1, colIndex - 1);
    var newState = !this.board2d[rowIndex - 1][colIndex - 1];
    this.board2d[rowIndex - 1][colIndex - 1] = newState;
  }

  // Returns state of cell for its color, to indicate whether the cell is
  // alive or dead
  checkState(rowIndex, colIndex) {
    return this.board2d[rowIndex - 1][colIndex - 1];
  }

  // Sets all of the values of the board array to false, essentially clearing
  // the board
  clearBoard() {
    this.generationNum = 0;
    this.isSimRunning = false;
    for (var i = 0; i < this.numOfRows; i++) {
      for (var j = 0; j < this.numOfCols; j++) {
        this.board2d[i][j] = false;
      }
    }
  }

  // Creates a randomized board
  randomizeBoard() {
    this.generationNum = 0;
    this.isSimRunning = false;
    for (var i = 0; i < this.numOfRows; i++) {
      for (var j = 0; j < this.numOfCols; j++) {
        this.board2d[i][j] = Math.random() > .3 ? false : true;
      }
    }
  }

  checkSimState() {
    this.isSimRunning = !this.isSimRunning;
    if (this.isSimRunning) {
      this.simGeneration();
    }

  }



  // Carries out the generation by generation simulation. Stores the
  // next generation's values in a temporary array to maintain correctness
  simGeneration() {


    for (var i = 0; i < this.numOfRows; i++) {
      for (var j = 0; j < this.numOfCols; j++) {
        var count = 0;
        // Used to check the values of neighbors
        for (var k = -1; k <= 1; k++) {
          for (var l = -1; l <= 1; l++) {
            // Ensures the neighbor being checked is within the boundaries
            // of the board
            if (i+k >= 0 && i+k < this.numOfRows
              && j+l >= 0 && j+l < this.numOfCols) {
              // Does not count the current cell whose neighbors are being
              // counted

              if (k != 0 || l != 0) {
                if (this.board2d[i+k][j+l]) {
                  count++;
                  console.log("Neigbhor " + count + " of Cell " + i + "," + j + " at: " + (i+k) + "," + (j+l));
                }
              }
            }
          }
        }
        var message;
        // Current cell is alive
        if (this.board2d[i][j]) {
          // Live cell stays alive by adequent population
          if (count === 2 || count === 3) {
            this.nextBoard[i][j] = true;
            message = "live cell lives";
          }
          // Live cell dies by underpopulation or overpopulation
          else {
            this.nextBoard[i][j] = false;
            message = "live cell dies";
          }
        }
        // Current cell is dead
        else {
          // Dead cell becomes alive by repopulation
          if (count === 3) {
            this.nextBoard[i][j] = true;
            message = "dead cell becomes alive";
          }
          // Dead cell stays dead
          else {
            this.nextBoard[i][j] = false;
            message = "dead cell stays dead";
          }
        }
        if (this.nextBoard[i][j]) {
          console.log("THIS CELL IS ACTIVE:" + i + "," + j);
        }
      }
    }

    // Sets the values of the next generation
    if (this.isSimRunning) {
      for (var i = 0; i < this.numOfRows; i++) {
        for (var j = 0; j < this.numOfCols; j++) {
          this.board2d[i][j] = this.nextBoard[i][j];
        }
      }
      this.generationNum++;

      setTimeout(()=> {
        this.simGeneration();
      }, 200);
    }


  }

}
