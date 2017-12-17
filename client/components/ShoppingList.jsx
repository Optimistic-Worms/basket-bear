import React from 'react';
import axios from 'axios';
import ShoppingListItem from './ShoppingListItem.jsx';
import ProductSettings from './ProductSettings.jsx';
import firebase from './user/firebase-auth';

class ShoppingList extends React.Component {
  constructor() {
    super();
    this.state = {
      items : [],
      alert : null,
      viewProductSettings: false,
      editProduct: {},
      inputString: ''
    };
    this.loadShoppingList = this.loadShoppingList.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.setWatchPrice = this.setWatchPrice.bind(this);
    this.openProductSettings = this.openProductSettings.bind(this);
    this.saveProductSettings = this.saveProductSettings.bind(this);
    this.updateInputString = this.updateInputString.bind(this);
    this.sortItems = this.sortItems.bind(this);
  }

  componentDidMount() {
    this.loadShoppingList();
  }

  sortItems(array){
    array.sort(function(a,b) {
      if (Number(a.currentPrice) < Number(b.currentPrice)) {
        return -1;
      }
      if (Number(a.currentPrice) > Number(b.currentPrice)) {
        return 1;
      }
      return 0;
    })
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
            this.sortItems(itemsArr);
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
            this.sortItems(itemsArr);
            this.setState({items: itemsArr});
          })
        })
      } else {
        console.log('Cant get shopping list. Must Log in');
      }
    });
  }

  updateInputString(input){
    this.setState({inputString : input.target.value});
  }

  setWatchPrice(productId, watchPrice) {
    firebase.auth().currentUser.getIdToken(true).then((idToken) => {
      axios.put(`/updateWatchPrice?access_token=${idToken}`, {
        productId: productId,
        watchPrice: watchPrice
      })
      .then((response) => {
        var itemsObj = response.data;
        var itemsArr = [];
        for (var i in itemsObj) {
          itemsArr.push(itemsObj[i]);
        }
        this.sortItems(itemsArr);
        this.setState({items: itemsArr});
      })
    })
  }

  openProductSettings(product) {
    this.setState({editProduct: product});
    this.setState({viewProductSettings: true});
  }

  saveProductSettings(product){
    this.setWatchPrice(product.id, this.state.inputString)
    this.setState({viewProductSettings: false});
    this.setState({editProduct: {}});
  }

  render () {
    return (
      <div className="watch-container">
        <h1>Your Watch List</h1>
        {this.state.alert && <h4>{this.state.alert}</h4>}
        <div className="results">
        { this.state.viewProductSettings && <ProductSettings saveProductSettings={this.saveProductSettings} item={this.state.editProduct} updateInputString={this.updateInputString}/>
        }

        { !this.state.viewProductSettings &&
          <div className="list">
            { this.state.items.map((item, key)=> {
                return (<ShoppingListItem key={key} index={key} item={item} openProductSettings={this.openProductSettings} removeItem = {this.removeItem}/> );
                })
            }
          </div>
        }

        </div>
      </div>
    );
  }


};


export default ShoppingList;
