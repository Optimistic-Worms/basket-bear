import React from 'react'
import ReactDOM from 'react-dom'
import '../css/styles.css'
import axios from 'axios';
//import Product from './Product.jsx'
import SearchList from './SearchList.jsx'

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      ebaySearchItems : [],
      amazonSearchItems: [],
      queryString: ''
    };

    this.searchEbay = this.searchEbay.bind(this);
    this.query = this.query.bind(this);
  }

  componentDidMount() {
    this.searchEbay('Table');
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
      this.setState({ebaySearchItems: items});
    })
  }


  query(input) {
    this.setState({queryString : input.target.value});
  }

  render() {
    return (
      <div>
      <h1>Search Things</h1>
      <input placeholder="search for an item" onChange= {(input) => this.query(input)} type="text"/>
        <SearchList items={this.state.ebaySearchItems}/>
      </div>
    )
  }
}
export default Search