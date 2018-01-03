import React from 'react';
import { BrowserRouter, Route, Link, browserHistory } from 'react-router-dom';
import firebase from './user/firebase-auth';
import createHistory from 'history/createBrowserHistory';
import '../css/global.css';
import '../css/homepage.css';
import '../css/footer.css';
import Search from './Search.jsx';
import Navbar from './Navbar.jsx';
import LoginCard from './user/LoginCard.jsx';
import ShoppingList from './ShoppingList.jsx';
import JoinHomeTout from './JoinHomeTout.jsx';
import Developer from './developer/Developer.jsx';
import Home from './Home.jsx';
import Profile from './Profile.jsx';
import Footer from './Footer.jsx';
import Settings from './user/Settings.jsx';
import { logout } from './user/authHelpers.js';
import PriceLookup from './user/priceLookup.js';

class App extends React.Component {

  render() {
    return(
          <div>
            <Route exact path='/' component={Home}/>
            <Route path="/dev" component={Developer}/>
          </div>
      );
  }
}

export default App;
