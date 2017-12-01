import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import firebase from './user/firebase-auth'

import '../css/styles.css';
import Search from './Search.jsx';
import Info from './Info.jsx';
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

    this.logging = this.logging.bind(this)
    this.logout = logout.bind(this)
    this.checkLoginStatus = this.checkLoginStatus.bind(this)
  }

  checkLoginStatus(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then((idToken) => {
          // Send token to your backend via HTTPS
            console.log(idToken);
            axios.get(`/thing?access_token= ${idToken}`).then((result) => {
              this.setState({logged:'LOGOUT'});
              console.log(result);
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

  logging(e){
    if(this.state.logged === 'LOGOUT') {
      this.setState({logout : '/'})
      this.logout();
      this.setStage({logged: 'LOGIN'})
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
            <Route exact path="/" component={Info}/>
            <Route exact path="/" component={Search}/>
            <Route path="/login" component={LoginCard}/>
            <Route path="/shoppingList" component={ShoppingList}/>
        </div>
      </BrowserRouter>
      <Footer handleSwitch={this.switchToDev.bind(this)}/>
      </div>
      );
  }
}

export default App;
