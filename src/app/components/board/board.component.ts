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


    this.board2d = Array(this.numOfCols).fill(false);


    // var tempArr = Array(this.numOfCols).fill(false);
    // this.board2d = Array(this.numOfRows).fill(tempArr);
    console.log(this.board2d);
  }

  ngOnInit() {}

  // When a cell is clicked, changes to the opposite state of what it
  // was before, choosing from true or false;
  changeCellState(e) {
    console.log(e.target.id);
  }

  // Takes cell id and returns the column and row indices
  parseToIndex(index) {

  }



}
