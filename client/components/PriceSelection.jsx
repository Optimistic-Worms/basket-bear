import React from 'react';
import axios from 'axios';

class PriceSelection extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      price: ''
    }
   }

  setPercent(n) {
    const watchPrice = this.props.item.currentPrice - (this.props.item.currentPrice * n / 100)
    console.log(n, this.props.item.currentPrice, watchPrice)
    this.props.setWatchPrice(this.props.item, watchPrice)
    this.props.toggle();
  }

  setPrice(event){
    console.log(event.target.value)
    this.setState({price: event.target.value})
  }

  submitPrice(event) {
    this.props.setWatchPrice(this.props.item, this.state.price);
    this.setState({price: ''});
    this.props.toggle();
  }

  render () {
    return (

    <div>
      <div className="price-selection">
        <div
          onClick={() => this.setPercent(5)}
          className="button button-settings">-5%</div>
        <div
          onClick={() => this.setPercent(10)}
          className="button button-settings">-10%</div>
        <div
          onClick={() => this.setPercent(15)}
          className="button button-settings">-15%</div>
        <div
          onClick={() => this.setPercent(20)}
          className="button button-settings">-20%</div>
        <div
          onClick={() => this.setPercent(25)}
          className="button button-settings">-25%</div>
        <div
          onClick={() => this.setPercent(25)}
          className="button button-settings">-25%</div>
      </div>

      $ <input
        value={this.state.price}
        onChange={this.setPrice.bind(this)}
      />

      <div
        onClick={this.submitPrice.bind(this)}
        className="button"
      >Set Custom Price</div>

    </div>
  )
  }
}

export default PriceSelection;