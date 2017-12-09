import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link, browserHistory } from 'react-router-dom';
import firebase from './user/firebase-auth';
import createHistory from 'history/createBrowserHistory'
import '../css/styles.css';
import Search from './Search.jsx';
import Navbar from './Navbar.jsx';
import LoginCard from './user/LoginCard.jsx';
import ShoppingList from './ShoppingList.jsx';
import JoinHomeTout from './JoinHomeTout.jsx';
import Developer from './developer/Developer.jsx';
import Home from './Home.jsx';
import Profile from './Profile.jsx';
import Footer from './Footer.jsx';
import { logout } from './user/authHelpers.js';


const history = createHistory()



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      logged: 'LOGIN',
      logout: 'login',
      devView: false,
      isLoggedIn: false
    };

    this.logging = this.logging.bind(this);
    this.logout = logout.bind(this);
    this.checkLoginStatus = this.checkLoginStatus.bind(this);
    this.loginSetup = this.loginSetup.bind(this);
    this.parseAmazonIds = this.parseAmazonIds.bind(this);
    this.parseEbayIds = this.parseEbayIds.bind(this);
  }

  checkLoginStatus(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({logged:'LOGOUT'});
          firebase.auth().currentUser.getIdToken(true).then((idToken) => {
            this.setState({isLoggedIn : true});
            console.log('Just logged in. Loading shopping list prices');
            this.loginSetup(user);
            }).catch((error) => {
              this.setState({logged:'LOGIN'});
              console.log(error);
            });
          } else {
            this.setState({isLoggedIn : false});
            console.log('Nobody is home: Need to login or sign up!');
        }
      });
  }
  componentDidMount() {
     this.checkLoginStatus();
      console.log(history.location)

  }

  parseAmazonIds(response, list){
    response.data.ItemLookupResponse.Items[0].Item.forEach((item)=>{
      let offer = item.Offers[0].Offer[0].OfferListing[0]
      if(offer.SalePrice) list[item.ASIN].currentPrice = offer.SalePrice[0].FormattedPrice[0].substring(1);
      if (offer.Price) list[item.ASIN].currentPrice = offer.Price[0].FormattedPrice[0].substring(1);
    })
    return list;
  }

  parseEbayIds(response, list){
    response.data.Item.forEach((item)=>{
      list[item.ItemID].currentPrice = item.ConvertedCurrentPrice.Value
    })
    return list
  }  


  
  //upon first logging in, check if user has a shopping list
  //get all update prices on shopping list
  loginSetup(user) {
    //get shopping list of user
    let list;
    let amazonIds = [];
    let ebayIds = [];
    //firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then((idToken) => {
    //console.log(idToken);
    //axios.get(`/shoppingList?access_token= ${idToken}`)    
    axios.get('/shoppingList', { params: { username: user.uid }})
    .then((response) => {
      list = response.data;
      console.log('Current Shopping List:', list);
      for (var item in list) {
        if (list[item].merchant === "amazon") amazonIds.push(item);
        if (list[item].merchant ==="eBay") ebayIds.push(item);
      }
      axios.get('/lookupAmazon', { params: { itemIds : amazonIds }})
      .then((response) => {
        list = this.parseAmazonIds(response, list);

        axios.get('/lookupEbay', { params: { itemIds : ebayIds }})
        .then((response) => {
          list = this.parseEbayIds(response, list)
          console.log('Updated Shopping List:', list);
          //update prices in db
            axios.put('/updateShoppingList', { username : user.uid, list : list})
            .then((response) => {})
            })
            .catch((error) => {
              console.log('ebay lookup error', error);
            })
      })
    })

 //  }) // End Token get


  }
  logging(e){
    if(this.state.logged === 'LOGOUT') {
      //this.setState({logout : '/'})
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
            {
              !this.state.isLoggedIn &&
              <Route exact path="/" component={JoinHomeTout}/>
            }
        </div>
      </BrowserRouter>
      <Footer handleSwitch={this.switchToDev.bind(this)}/>
    </div>
      );
  }
}

export default App;
