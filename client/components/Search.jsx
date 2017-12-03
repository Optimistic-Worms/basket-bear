import React from 'react';
import axios from 'axios';
import '../css/styles.css';
import firebase from './user/firebase-auth';
import SearchList from './SearchList.jsx';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchMerchant: 'all',
      ebaySearchItems : [],
      amazonSearchItems: [],
      queryString: '',
      searchItems: []
    };

    this.search = this.search.bind(this);
    this.searchEbay = this.searchEbay.bind(this);
    this.searchAmazon = this.searchAmazon.bind(this);
    this.query = this.query.bind(this);
    this.sortItems = this.sortItems.bind(this);
    this.addToShoppingList = this.addToShoppingList.bind(this);
  }

  search() {
    if (this.state.queryString !== '') {
      console.log('searching '+ this.state.searchMerchant + ' for ' + this.state.queryString);
      this.setState({searchItems: []});
      this.setState({ebaySearchItems: []});
      this.setState({amazonSearchItems: []});
      if (this.state.searchMerchant === 'ebay' || this.state.searchMerchant === 'all') {
        this.searchEbay(this.state.queryString);
      }
      if (this.state.searchMerchant === 'amazon' || this.state.searchMerchant === 'all') {
        this.searchAmazon(this.state.queryString);
      }
    }

  }

  searchEbay(keyword) {
    axios.get('/searchEbay', {
      params: {
        keyword: keyword
      }
    })
    .then((response) => {
      var items = response.data;
      this.setState({ebaySearchItems: items});
      var combinedItems = items.concat(this.state.searchItems);
      this.sortItems(combinedItems);
      this.setState({searchItems: combinedItems});
    })
  }

  sortItems(array){
    //console.log('sorting array: ', array);
    array.sort(function(a,b) {
      if (Number(a.price) < Number(b.price)) {
        return -1;
      }
      if (Number(a.price) > Number(b.price)) {
        return 1;
      }
      return 0;
    })
  }

  searchAmazon(keyword) {
    axios.get('/searchAmazon', {
      params: {
        keyword: keyword
      }
    })
    .then((response) => {
      var searchResults = response.data.ItemSearchResponse.Items[0].Item;
      console.log('amazon search results',searchResults);
      var items = [];
      for (var i = 0 ; i < searchResults.length ; i++) {
        var product = {
          id: searchResults[i].ASIN[0],
          name: searchResults[i].ItemAttributes[0].Title[0],
          merchant: 'amazon',
          link: searchResults[i].DetailPageURL[0],
          //added: false

        }
        if (searchResults[i].MediumImage) {
          product.imageUrl = searchResults[i].MediumImage[0].URL[0];
        }
        if (searchResults[i].Offers && searchResults[i].Offers[0].Offer) {
          if (searchResults[i].Offers[0].Offer[0].OfferListing[0].SalePrice) {
            var price = searchResults[i].Offers[0].Offer[0].OfferListing[0].SalePrice[0].FormattedPrice[0].substring(1);
            product.addPrice = price;
            product.currentPrice = price;
          } else if (searchResults[i].Offers[0].Offer[0].OfferListing[0].Price) {
            var price = searchResults[i].Offers[0].Offer[0].OfferListing[0].Price[0].FormattedPrice[0].substring(1);
            product.price = price;
            product.currentPrice = price;
          }
          items.push(product);
        } else {
          //no offer on this product
        }
     }
      this.setState({amazonSearchItems: items});
      var combinedItems = items.concat(this.state.searchItems);
      this.sortItems(combinedItems);
      this.setState({searchItems: combinedItems});
    })
  }

  addToShoppingList(item, index) {
    var user = firebase.auth().currentUser;
    if (user) {
      axios.put('/shoppingList', {
        username: user.uid,
        product: item
    })
    .then((response) => {
      console.log(response.data);
      var updateItems = this.state.searchItems;
      updateItems[index].added = true;
      this.setState({searchItems: updateItems});
      item.added = true;
      })
    } else {
      window.alert('Please log in to add an item to your shopping list!');
    }
  }


  query(input) {
    this.setState({queryString : input.target.value});
  }


  render() {
    return (
      <div>
        <div className="intro-card">
          <h1>BUDGET BASKET</h1>
          <h4>FIND THE BEST PRICES FOR ITEMS YOU WANT</h4>
          <div className="search">
            <button className="search-button" onClick={()=>{this.search()}}><i className="fa fa-search" aria-hidden="true"></i></button>
            <input onKeyDown={(e)=> {if (e.keyCode === 13) {this.search()}}} className="search-form" placeholder="search for an item" onChange= {(input) => this.query(input)} type="text"/>
            <select className="search-selection" onChange={(e)=> { this.setState({searchItems: []}); this.setState({ebaySearchItems: []}); this.setState({amazonSearchItems: []}); this.setState({searchMerchant: e.target.value})}}>
              <option value="all">All</option>
              <option value="ebay">Ebay</option>
              <option value="amazon">Amazon</option>
            </select>
          </div>
        </div>
      <div className="results">
        <SearchList items={this.state.searchItems} addItem={this.addToShoppingList}/>
      </div>
      </div>
    )
  }
}
export default Search;
