import React from 'react';


const ShoppingListItem = (props) => {

  return (
    <div className="card">
      <img className="product-image" src={props.item && props.item.imageUrl} />
      <h3>{ props.item && props.item.name }</h3>
      <div className="product-footer product-footer-watch">
          <div className="item-info item-info-watch">
            <div className="item-info-merchant">
            <p>{ props.item && props.item.merchant }</p>
            <p className="price">Price when added ${ props.item && props.item.price }</p>
          </div>
          <p className="current-price">Current Price ${ props.item && props.item.currentPrice }</p>
        </div>
      <div className="button-wrapper">
        <button className="button button--product" onClick= { ()=> {window.open(props.item.link);}} >Buy Product</button>
       <button className="button button--remove" onClick= {()=>{ props.removeItem(props.item, props.index)} } > Remove</button>
     </div>
   </div>
 </div>
  );
};


export default ShoppingListItem;
