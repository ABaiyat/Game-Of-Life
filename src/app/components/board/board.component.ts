import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  numOfRows:number;
  numOfCols:number;
  simulationSpeed:number = 1000;
  board2d:any = [];
  nextBoard:any = [];
  nCol:any = [];
  nRow:any = [];
  rowId: number = 0;
  colId: number = 0;
  generationNum : number = 0;
  isSimRunning: boolean = false;
  patternState: string = "Random";
  selectedItem: string;

  patterns = [
    "Random",
    "Pulsar",
    "Glider Gun"
  ]

  speeds = [
    1, 2, 3, 4, 5
  ]

  pulsarPattern = [
    [0,0], [0,1], [0,2], [0,6], [0,7], [0,8],
    [5,0], [5,1], [5,2], [5,6], [5,7], [5,8],
    [7,0], [7,1], [7,2], [7,6], [7,7], [7,8],
    [12,0], [12,1], [12,2], [12,6], [12,7], [12,8],

    [2,-2], [3,-2], [4,-2], [2,3], [3,3], [4,3],
    [2,5], [3,5], [4,5], [2,10], [3,10], [4,10],
    [8,-2], [9,-2], [10,-2], [8,3], [9,3], [10,3],
    [8,5], [9,5], [10,5], [8,10], [9,10], [10,10]
  ]

  gliderGunPattern = [
    [0,0], [0,1], [1,1], [1,0], [0,10], [1,10], [3,11], [4,12], [4,13],
    [-1,11], [-2,12], [-2,13], [1,14], [-1,15], [0,16], [1,16], [2,16],
    [3,15], [1,17], [0,20], [2,10], [-1,20], [-2,20], [0,21], [-1,21], [-2, 21],
    [1,22], [-3,22], [-3,24], [-4,24], [1,24], [2,24], [-2,34], [-1,34],
    [-1,35],[-2,35],
  ]


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

  // On initialization, randomizes the board and runs the simulation
  ngOnInit() {
    this.randomizeBoard();
    this.run();
  }

  // When the refresh icon is clicked, refreshes the pattern that is selected
  refresh() {
    this.changePattern(this.patternState);
  }

  // Changes the pattern when a new pattern is selected, or reinitializes the
  // selected pattern when the refresh icon is clicked
  changePattern(pattern) {
    this.patternState = pattern;

    if (pattern === "Random") {
      this.randomizeBoard();
    }
    else if (pattern === "Pulsar") {
      this.update(this.pulsarPattern, 10, 20);
    }
    else if (pattern === "Glider Gun") {
      this.update(this.gliderGunPattern, 5, 5);
    }
  }

  // Takes in the requested pattern and the column and row offsets. Updates
  // the board with the specified pattern by taking in an array of indicies
  // and setting those index values to true
  update(pattern, colOff, rowOff) {
    this.clearBoard();
    for (var i = 0; i < pattern.length; i++) {
      this.board2d[pattern[i][0] + colOff][pattern[i][1] + rowOff] = true;
    }
  }

  // Changes simulation speed when a new speed is selected
  changeSpeed(genPerSec) {
    genPerSec = parseInt(genPerSec);
    this.simulationSpeed = 1000/genPerSec;
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

  // Runs the simulation
  run() {
    this.isSimRunning = true;
    this.simGeneration();
  }

  // Pauses the simulation
  pause() {
    this.isSimRunning = false;
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
        }
      }
    }

    // Sets the values of the next generation. Recursively calls simGeneration in the
    //specified time if the isSimRunning value has not been changed

    if (this.isSimRunning) {
      for (var i = 0; i < this.numOfRows; i++) {
        for (var j = 0; j < this.numOfCols; j++) {
          this.board2d[i][j] = this.nextBoard[i][j];
        }
      }
      this.generationNum++;

      setTimeout(()=> {
        this.simGeneration();
      }, this.simulationSpeed);
    }


  }

}
