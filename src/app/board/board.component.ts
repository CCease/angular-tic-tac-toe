import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  isWinner: boolean = true;
  isXTurn: boolean = true;
  status: string = "none";
  blockValues: string[] = Array(9).fill("-");
  history: number[] = [];

  constructor() { }

  ngOnInit(): void {}

  newGame() {
    this.isXTurn = true;
    this.status = "X turn now.";
    this.blockValues = Array(9).fill("-");
    this.isWinner = false;
    this.history = [];
  }

  onBlockClick(i: number) {
    this.blockValues[i] = this.isXTurn ? "X" : "O";
    this.isXTurn = !this.isXTurn;
    this.status = this.isXTurn ? "X turn now." : "O turn now.";
    this.history.push(i);

    if (this.blockValues.includes("-")){
      if (this.calcWinner() != "-") {
        this.status = "The winner is " + this.calcWinner() + " !";
        this.isWinner = true;
      }
    }
    else{
      this.status = "Draw !";
      this.isWinner = true;
    }
    
  }

  calcWinner(): string {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let index = 0; index < lines.length; index++) {
      const [a, b, c] = lines[index];
      if (this.blockValues[a] != "-" && this.blockValues[a] == this.blockValues[b] && this.blockValues[b] == this.blockValues[c]) {
        return this.blockValues[a];
      }
    }
    return "-";
  }

  rewind(index: number){
    for (let i = index; i < 9; i++) {
      console.log(this.blockValues.length);
      this.blockValues[i] = '-';
      this.history = this.history.slice(0,index);
    }
  }

}
