export default class Game {
    constructor(size) {
      this.size = size;
      this.onWinHandler = [];
      this.onMoveHandler = [];
      this.onLoseHandler = [];
      this.listenOn = true;
      this.setupNewGame();
  
      this.winEvent = () => {
        this.onWinHandler.forEach(callback => {
          callback(this.gameState);
        });
      };  
      this.loseEvent = () => {
        
        
        
        this.onLoseHandler.forEach(callback => {
          callback(this.gameState);
        });
      };
  
      this.moveEvent = () => {
        this.onMoveHandler.forEach(callback => {
          callback(this.gameState);
        });
      };
    }
     /*================Game Init ==================*/
     setupNewGame() {
      this.gameState = {
        board: [],
        score: 0,
        won: false,
        over: false
      };
  
      for (let i = 0; i < this.size * this.size; i++) {
        this.gameState.board.push(0);
      }
      this.generateTile();
      this.generateTile();
    }
  
    loadGame(gameState) {
      this.gameState = gameState;
      this.size = Math.round(Math.sqrt(gameState.board.length));
    }
  
    checkBounds(int) {
      return !(int > this.size || int < 0);
    }
  
    checkWinLose() {
      this.gameState.board.forEach(elem => {
        if (elem == 2048) {
          this.gameState.won = true;
        }
      });
  
      if (!this.possibleToMove()) {
        this.gameState.over = true;
      }
  
      if (this.gameState.won) {
        this.onWinHandler.forEach(elem => elem(this.getGameState()));
      }
  
      if (this.gameState.over) {
        this.onLoseHandler.forEach(elem => elem(this.getGameState()));
      }
  
      return this.gameState.won || this.gameState.over;
    }
  
    possibleToMove() {
      this.listenOn = false;
  
      let origonalBoard = this.gameState.board.slice(0);
      let origonalScore = this.gameState.score;
  
      this.move("up");
      let up = this.gameState.board.slice(0);
      this.gameState.board = origonalBoard.slice(0);
      this.move("down");
      let down = this.gameState.board.slice(0);
      this.gameState.board = origonalBoard.slice(0);
      this.move("right");
      let right = this.gameState.board.slice(0);
      this.gameState.board = origonalBoard.slice(0);
      this.move("left");
      let left = this.gameState.board.slice(0);
      this.gameState.board = origonalBoard.slice(0);
  
      for (let t = 0; t < this.gameState.board.length; t++) {
        //console.log([up[t],down[t],left[t],right[t]],origonalBoard[t]);
        if (
          up[t] != origonalBoard[t] ||
          down[t] != origonalBoard[t] ||
          left[t] != origonalBoard[t] ||
          right[t] != origonalBoard[t]
        ) {
          this.listenOn = true;
          this.gameState.score = origonalScore;
          return true;
        }
      }
      this.listenOn = true;
      this.gameState.score = origonalScore;
      return false;
    }
  
    hasChanged(board1, board2) {
      let z = 0;
      while (z < board1.length) {
        if (board1[z] != board2[z]) {
          return true;
        }
        z++;
      }
      return false;
    }
  
