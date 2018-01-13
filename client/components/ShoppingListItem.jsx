import React from 'react';
import PriceSelection from './PriceSelection.jsx';

class ShoppingListItem extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      selecting: false
    }
  }

  togglePriceSelection() {
    this.setState({selecting: !this.state.selecting})
  }

  formatPrice(string) {
    if (string) {
      return Number(string).toFixed(2);;
    } else {
      return '';
    }
  }

  render() {
    return (
    <div className="watch-card">
      <img className="product-image" src={this.props.item && this.props.item.imageUrl} />
      <div className="watch-item-footer">
        <a target="_blank" href={this.props.item.link}><h3>{ this.props.item && this.props.item.name }</h3></a>
          <div className="item-info item-info-watch">
            <div className="item-info-merchant">
            <p>{ this.props.item && this.props.item.merchant }</p>
          { this.props.item.available &&
             <div className="current-price">Current Price <span className="current-price-dollar">${ this.props.item && this.props.item.currentPrice }</span></div>
            }
          { !this.props.item.available &&
            <p className="current-price">This item is no longer available</p> }
          </div>
          <div className="item-info-merchant">
            <p className="price">Price when added ${ this.props.item && this.props.item.price }</p>

            <p className="current-price">Watch Price <span className="current-price-dollar">$
            {this.props.item && this.formatPrice(this.props.item.watchPrice)}</span></p>


        </div>

        { this.props.item.alert && <p className="price-alert">This item's current price has dropped below your watch price. Buy Now!</p>}

        </div>
      <div className="button-wrapper button-wrapper--watch">
        <div className="button-wrapper--flex-left">
        <button className="button button--remove" onClick= {()=>{ this.props.removeItem(this.props.item, this.props.index)} } > <span className="desktop-show">Remove</span><span className="mobile-show"><i className="fa fa-times" aria-hidden="true"></i></span></button>

        <button className="button button--product" onClick= { ()=> {window.open(this.props.item.link);}} ><span className="desktop-show">Buy Product</span><span className="mobile-show"><i className="fa fa-shopping-cart" aria-hidden="true"></i></span></button>
      </div>
      {!this.state.selecting &&
        <button
          className="button"
          onClick={this.togglePriceSelection.bind(this)}
        > Set Watch Price</button>}
     </div>
     {this.state.selecting &&
       <PriceSelection
          setWatchPrice={this.props.setWatchPrice}
          item={this.props.item}
          toggle={this.togglePriceSelection.bind(this)}
        />
     }
   </div>
 </div>
  );
  }


};


export default ShoppingListItem;
