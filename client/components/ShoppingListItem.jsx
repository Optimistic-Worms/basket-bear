import React from 'react';
import PriceSelection from './PriceSelection.jsx';


const ShoppingListItem = (props) => {

  return (
    <div className="watch-card">
      <img className="product-image" src={props.item && props.item.imageUrl} />
      <div className="watch-item-footer">
        <a target="_blank" href={props.item.link}><h3>{ props.item && props.item.name }</h3></a>
          <div className="item-info item-info-watch">
            <div className="item-info-merchant">
            <p>{ props.item && props.item.merchant }</p>
            <p className="price">Price when added ${ props.item && props.item.price }</p>
          </div>
          <div className="item-info-merchant">
          { props.item.available &&
            <p className="current-price">Current Price <span className="current-price-dollar">${ props.item && props.item.currentPrice }</span></p> }
          { !props.item.available &&
            <p className="current-price">This item is no longer available</p> }

            <p className="current-price">Watch Price <span className="current-price-dollar">${ props.item && props.item.watchPrice }</span></p>


        </div>

        { props.item.alert && <p className="price-alert">This item's current price has dropped below your watch price. Buy Now!</p>}

        </div>
      <div className="button-wrapper button-wrapper--watch">
        <div className="button-wrapper--flex-left">
        <button className="button button--remove" onClick= {()=>{ props.removeItem(props.item, props.index)} } > <span className="desktop-show">Remove</span><span className="mobile-show"><i className="fa fa-times" aria-hidden="true"></i></span></button>

        <button className="button button--product" onClick= { ()=> {window.open(props.item.link);}} ><span className="desktop-show">Buy Product</span><span className="mobile-show"><i className="fa fa-shopping-cart" aria-hidden="true"></i></span></button>
      </div>
       <button className="button" onClick= {()=>{props.openProductSettings(props.item)}}> Set Watch Price</button>
     </div>
     <PriceSelection />
   </div>
 </div>
  );
};


export default ShoppingListItem;
