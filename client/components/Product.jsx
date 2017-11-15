import React from 'react';


const Product = (props) => {

  return (
    <div>
      <img src={props.item && props.item.imageUrl} />
      <p>{ props.item && props.item.name }</p>
      <p>{ props.item && props.item.merchant }</p>
       <p>{ props.item && props.item.price }</p>
      <button onClick= { ()=> {window.open(props.item.link)}} >Buy Product</button>

    </div>
  );
}


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