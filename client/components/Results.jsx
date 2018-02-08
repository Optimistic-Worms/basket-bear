import React from "react";
import axios from "axios";
import firebase from "./user/firebase-auth";
import SearchList from "./SearchList.jsx";
import { Link, Redirect } from "react-router-dom";
import "../css/navigation.css";

class Results extends React.Component {
  constructor() {
    super();
    this.state = {
      searchMerchant: "all",
      ebaySearchItems: [],
      amazonSearchItems: [],
      queryString: "",
      searchItems: [],
      searchMessage: "",
      redirect: false
    };

    this.search = this.search.bind(this);
    this.searchEbay = this.searchEbay.bind(this);
    this.searchAmazon = this.searchAmazon.bind(this);
    this.query = this.query.bind(this);
    this.sortItems = this.sortItems.bind(this);
    this.addToShoppingList = this.addToShoppingList.bind(this);
    this.parseAmazonResults = this.parseAmazonResults.bind(this);
    this.formatPrice = this.formatPrice.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render(props) {
    return (
      <div id="results" className="results">
        <h4>{this.state.searchMessage}</h4>
        <SearchList
          items={this.state.searchItems}
          addItem={this.addToShoppingList}
          formatPrice={this.formatPrice}
        />
      </div>
    );
  }
}
export default Results;
