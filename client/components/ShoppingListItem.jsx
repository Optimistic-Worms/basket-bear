import React from 'react';


const ShoppingListItem = (props) => {

  return (
    <div className="card">
      <img className="product-image" src={props.item && props.item.imageUrl} />
      <h3>{ props.item && props.item.name }</h3>
      <div className="product-footer">
      <div className="item-info">
        <p>{ props.item && props.item.merchant }</p>
        <p className="price">Current Price ${ props.item && props.item.currentPrice }</p>
        <p className="price">Price when added ${ props.item && props.item.price }</p>
      </div>
      <div className="button-wrapper">
        <button className="button button--product" onClick= { ()=> {window.open(props.item.link);}} >Buy Product</button>
       <button className="button button--product" onClick= {()=>{ props.removeItem(props.item, props.index)} } > Remove From List</button>
     </div>
   </div>
 </div>
  );
};


export default ShoppingListItem;
