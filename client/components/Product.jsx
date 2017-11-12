import React from 'react';


const Product = (props) => {

  return (
    <div>
      <img src={props.item && props.item.galleryURL[0]} />
      <span>{ props.item && props.item.title[0] }</span>

    </div>
  );
}


export default Product;

