import React from 'react';
import Product from './Product.jsx'


const SearchList = (props) => {

  return (
    <div className="list">
      { props.items.map((item, key)=> {
        return (<Product key={key} item={item}/> )
        })
      }
    </div>
  );
}


export default SearchList;
