import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import firebase from './user/firebase-auth';
import '../css/styles.css';
import Search from './Search.jsx';
import Navbar from './Navbar.jsx';
import LoginCard from './user/LoginCard.jsx';
import ShoppingList from './ShoppingList.jsx';
import Developer from './developer/Developer.jsx';
import Home from './Home.jsx';
import Profile from './Profile.jsx';
import Footer from './Footer.jsx';
import { logout } from './user/authHelpers.js';



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      logged: 'LOGIN',
      logout: 'login',
      devView: false,
    };

    this.logging = this.logging.bind(this);
    this.logout = logout.bind(this);
    this.checkLoginStatus = this.checkLoginStatus.bind(this);
    this.loginSetup = this.loginSetup.bind(this);
  }

  checkLoginStatus(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          firebase.auth().currentUser.getIdToken(true).then((idToken) => {
            console.log(idToken);
            axios.get(`/thing?access_token= ${idToken}`).then((result) => {
              this.setState({logged:'LOGOUT'});
              console.log('Just logged in. Loading shopping list prices');
              this.loginSetup(user);
            }).catch((error) => {
              this.setState({logged:'LOGIN'});
              console.log(error);
            });
          });
        } else {
          console.log('Nobody is home: Need to login or sign up!');
        }
      });
  }

  componentDidMount() {
     this.checkLoginStatus();
  }

  //upon first logging in, check if user has a shopping list
  //get all update prices on shopping list
  loginSetup(user) {
    //get shopping list of user
    var list;
    axios.get('/shoppingList', {
      params: {
          username: user.uid,
      }
    })
    .then((response) => {
      list = response.data;
      console.log('Current Shopping List:', list);
      var amazonIds = [];
      var ebayIds = [];
      for (var item in list) {
        if (list[item].merchant === "amazon") {
          amazonIds.push(item);
        } else if (list[item].merchant ==="eBay") {
          ebayIds.push(item);
        }
      }
      axios.get('/lookupAmazon', {
        params: {
          itemIds : amazonIds
        }
      })
      .then((response) => {
        var lookupItems = response.data.ItemLookupResponse.Items[0].Item
        for (var i = 0; i < lookupItems.length; i++) {
          var itemId= lookupItems[i].ASIN;
          var price;
          if (lookupItems[i].Offers[0].Offer[0].OfferListing[0].SalePrice) {
            price = lookupItems[i].Offers[0].Offer[0].OfferListing[0].SalePrice[0].FormattedPrice[0].substring(1);
            list[itemId].currentPrice = price;
          } else if (lookupItems[i].Offers[0].Offer[0].OfferListing[0].Price) {
            price = lookupItems[i].Offers[0].Offer[0].OfferListing[0].Price[0].FormattedPrice[0].substring(1);
            list[itemId].currentPrice = price;
          }
        }

        axios.get('/lookupEbay', {
          params: {
            itemIds : ebayIds
          }
        })
        .then((response) => {
          var ebayLookupItems = response.data.Item;
          for (var i = 0 ; i < ebayLookupItems.length; i++) {
            var itemId = ebayLookupItems[i].ItemID;
            var price = ebayLookupItems[i].ConvertedCurrentPrice.Value;
            list[itemId].currentPrice = price;
          }
          console.log('Updated Shopping List:', list);
          //update prices in db
          axios.put('/updateShoppingList', {
            username : user.uid,
            list : list
          })
          .then((response) => {

          })
        })
        .catch((error) => {
          console.log('ebay lookup error', error);
        })

      })

    })
  }

  logging(e){
    if(this.state.logged === 'LOGOUT') {
      this.setState({logout : '/'})
      this.logout();
      this.setState({logged: 'LOGIN'})
    }
  }

  switchToDev() {
    this.setState({devView: true});
  }

  render() {
    return this.state.devView ? <Developer /> : (
      <div>
      <BrowserRouter>
        <div>
          <Navbar logged={this.state.logged} logging={this.logging} logout={this.state.logout}/>
            <Route exact path="/" component={Search}/>
            <Route path="/login" component={LoginCard}/>
            <Route path="/watchList" component={ShoppingList}/>
        </div>
      </BrowserRouter>
      <Footer handleSwitch={this.switchToDev.bind(this)}/>
    </div>
      );
  }
}

export default App;
