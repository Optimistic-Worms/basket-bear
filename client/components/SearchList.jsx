import React from 'react';
import Product from './Product.jsx';


const SearchList = (props) => {

  return (
    <div className="list">
      { props.items.map((item, key, array)=> {
          return (
            <Product key={key} index={key} item={item} addItem={props.addItem} />
          );
        })
      }
    </div>
  );
};


export default SearchList;
