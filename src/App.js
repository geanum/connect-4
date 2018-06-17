import React, { Component } from 'react';
import Game from './game'

// Class App is the app's entry point and handles meta info like player names
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      gameStart: false,
      black: 'Player 1',
      red: 'Player 2'
    }
  }

  handleInputChange(target) {
    this.setState({
      [target.name]: target.value
    })
  }

  startGame(event) {
    this.setState({
      gameStart: true
    });

    event.preventDefault();
  }

  endGame() {
    this.setState({
      gameStart: false
    });
  }

  renderForm() {
    return (
      <div>
        <h1> Connect 4 </h1>
        <p> Please input your desired player names. Then press Start! </p>
        <form className='player-form' onSubmit={(event) => this.startGame(event)}>
          <label className='black'>
            Black:
          </label>
          <input type='text' name='black' placeholder={this.state.black} onChange={(event) => this.handleInputChange(event.target)}/>
          <label className='red'>
            Red:
          </label>
          <input type='text' name='red' placeholder={this.state.red} onChange={(event) => this.handleInputChange(event.target)}/>
          <input type='submit' value='Start' />
        </form>
      </div>
    )
  }

  render() {

    if (!this.state.gameStart) {
      return this.renderForm();
    }

    return (
      <div>
        <h1> Connect 4 </h1>
        <Game 
          black={this.state.black} 
          red={this.state.red} 
          numCols={7} 
          numRows={6}
          endGame={() => this.endGame()}
        />
      </div>
    );
  }
}

export default App;
