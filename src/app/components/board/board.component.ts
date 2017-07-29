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

  ngOnInit() {}


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

  clearBoard() {
    for (var i = 0; i < this.numOfRows; i++) {
      for (var j = 0; j < this.numOfCols; j++) {
        this.board2d[i][j] = false;
      }
    }
  }

  checkBoard() {
    console.log("State of Board: ", this.board2d);
  }

  startSim() {
    console.log("Before Simulation:", this.board2d);
    for (var i = 0; i < this.numOfRows; i++) {
      for (var j = 0; j < this.numOfCols; j++) {
        var count = 0;
        for (var k = -1; k <= 1; k++) {
          for (var l = -1; l <= 1; l++) {
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
    //this.board2d = this.nextBoard;
    for (var i = 0; i < this.numOfRows; i++) {
      for (var j = 0; j < this.numOfCols; j++) {
        this.board2d[i][j] = this.nextBoard[i][j];
      }
    }


    console.log("After Sim: ", this.nextBoard);




  }

}
