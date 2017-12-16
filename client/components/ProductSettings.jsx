import React from 'react';


const ProductSettings = (props) => {

  return (
    <div className="card">
      <h3>Edit Product Settings</h3>
      <img className="product-image" src={props.item && props.item.imageUrl} />
      <h3>{props.item.name}</h3>

      <div className="item-info item-info-watch">
        <div className="item-info-merchant">
          <p>{ props.item && props.item.merchant }</p>
          <p className="price">Price when added ${ props.item && props.item.price }</p>
        </div>
        <p className="current-price">Current Price ${ props.item && props.item.currentPrice }</p>

        Set a watch Price
 <input className="search-form" placeholder="Set a Watch Price" onChange= {(input) => props.updateInputString(input)} type="text"/>


      </div>
      <button className="button" onClick= {()=>{props.saveProductSettings(props.item)}}> Save</button>
    </div>
  );

};


export default ProductSettings;
