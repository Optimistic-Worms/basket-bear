import React from 'react';


const ProductSettings = (props) => {

  return (
    <div className="card card-set-price">
      <h3>Edit Product Settings</h3>
      <img className="product-image" src={props.item && props.item.imageUrl} />
      <h2>{props.item.name}</h2>

      <div className="item-info item-info-watch">

        <div className="item-info-merchant">
          <p>{ props.item && props.item.merchant }</p>
          <p className="price">Price when added ${ props.item && props.item.price }</p>
        </div>

        <div className="item-info-merchant">
        <p className="current-price">Current Price ${ props.item && props.item.currentPrice }</p>

          </div>

        Set a watch Price
        <input className="watch-form" placeholder="Set a Watch Price" onChange= {(input) => props.updateInputString(input)} type="text"/>


      </div>
      <button className="button" onClick= {()=>{props.saveProductSettings(props.item)}}> Save</button>
    </div>
  );

};


export default ProductSettings;
