import React from 'react';
import { BrowserRouter, Route, Link, browserHistory } from 'react-router-dom';
import firebase from './user/firebase-auth';
import Search from './Search.jsx';
import LoginCard from './user/LoginCard.jsx';
import Settings from './user/Settings.jsx';
import ShoppingList from './ShoppingList.jsx';
import TermsAndConditions from './TermsAndConditions.jsx';
import About from './About.jsx'
import ClientIntro from './ClientIntro.jsx'
import SignUp from './SignUp.jsx'
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

  componentDidMount() {
    window.scrollTo(0,0);
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
          PriceLookup.updateListPrices(idToken);
        })
        .catch((error) => {
          this.setState({logged:'LOGIN'});
          //console.error(error);
        });
      } else {
        this.setState({isLoggedIn : false});
        //console.log('Nobody is home: Need to login or sign up!');
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
        <Route path= '/' render={(props) => {
          return (
            <Search logged={this.state.logged} logging={this.logging} logout={this.state.logout}/>
            )
          }
        }/>
        <Route exact path="/" component={ClientIntro}/>
        <Route path="/login" component={LoginCard}/>
        <Route path="/settings" component={Settings}/>
        <Route path="/about" component={About}/>
        <Route path="/watchList" component={ShoppingList}/>
        <Route path="/terms" component={TermsAndConditions}/>
        {
          !this.state.isLoggedIn &&
          <Route exact path="/" component={SignUp}/>
        }
        <Route exact path='/' render={(props) => (
          <Footer history={props.history}/>
        )}/>
      </div>
    )
  }
}

export default Home;
