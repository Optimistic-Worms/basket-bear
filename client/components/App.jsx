import React from 'react';
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
import PriceLookup from './user/priceLookup.js';


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
  }

  componentDidMount() {
    this.checkLoginStatus();
    console.log(history.location)
  }

  checkLoginStatus(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({logged:'LOGOUT'});
        firebase.auth().currentUser.getIdToken(true).then((idToken) => {
          this.setState({isLoggedIn : true});
          console.log('Just logged in. Loading shopping list prices');
          console.log(idToken)
          PriceLookup.updateListPrices(idToken);
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
    if(this.state.logged === 'LOGOUT') {
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
