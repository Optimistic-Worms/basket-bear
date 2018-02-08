import React from "react";
import axios from "axios";
import firebase from "./user/firebase-auth";
import SearchList from "./SearchList.jsx";
import { Link } from "react-router-dom";
import "../css/navigation.css";

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchMerchant: "all",
      ebaySearchItems: [],
      amazonSearchItems: [],
      queryString: "",
      searchItems: [],
      searchMessage: ""
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

  search() {
    if (this.state.queryString !== "") {
      this.setState({ searchMessage: "" });
      console.log(
        "searching " +
          this.state.searchMerchant +
          " for " +
          this.state.queryString
      );
      this.setState({ searchItems: [] });
      this.setState({ ebaySearchItems: [] });
      this.setState({ amazonSearchItems: [] });
      if (
        this.state.searchMerchant === "ebay" ||
        this.state.searchMerchant === "all"
      ) {
        this.searchEbay(this.state.queryString);
      }
      if (
        this.state.searchMerchant === "amazon" ||
        this.state.searchMerchant === "all"
      ) {
        this.searchAmazon(this.state.queryString);
      }
    }
  }

  searchEbay(keyword) {
    axios
      .get("/ebay/search", {
        params: {
          keyword: keyword
        }
      })
      .then(response => {
        window.scrollTo(0, 550);
        var items = response.data;
        this.setState({ ebaySearchItems: items });
        var combinedItems = items.concat(this.state.searchItems);
        this.sortItems(combinedItems);
        this.setState({ searchItems: combinedItems });
      })
      .catch(response => {
        this.setState({
          searchMessage: "Ebay returned no results for this query."
        });
        console.log("no items match this query");
      });
  }

  sortItems(array) {
    //console.log('sorting array: ', array);
    array.sort(function(a, b) {
      if (Number(a.price) < Number(b.price)) {
        return -1;
      }
      if (Number(a.price) > Number(b.price)) {
        return 1;
      }
      return 0;
    });
  }

  searchAmazon(keyword) {
    axios
      .get("/amazon/search", {
        params: {
          keyword: keyword
        }
      })
      .then(response => {
        window.scrollTo(0, 550);
        let searchResults = response.data.ItemSearchResponse.Items[0].Item;
        let items = this.parseAmazonResults(searchResults);
        this.setState({ amazonSearchItems: items });
        let combinedItems = items.concat(this.state.searchItems);
        this.sortItems(combinedItems);
        this.setState({ searchItems: combinedItems });
      });
  }

  parseAmazonResults(searchResults) {
    let items = [];

    for (var i = 0; i < searchResults.length; i++) {
      var product = {
        id: searchResults[i].ASIN[0],
        name: searchResults[i].ItemAttributes[0].Title[0],
        merchant: "amazon",
        link: searchResults[i].DetailPageURL[0]
      };

      if (searchResults[i].MediumImage) {
        product.imageUrl = searchResults[i].MediumImage[0].URL[0];
      }

      if (searchResults[i].Offers && searchResults[i].Offers[0].Offer) {
        let offer = searchResults[i].Offers[0].Offer[0].OfferListing[0];
        let price;

        if (offer.SalePrice) {
          price = offer.SalePrice[0].FormattedPrice[0].substring(1);
        } else if (offer.Price) {
          price = offer.Price[0].FormattedPrice[0].substring(1);
        }
        product.price = price;
        product.currentPrice = price;
        items.push(product);
      } else {
        //no offer on this product
      }
    }
    return items;
  }

  addToShoppingList(item, index) {
    var user = firebase.auth().currentUser;
    if (user) {
      firebase
        .auth()
        .currentUser.getIdToken(true)
        .then(idToken => {
          axios
            .put(`/shoppingList?access_token=${idToken}`, {
              product: item
            })
            .then(response => {
              var updateItems = this.state.searchItems;
              updateItems[index].added = true;
              this.setState({ searchItems: updateItems });
              item.added = true;
            });
        });
    } else {
      window.alert("Please log in to add an item to your shopping list!");
    }
  }

  formatPrice(string) {
    if (string) {
      return Number(string).toFixed(2);
    } else {
      return "";
    }
  }

  query(input) {
    this.setState({ queryString: input.target.value });
  }

  render() {
    return (
      <div>
        <nav>
          <div className="search">
            <li>
              <Link to="/">
                <span className="desktop-show brand">
                  <i className="fa fa-shopping-basket">&nbsp;&nbsp;</i>
                  Bear
                </span>
              </Link>
            </li>
            <input
              className="search-form"
              onKeyDown={e => {
                if (e.keyCode === 13) {
                  this.search();
                }
              }}
              placeholder="search for an item"
              onChange={input => this.query(input)}
              type="search"
            />
            <button
              className="search-button"
              onClick={() => {
                this.search();
              }}
            >
                <i className="fa fa-search" aria-hidden="true" />
            </button>
            <select
              className="search-selection"
              onChange={e => {
                this.setState({ searchItems: [] });
                this.setState({ ebaySearchItems: [] });
                this.setState({ amazonSearchItems: [] });
                this.setState({ searchMerchant: e.target.value });
              }}
            >
              <option value="all">All</option>
              <option value="ebay">Ebay</option>
              <option value="amazon">Amazon</option>
            </select>
          </div>
          <div className="menu">
            <li>
              <Link to="/">
                <span className="mobile-show col">
                  <i className="fa fa-home" aria-hidden="true" />
                  Home
                </span>
              </Link>
            </li>
            {this.props.logged === "LOGOUT" && (
              <li>
                <Link to="/watchList">
                  <span className="desktop-show">WATCH LIST</span>
                  <span className="mobile-show col">
                    <i className="fa fa-bookmark" aria-hidden="true" />WATCH
                    LIST
                  </span>
                </Link>
              </li>
            )}
            {this.props.logged === "LOGOUT" && (
              <li>
                <Link to="/settings">
                  <span className="desktop-show">Settings</span>
                  <span className="mobile-show col">
                    <i className="fa fa-cog" aria-hidden="true" />Settings
                  </span>
                </Link>
              </li>
            )}
            <li>
              <Link
                to={{ pathname: this.props.logout }}
                onClick={this.props.logging}
              >
                <span className="desktop-show">{this.props.logged}</span>
                <span className="mobile-show col">
                  <i className="fa fa-sign-out" aria-hidden="true" />
                  {this.props.logged}
                </span>
              </Link>
            </li>
          </div>
        </nav>
        <div id="results" className="results">
          <h4>{this.state.searchMessage}</h4>
          <SearchList
            items={this.state.searchItems}
            addItem={this.addToShoppingList}
            formatPrice={this.formatPrice}
          />
        </div>
      </div>
    );
  }
}
export default Search;
