import React from "react";
import Board from "./Board";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squaresSt: Array(9).fill(null),
      xIsNext: true, // 次の手番
      finished: false // 勝負が決まったか
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i) {
    const squaresAry = [...this.state.squaresSt];
    if(squaresAry[i]) {return;}

    // Check is there winner
    if(this.state.finished) {return;}
    const winner = calculateWinner(this.state.squaresSt);
    if(winner){
      this.setState({finished: true});
      return;
    }

    squaresAry[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      squaresSt: squaresAry,
      xIsNext: !this.state.xIsNext
    });
  };

  render() {
    const winner = calculateWinner(this.state.squaresSt);
    // const status = "Next Player: " + (this.state.xIsNext ? "X" : "O");
    const status = (winner) ?
      "Winner: " + winner :
      "Next Player: " + (this.state.xIsNext ? "X" : "O");
      
    return (
      <div className="game">
        <Board
          squaresBrd={this.state.squaresSt}
          onClick={(i) => this.handleClick(i)}
        />
        <div className="game-info">
          <div>{status}</div>
        </div>
      </div>
    );
  }
}

// 勝利条件確認関数
function calculateWinner(squares) {
  // 一直線マス組み合わせ定義
  const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++ ){
    const [a, b, c] = lines[i];
    const playerMark = squares[a];
    if(playerMark && playerMark === squares[b] && playerMark === squares[c]){
      return playerMark;
    }
  }
  return null;
}

export default App;
