import React from "react";
import Board from "./Board";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // [{配列},{配列},{配列},{配列}...]の形で各盤面を保存する。
      history: [{squaresH: new Array(9).fill(null)}],
      squaresSt: Array(9).fill(null),
      xIsNext: true, // 次の手番
      finished: false // 勝負が決まったか
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i) {
    const history = [...this.state.history];
    const squaresH = [...history[history.length - 1].squaresH];

    if(squaresH[i]) {return;}

    // Check is there winner
    if(this.state.finished) {return;}
    const winner = calculateWinner(squaresH);
    if(winner){
      this.setState({finished: true});
      return;
    }

    squaresH[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: [...history, {squaresH}],
      xIsNext: !this.state.xIsNext
    });
  };

  jumpTo(step){
    console.log(step);
  }

  render() {
    const history = [...this.state.history];
    const squaresH = history[history.length - 1].squaresH; 

    const winner = calculateWinner(squaresH);
    // const status = "Next Player: " + (this.state.xIsNext ? "X" : "O");
    const status = (winner) ?
      "Winner: " + winner :
      "Next Player: " + (this.state.xIsNext ? "X" : "O");
      
    // History trace button
    const moves = history.map((step, move) => {
      // 0 click = 0
      // 1 click = 0, 1
      // 2 click = 0, 1, 2 ...
      // console.log(step, " ::: ", move);
      const desc = move ? "Move #" + move : "Game Start";
      return(
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <Board
          squaresBrd={squaresH}
          onClick={(i) => this.handleClick(i)}
        />
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
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
