import React, { Component } from 'react';
import './App.css';
import BingoCard from './components/BingoCard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: this.generateBingoCards(4),
      drawnNumbers: {},
      winner: false,
      latestNumber: ''
    }
    console.log(this.generateBingoCards(4));
    this.drawNumber = this.drawNumber.bind(this);
    this.submitForVerification = this.submitForVerification.bind(this);
  }

  drawNumber() {
    fetch('http://localhost:9000/api/ball')
      .then(res => res.json())
      .then(data => {
        const newDrawn = {...this.state.drawnNumbers};
        if (!newDrawn[data.number]) {
          newDrawn[data.number] = true
        }
        this.setState({
          drawnNumbers: newDrawn,
          latestNumber: data.number
        })
      })
      .catch(err => console.log(`error here: ${err}`))
  }

  generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1
  }

  generate25Numbers() {
    const nums = [];
    while (nums.length !== 25) {
      const num = this.generateRandomNumber();
      if (!nums.includes(num)) {
        nums.push(num);
      }
    }
    return nums;
  }

  generateBingoCard() {
    const nums = this.generate25Numbers();
    const board = [];
    let row = [];
    for (let num of nums) {
      row.push(num);
      if (row.length === 5) {
        board.push(row);
        row = [];
      }
    }
    return board;
  }

  generateBingoCards(qty) {
    const cards = [];
    for (let i = 0; i < qty; i++) {
      cards[i] = this.generateBingoCard();
    }
    return cards;
  }

  submitForVerification(submitted) {
    console.log('verification sent')
    const verification = {
      drawn: this.state.drawnNumbers,
      submitted
    }
    fetch('http://localhost:9000/api/verification', {
      method: 'post',
      body: JSON.stringify(verification),
      headers: {"Content-Type": "application/json"}
    })
      .then(res => res.json())
      .then(result => {
        this.setState({
          winner: result.result
        })
      })
  }

  render() {
    return (
      <div>
        {this.state.winner && alert('winner!!!!!')} 
        <h1>Bingo!</h1>
        <h3>Last ball: {this.state.latestNumber}</h3>
        <button onClick={this.drawNumber}>Hit me widt it!</button>
        <div className="cardsContainer">
          {this.state.cards.map(card => <BingoCard verify={this.submitForVerification} drawn={this.state.drawnNumbers} card={card}/>)}
          <p>Click on card when blacked out to submit for verification!</p>
        </div>
      </div>
    );
  }
}

export default App;
