import React from 'react';
import axios from 'axios';
import '../css/styles.css';

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
  }

  componentDidMount() {

  }

  search(keyword) {
    console.log("search merchant" , this.state.searchMerchant);
    console.log('query:', this.state.queryString);
    if (this.state.searchMerchant === 'ebay') {
      this.searchEbay(this.state.queryString);
    } else if (this.state.searchMerchant === 'amazon') {
      this.searchAmazon(this.state.queryString);
    } else if (this.state.searchMerchant === 'all') {

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
      console.log(items);
      this.setState({searchItems: items});
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
      console.log(searchResults);
      var items = [];
      for (var i = 0 ; i < searchResults.length ; i++) {
        var product = {
          id: searchResults[i].ASIN[0],
          name: searchResults[i].ItemAttributes[0].Title[0],
          imageUrl: searchResults[i].MediumImage[0].URL[0],
          merchant: 'amazon',
          price: searchResults[i].ItemAttributes[0].ListPrice[0].FormattedPrice[0],
          link: searchResults[i].DetailPageURL[0]
        }
        items.push(product);
     }
      this.setState({searchItems: items});
    })
  }


  query(input) {
    this.setState({queryString : input.target.value});
  }

  render() {
    return (
      <div>
        <div className="ebaySearch">
         <h3>Search Ebay</h3>
         <div className="search">
          <input className="search-form" placeholder="search for an item" onChange= {(input) => this.query(input)} type="text"/>
          <select onChange={(e)=> { this.setState({searchItems: []}); this.setState({searchMerchant: e.target.value})}}>
            <option value="ebay">Ebay</option>
            <option value="amazon">Amazon</option>
            <option value="all">All</option>
          </select>

          <button className="button" onClick={()=>{this.search()}}><i className="fa fa-search" aria-hidden="true"></i></button>

         </div>
        </div>
      <div>
        <SearchList items={this.state.searchItems}/>
      </div>
    </div>
    )
  }
}
export default Search;
