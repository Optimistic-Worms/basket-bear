import React from 'react';
import axios from 'axios';
import Product from './Product.jsx';
import firebase from './user/firebase-auth';

class ShoppingList extends React.Component {
  constructor() {
    super();
    this.state = {
      items : []
    };
    this.loadShoppingList = this.loadShoppingList.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
    this.loadShoppingList();
  }

  loadShoppingList() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        axios.get('/shoppingList', {
          params: {
            username: user.uid,
          }
        })
        .then((response) => {
          console.log(response.data);
          var itemsObj = response.data;
          var itemsArr = [];
          for (var i in itemsObj) {
            itemsArr.push(itemsObj[i]);
          }
          this.setState({items: itemsArr});
          console.log('ITEMS;',  this.state.items);
        })
      } else {
        console.log('Cant get shopping list. Must Log in');
      }
    });
  }

  removeItem(item) {
    console.log('remove item', item);
  }



  render () {
    return (
    <div className="list">
      { this.state.items.map((item, key)=> {
        return (<Product key={key} item={item} added={true} removeItem = {this.removeItem}/> );
        })
      }
    </div>
    );
  }


};


export default ShoppingList;
