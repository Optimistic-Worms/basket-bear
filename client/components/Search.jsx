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

  componentDidMount() {

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
      //console.log(searchResults);
      var items = [];
      for (var i = 0 ; i < searchResults.length ; i++) {
        var product = {
          id: searchResults[i].ASIN[0],
          name: searchResults[i].ItemAttributes[0].Title[0],
          merchant: 'amazon',
          link: searchResults[i].DetailPageURL[0],
          added: false
        }
        if (searchResults[i].MediumImage) {
          product.imageUrl = searchResults[i].MediumImage[0].URL[0];
        }
        if (searchResults[i].ItemAttributes[0].ListPrice) {
          product.price = searchResults[i].ItemAttributes[0].ListPrice[0].FormattedPrice[0].substring(1);
        }
        items.push(product);
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
      if (response.data !== 'No existing shopping list. Create shopping list. Try adding item again') {
          var updateItems = this.state.searchItems;
          updateItems[index].added = true;
          this.setState({searchItems: updateItems});
          item.added = true;
        } else {
          window.alert('Hello new user! You dont have a shopping list started yet. Setting one up for you right now. Please try adding the item again');
        }
      })
    } else {
      window.alert('Please log in to add an item to your shopping list!');
      console.log('Cannot add to shopping list. You must log in first!');
    }
  }


  query(input) {
    this.setState({queryString : input.target.value});
  }


  render() {
    return (
      <div className="search-container">
      <div className="search">
        <button className="search-button" onClick={()=>{this.search()}}><i className="fa fa-search" aria-hidden="true"></i></button>
        <input onKeyDown={(e)=> {if (e.keyCode === 13) {this.search()}}} className="search-form" placeholder="search for an item" onChange= {(input) => this.query(input)} type="text"/>
        <select className="search-selection" onChange={(e)=> { this.setState({searchItems: []}); this.setState({ebaySearchItems: []}); this.setState({amazonSearchItems: []}); this.setState({searchMerchant: e.target.value})}}>
          <option value="all">All</option>
          <option value="ebay">Ebay</option>
          <option value="amazon">Amazon</option>
        </select>
      </div>
      <div className="results">
        <SearchList items={this.state.searchItems} addItem={this.addToShoppingList}/>
      </div>
      </div>
    )
  }
}
export default Search;
