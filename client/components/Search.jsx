import React from 'react';
import axios from 'axios';
import '../css/styles.css';
import firebase from './user/firebase-auth';
import SearchList from './SearchList.jsx';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchMerchant: 'ebay',
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
    this.setState({searchItems: []});
    this.setState({ebaySearchItems: []});
    this.setState({amazonSearchItems: []});

    console.log("search merchant" , this.state.searchMerchant);
    console.log('query:', this.state.queryString);
    if (this.state.searchMerchant === 'ebay' || this.state.searchMerchant === 'all') {
      this.searchEbay(this.state.queryString);
    }
    if (this.state.searchMerchant === 'amazon' || this.state.searchMerchant === 'all') {
      this.searchAmazon(this.state.queryString);
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
          link: searchResults[i].DetailPageURL[0]
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

  addToShoppingList(item) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        axios.put('/shoppingList', {
          username: user.uid,
          product: item
        })
        .then((response) => {
          console.log(response.data);
        })
      } else {
        console.log('Cannot add to shopping list. You must log in first!');
      }
    });
  }


  query(input) {
    this.setState({queryString : input.target.value});
  }


  render() {
    return (
      <div>
        <div className="ebaySearch">
         <h3>Product Search</h3>
         <div className="search">
          <input className="search-form" placeholder="search for an item" onChange= {(input) => this.query(input)} type="text"/>
          <select onChange={(e)=> { this.setState({searchItems: []}); this.setState({ebaySearchItems: []}); this.setState({amazonSearchItems: []}); this.setState({searchMerchant: e.target.value})}}>
            <option value="ebay">Ebay</option>
            <option value="amazon">Amazon</option>
            <option value="all">All</option>
          </select>

          <button className="button" onClick={()=>{this.search()}}><i className="fa fa-search" aria-hidden="true"></i></button>

         </div>
        </div>
      <div>
        <SearchList items={this.state.searchItems} addItem={this.addToShoppingList}/>
      </div>
    </div>
    )
  }
}
export default Search;
