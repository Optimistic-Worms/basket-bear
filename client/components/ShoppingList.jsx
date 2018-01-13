import React from 'react';
import axios from 'axios';
import ShoppingListItem from './ShoppingListItem.jsx';
import ProductSettings from './ProductSettings.jsx';
import firebase from './user/firebase-auth';
import PriceSelection from './PriceSelection.jsx';

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
    this.submitProductData = this.submitProductData.bind(this);
    this.addToWatchList = this.addToWatchList.bind(this);
    this.removeFromWatchList = this.removeFromWatchList.bind(this);
  }

  componentDidMount() {
    this.loadShoppingList();
    window.scrollTo(0,0);
  }


  sortItems(array){
    array.sort(function(a,b) {
      if (a.currentPrice === 'Item No Longer Available') {
        return 1;
      }
      if (Number(a.currentPrice) < Number(a.watchPrice)) {
      // both are below watch price
        if (Number(b.currentPrice) < Number(b.watchPrice)) {
          if (Number(a.currentPrice) < Number(b.currentPrice)) {
            return -1;
          }
          if (Number(a.currentPrice) > Number(b.currentPrice)) {
            return 1;
          }
          return 0;
        }
        //only a is below watch price
        return -1;
      }

      //only b is below watch price
      if (Number(b.currentPrice) < Number(b.watchPrice)) {
        return 1;
      }

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
            if (itemsObj[i].currentPrice === 'Item No Longer Available') {
              itemsObj[i].available = false;
            } else {
              itemsObj[i].available = true;
            }
            if (itemsObj[i].currentPrice < itemsObj[i].watchPrice) {
              itemsObj[i].alert = true;
            } else {
              itemsObj[i].alert = false;
            }
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
            this.removeFromWatchList(item, idToken);
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

  setWatchPrice(product, watchPrice) {
    firebase.auth().currentUser.getIdToken(true).then((idToken) => {
      axios.put(`/updateWatchPrice?access_token=${idToken}`, {
        productId: product.id,
        watchPrice: watchPrice,
      })
      .then((response) => {
        var itemsObj = response.data;
        var itemsArr = [];
        for (var i in itemsObj) {
          if (itemsObj[i].currentPrice === 'Item No Longer Available') {
            itemsObj[i].available = false;
          } else {
            itemsObj[i].available = true;
          }
          if (itemsObj[i].currentPrice < itemsObj[i].watchPrice) {
            itemsObj[i].alert = true;
          } else {
            itemsObj[i].alert = false;
          }
          itemsArr.push(itemsObj[i]);
        }
        this.sortItems(itemsArr);
        this.setState({items: itemsArr});
        this.addToWatchList(product, watchPrice, idToken);
        this.submitProductData(product, watchPrice, idToken);
      })
    })
  }

  openProductSettings(product) {
    this.setState({editProduct: product});
    this.setState({viewProductSettings: true});
  }

  saveProductSettings(product){
    this.setWatchPrice(product, this.state.inputString)
    this.setState({viewProductSettings: false});
  }

  addToWatchList(product, watchPrice, idToken) {
    const {name, merchant, id, currentPrice} = product;
    axios.post(`/watchedItems?access_token=${idToken}`, {
      name: name,
      id: id,
      merchant: merchant,
      targetPrice: watchPrice,
      currentPrice: currentPrice,
      available: true
    })
  }

  removeFromWatchList(product, idToken) {
    const {merchant, id} = product;
    axios.put(`/watchedItems?access_token=${idToken}`, {
      id: id,
      merchant: merchant
    })
  }

  submitProductData(product, watchPrice, idToken) {
    const {name, merchant, id, currentPrice} = product;
    axios.post(`/api/products?access_token=${idToken}`, {
      product: {
        name: name,
        id: id,
        merchant: merchant,
        targetPrice: watchPrice,
        currentPrice: currentPrice
      }
    })
    .then(data => {
      this.setState({editProduct: {}});
    })
    .catch(err => console.log(err));
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
          <div className="watch-list">
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
