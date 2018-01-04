import React from 'react';
import { BrowserRouter, Route, Link, browserHistory } from 'react-router-dom';
import firebase from './user/firebase-auth';
import Search from './Search.jsx';
import LoginCard from './user/LoginCard.jsx';
import Settings from './user/Settings.jsx';
import ShoppingList from './ShoppingList.jsx';
import Navbar from './Navbar.jsx';
import JoinHomeTout from './JoinHomeTout.jsx';
import Footer from './Footer.jsx';
import { logout } from './user/authHelpers.js';
import PriceLookup from './user/priceLookup.js';
import Developer from './developer/Developer.jsx';

class Home extends React.Component {
    constructor() {
    super();
    this.state = {
      logged: 'LOGIN',
      logout: 'login',
      isLoggedIn: false
    };
    this.logging = this.logging.bind(this);
    this.checkLoginStatus = this.checkLoginStatus.bind(this);
  }

  componentWillMount() {
    this.checkLoginStatus();
  }

  checkLoginStatus(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({isLoggedIn : true});
        this.setState({logged:'LOGOUT'});
        firebase.auth().currentUser.getIdToken(true).then((idToken) => {
          console.log('Just got auth token. Loading shopping list prices');
          //console.log(idToken)
          PriceLookup.updateListPrices(idToken);
          PriceLookup.updateListPrices(idToken, user);
        })
        .catch((error) => {
          this.setState({logged:'LOGIN'});
          console.log(error);
        });
      } else {
        this.setState({isLoggedIn : false});
        console.log('Nobody is home: Need to login or sign up!');
      }
    });
  }

  logging(e){
    if (this.state.logged === 'LOGOUT') {
       logout();
       this.setState({logged: 'LOGIN'})
    }
  }

  render() {
    return (
          <div>
              <Route path='/' render={(props) => {
                 return (
                <Navbar logged={this.state.logged} logging={this.logging} logout={this.state.logout}/>)
              }

              }/>

              <Route exact path="/" component={Search}/>
              <Route path="/login" component={LoginCard}/>
              <Route path="/settings" component={Settings}/>
              <Route path="/watchList" component={ShoppingList}/>

              {
                !this.state.isLoggedIn &&
                <Route exact path="/" component={JoinHomeTout}/>
              }
              <Route exact path='/' render={(props) => (
                <Footer history={props.history}/>
              )}/>
        </div>
  )
  }
}

export default Home;