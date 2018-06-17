import React from 'react'

// Class Board is responsible for rendering the board and all associated graphics
class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hoverSpace: {
        x: null,
        y: null
      }
    }
  }

  // Used for updating the highlighted space after a move is played
  componentDidUpdate(prevProps, prevState) {
    const nextHoverSpace = {
      x: this.state.hoverSpace.x,
      y: this.state.hoverSpace.y + 1
    }

    if (prevProps.currentColor !== this.props.currentColor) {
      this.setState({
        hoverSpace: nextHoverSpace
      })
    }
  }

  renderSpace(x, y) {
    const color = (this.props.spaces[x][y])
    const hoverSpace = this.state.hoverSpace;
    var hover = false;

    if (hoverSpace.x === x && hoverSpace.y === y)
      hover = this.props.currentColor;

    return (
      <Space 
        hover={hover}
        color={color}
        value={this.props.spaces[x][y]}
        key={x + '' + y}
      />
    )
  }

  renderColumn(i) {
    const numRows = this.props.numRows;
    const column = [];

    for (var j = numRows - 1; j >= 0; j--) {
      column.push(this.renderSpace(i,j));
    }

    const divColumn = (
      <div 
          key={i} 
          className='board-col' 
          onMouseEnter={() => this.onMouseEnter(i)} 
          onMouseLeave={() => this.onMouseLeave()}
          onClick={() => this.props.onClick(i)}> 
        {column} 
      </div>
    )

    return divColumn;
  }

  onMouseEnter(column) {
    const x = column;
    const y = this.props.spaces[x].length;

    this.setState({
      hoverSpace: {
        x: x,
        y: y
      }
    })
  }

  onMouseLeave() {
    this.setState({
      hoverSpace: {
        x: null,
        y: null
      }
    })
  }

  render() {
    const numCols = this.props.numCols;
    const renderBoard = [];

    for (var i = 0; i < numCols; i++) {
      const column = this.renderColumn(i);
      renderBoard.push(column);
    }
    
    return(
      <div className='board'> 
        {renderBoard}
      </div>
    );

  }
}

// Renders a single space
function Space(props) {
  const style = {}

  if (props.hover) {
    style.backgroundColor = props.hover;
    style.opacity = 0.5;
  }

  return (
    <div className='space' style={style} onClick={props.onClick}>
      <Piece color={props.color}/>
    </div>
  );
}

// Renders a game piece
function Piece(props) {
  return (
    <div className='piece'>
      <div className={props.color} />
    </div>
  );
}

export default Board;