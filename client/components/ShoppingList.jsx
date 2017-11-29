import React from 'react';
import axios from 'axios';
import ShoppingListItem from './ShoppingListItem.jsx';
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
        })
      } else {
        console.log('Cant get shopping list. Must Log in');
        window.alert('Please sign in to view your shopping list!');
      }
    });
  }

  removeItem(item) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        axios.delete('/shoppingList', {
          params: {
            username : user.uid,
            productId : item.id
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
        })
      } else {
        console.log('Cant get shopping list. Must Log in');
        window.alert('Please sign in to view your shopping list!');
      }
    });
  }



  render () {
    return (
    <div className="list">
      { this.state.items.map((item, key)=> {
        return (<ShoppingListItem key={key} index={key} item={item} removeItem = {this.removeItem}/> );
        })
      }
    </div>
    );
  }


};


export default ShoppingList;
