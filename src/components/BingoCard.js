import React, {Component} from 'react';

class BingoCard extends Component {
  constructor(props) {
    super(props);
    this.generateRow = this.generateRow.bind(this);
  }

  generateRow(row) {
    return(
      <div>
        {row.map(square => {
          const called = this.props.drawn[square] ? 'called' : '';
          return (
            <div className={`${called} square`}>{square}</div>
          )
        })}
      </div>
    )
  }

  render() {
    return(
      <div onClick={() => this.props.verify(this.props.card)} className="card">{this.props.card.map(this.generateRow)}</div>
    )
  }
}

export default BingoCard;