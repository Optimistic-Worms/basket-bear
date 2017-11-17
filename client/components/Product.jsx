import React from 'react';


const Product = (props) => {

  return (
    <div className="card">
      <img className="product-image" src={props.item && props.item.imageUrl} />
      <h3>{ props.item && props.item.name }</h3>
      <div className="item-info">
      <p>{ props.item && props.item.merchant }</p>
       <p className="price">${ props.item && props.item.price }</p>
      <button className="button button--product" onClick= { ()=> {window.open(props.item.link);}} >Buy Product</button>
    </div>

    </div>
  );
};


export default Product;

// var Product = {
//   id: Number,
//   name: String,
//   imageUrl: String,
//   description: String,
//   merchant: String,
//   link: String,
//   priceHistory: Array,
//   userPricing: Array of tuples [user, price]
// }
