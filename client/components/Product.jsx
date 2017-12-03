import React from 'react';


const Product = (props) => {

  return (
    <div className="card">
      <img className="product-image" src={props.item && props.item.imageUrl} />
      <h4>{ props.item && props.item.name }</h4>
      <div className="product-footer">
        <div className="item-info">
        <p>{ props.item && props.item.merchant }</p>
        <p className="price">${ props.item && props.item.price }</p>
      </div>
        <div className="button-wrapper">
        <button className="button button--product" onClick= { ()=> {window.open(props.item.link);}} >Buy Product</button>
        { !props.item.added && <button className="button button--product" onClick= {()=>{ props.addItem(props.item, props.index) } } >Watch Item</button>
        }
      </div>

      </div>
    </div>
  );
};


export default Product;
