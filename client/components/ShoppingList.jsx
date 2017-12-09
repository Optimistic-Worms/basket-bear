import React from 'react';
import axios from 'axios';
import ShoppingListItem from './ShoppingListItem.jsx';
import firebase from './user/firebase-auth';

class ShoppingList extends React.Component {
  constructor() {
    super();
    this.state = {
      items : [],
      alert : null
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
        firebase.auth().currentUser.getIdToken(true).then((idToken) => {
        axios.get(`/shoppingList?access_token=${idToken}`)
        .then((response) => {
          var itemsObj = response.data;
          var itemsArr = [];
          for (var i in itemsObj) {
            itemsArr.push(itemsObj[i]);
          }
          if (itemsArr.length < 1) {
            this.setState({alert: 'You are not watching any items'})
          } else {
            this.setState({alert: ''});
            this.setState({items: itemsArr});
          }
        })
      })// End of token fetch.
      } else {
        this.setState({ alert: 'Please sign in to view your shopping list!'})
      }
    })
  }

  removeItem(item) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.auth().currentUser.getIdToken(true).then((idToken) => {
          axios.delete(`/shoppingList?access_token=${idToken}`, {
            params: {
              productId : item.id
            }
          })
          .then((response) => {
            var itemsObj = response.data;
            var itemsArr = [];
            for (var i in itemsObj) {
              itemsArr.push(itemsObj[i]);
            }
            if (itemsArr.length < 1) {
              this.setState({alert: 'You are not watching any items'})
            } else {
              this.setState({alert: ''});
            }
            this.setState({items: itemsArr});
          })
        })
      } else {
        console.log('Cant get shopping list. Must Log in');
      }
    });
  }



  render () {
    return (
      <div className="watch-container">
      <h1>Your Watch List</h1>
      {this.state.alert && <h4>{this.state.alert}</h4>}
      <div className="results">
    <div className="list">
      { this.state.items.map((item, key)=> {
        return (<ShoppingListItem key={key} index={key} item={item} removeItem = {this.removeItem}/> );
        })
      }
    </div>
    </div>
    </div>
    );
  }


};


export default ShoppingList;