    move(direction) {
      let myScore = this.gameState.score;
      let origonalBoard = this.gameState.board.slice(0);
  
      // left == twoard the head of the array and right == twoard the tail
      let combineLeft = function(arr) {
        let lastNum = {
          seen: -1,
          idx: -1
        };
        let currentIndex = 0;
        let currentValue = -1;
  
        while (currentIndex < arr.length) {
          currentValue = arr[currentIndex];
          if (currentValue == lastNum.seen) {
            myScore += lastNum.seen * 2;
            arr[lastNum.idx] = lastNum.seen * 2;
            arr[currentIndex] = 0;
            lastNum.seen = -1;
            lastNum.idx = -1;
          } else if (currentValue != 0) {
            lastNum.seen = currentValue;
            lastNum.idx = currentIndex;
          }
          currentIndex++;
        }
        return arr;
      };
  
      let combineRight = function(arr) {
        return combineLeft(arr.reverse()).reverse();
      };
  
      let shiftLeft = function(arr) {
        let tempArr = [];
        arr.forEach(elem => {
          if (elem != 0) {
            tempArr.push(elem);
          }
        });
        while (tempArr.length < arr.length) {
          tempArr.push(0);
        }
        return tempArr;
      };
      let shiftRight = function(arr) {
        return shiftLeft(arr.reverse()).reverse();
      };
  
      // turn a 3d array into a 2d array assuming the array holding other arrays is the top of the 'board'
      let populateArrTop = function(arr) {
        let newBoard = [];
        let j = 0;
        while (j < arr.length) {
          arr.forEach(elem => {
            newBoard.push(elem[j]);
          });
          j++;
        }
        return newBoard;
      };
      // assume it's the side instead
      let populateArrSide = function(arr) {
        let newBoard = [];
        arr.forEach(elem => {
          elem.forEach(elem2 => {
            newBoard.push(elem2);
          });
        });
        return newBoard;
      };
  
      let myArray = [];
      let i = 0;
      for (let row = 0; row < this.size; row++) {
        for (let col = 0; col < this.size; col++) {
          myArray.push({
            r: row,
            c: col,
            index: i,
            value: this.gameState.board[i]
          });
          i++;
        }
      }
  
      let myResult = [];
  
      if (direction == "up" || direction == "down") {
        let currentCol = 0;
        while (currentCol < this.size) {
          //get all the elements in current column as values
          let myCol = [];
          let temp = myArray.filter(x => x.c == currentCol);
          temp.forEach(elem => myCol.push(elem.value));
  
          if (direction == "up") {
            myCol = combineLeft(myCol);
            myCol = shiftLeft(myCol);
          } else {
            myCol = combineRight(myCol);
            myCol = shiftRight(myCol);
          }
          myResult.push(myCol);
          currentCol++;
        }
        this.gameState.board = populateArrTop(myResult);
      } else if (direction == "left" || direction == "right") {
        let currentRow = 0;
        while (currentRow < this.size) {
          //get all the elements in current column as values
          let myRow = [];
          let temp = myArray.filter(x => x.r == currentRow);
          temp.forEach(elem => myRow.push(elem.value));
  
          if (direction == "left") {
            myRow = combineLeft(myRow);
            myRow = shiftLeft(myRow);
          } else {
            myRow = combineRight(myRow);
            myRow = shiftRight(myRow);
          }
          myResult.push(myRow);
          currentRow++;
        }
        this.gameState.board = populateArrSide(myResult);
      }
      if (this.hasChanged(origonalBoard, this.gameState.board)) {
        this.generateTile();
      }
      this.gameState.score = myScore;
  
      if (this.listenOn) {
        this.checkWinLose();
        if (this.possibleToMove()) {
          this.onMoveHandler.forEach(elem => elem(this.getGameState()));
        }
      }
    }
  
    toString() {
      let myString = "";
      let i = 0;
      this.gameState.board.forEach(elem => {
        myString += "[" + elem + "]";
        i++;
        if (i % this.size == 0) {
          myString += "\n";
        } else {
          myString += " ";
        }
      });
      return myString;
    }
  
    onMove(callback) {
      this.onMoveHandler.push(callback);
    }
  
    onWin(callback) {
      this.onWinHandler.push(callback);
    }
  
    onLose(callback) {
      this.onLoseHandler.push(callback);
    }
  
    getGameState() {
      return {
        board: this.gameState.board,
        score: this.gameState.score,
        won: this.gameState.won,
        over: this.gameState.over
      };
    }
    /*================Add new tile================ */
    randomTwoOrFour() {
      let a = Math.round(Math.random() * 10);
      if (a == 9) {
        return 4;
      } else {
        return 2;
      }
    }
  
    randomIndex() {
      return Math.floor(Math.random() * (this.size * this.size));
    }
  
    generateTile() {
      let idx = 0;
      while (true) {
        idx = this.randomIndex();
        if (this.gameState.board[idx] == 0) {
          this.gameState.board[idx] = this.randomTwoOrFour();
          break;
        }
      }
    }
  
   
  }