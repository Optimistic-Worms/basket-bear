import React from 'react';
import axios from 'axios';

class PriceSelection extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      price: '',
      inputting: false
    }
   }

  setPercent(n) {
    const watchPrice = this.props.item.currentPrice - (this.props.item.currentPrice * n / 100)
    console.log(n, this.props.item.currentPrice, watchPrice)
    this.props.setWatchPrice(this.props.item, watchPrice)
  }

  setPrice(event){
    console.log(event.target.value)

    this.setState({price: event.target.value, inputting: true})
  }

  submitPrice(event) {
    this.props.setWatchPrice(this.props.item, this.state.price)
  }

  render () {
    return (
    <div>
      <div
        onClick={() => this.setPercent(5)}
        className="button button-settings">5%</div>
      <div
        onClick={() => this.setPercent(10)}
        className="button button-settings">10%</div>
      <div
        onClick={() => this.setPercent(15)}
        className="button button-settings">15%</div>
     <div
        onClick={() => this.setPercent(20)}
        className="button button-settings">20%</div>
      <div
        onClick={() => this.setPercent(25)}
        className="button button-settings">25%</div>
      <div>
        <input onChange={this.setPrice.bind(this)}/>
        {this.state.inputting &&
          <div
            onClick={this.submitPrice.bind(this)}
            className="button button-settings"
          >Set Watch Price</div>
        }

      </div>
    </div>
  )
  }
}

export default PriceSelection;