import React from 'react';
import Product from './Product.jsx';
import '../css/watch-list.css'


const SearchList = (props) => {

  return (
    <div className="list">
      { props.items.map((item, key, array)=> {
          return (
            <Product key={key} index={key} item={item} addItem={props.addItem} formatPrice={props.formatPrice} />
          );
        })
      }
    </div>
  );
};


export default SearchList;
