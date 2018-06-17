import React from 'react'
import Board from './board'

// Class Game handles all game logic and displays game state/info
class Game extends React.Component {
  constructor(props) {
    super(props);

    const numCols = this.props.numCols;
    const spaces = new Array(numCols)
    for (var i = 0; i < numCols; i++) spaces[i] = [];

    this.state = {
      spaces: spaces,
      blacksTurn: true,
      winner: null,
      numMoves: this.props.numCols * this.props.numRows
    }
  }

  handleClick(column) {
    const spaces = this.state.spaces;
    const color = (this.state.blacksTurn ? 'black' : 'red');

    if (spaces[column].length + 1 > this.props.numRows) {
      return;
    }

    if (this.state.winner || this.state.numMoves === 0)
      return;

    spaces[column].push(color);
    const winner = getWinner(spaces, column, this.props);
    const numMoves = this.state.numMoves - 1;

    this.setState({
      spaces: spaces,
      blacksTurn: !this.state.blacksTurn,
      winner: winner,
      numMoves: numMoves
    })
  }

  render() {
    const spaces = this.state.spaces;
    const currentColor = (this.state.blacksTurn ? 'black' : 'red');
    const currentPlayer = this.props[currentColor];
    var gameStatus = currentPlayer + "'s Turn";

    if (this.state.numMoves === 0)
      gameStatus = 'Draw!';
    else if (this.state.winner) 
      gameStatus = this.props[this.state.winner] + ' wins!';

    return(
      <div className='game'>
        <div className='player'>
          <div className='player-label'> {this.props.black} </div>
          <div className='player-info black'> BLACK </div>
        </div>
        <div className='player'>
          <div className='player-label'> {this.props.red} </div>
          <div className='player-info red'> RED </div>
        </div>
        <div className='game-status'> {gameStatus} </div>
        <button onClick={() => this.props.endGame()}> {this.state.winner ? 'Play Again' : 'Reset'} </button>
        <Board 
          spaces={spaces}
          currentColor = {currentColor}
          numCols={this.props.numCols}
          numRows={this.props.numRows}
          onClick={column => this.handleClick(column)}
        />
      </div>
    )
  }
}


function getWinner(spaces, column, gameInfo) {
  const lastMoveX = column;
  const lastMoveY = spaces[column].length - 1;
  const lastMove = spaces[lastMoveX][lastMoveY];
  const numCols = gameInfo.numCols;
  const numRows = gameInfo.numRows;

  // check column
  var count = 0;
  for (var i = lastMoveY - 3; i <= lastMoveY; i++) {
    if (i < 0)
      continue;

    if (spaces[lastMoveX][i] === lastMove)
      count ++;
    else
      count = 0

    if (count >= 4)
      return lastMove;
  }

  // check row
  count = 0;
  for (i = lastMoveX - 3; i <= lastMoveX + 3; i++) {
    if (i < 0 || i > numCols - 1)
      continue;

    if (spaces[i][lastMoveY] === lastMove)
      count++;
    else 
      count = 0;

    if (count >= 4)
      return lastMove;
  }

  // check diagonal
  count = 0;
  for (var x = lastMoveX - 3, y = lastMoveY - 3; x <= lastMoveX + 3 && y <= lastMoveY + 3; x++, y++) {
    if (x < 0 || y < 0 || x > numCols - 1 || y > numRows - 1)
      continue;

    if (spaces[x][y] === lastMove)
      count++;
    else
      count = 0;

    if (count >= 4)
      return lastMove;
  }

  // check other diagonal
  count = 0;
  for (x = lastMoveX - 3, y = lastMoveY + 3; x <= lastMoveX + 3 && y >= lastMoveY - 3; x++, y--) {
    if (x < 0 || y < 0 || x > numCols - 1 || y > numRows - 1)
      continue;

    if (spaces[x][y] === lastMove)
      count++;
    else
      count = 0;

    if (count >= 4)
      return lastMove;
  }

  return null;
}

export default Game;