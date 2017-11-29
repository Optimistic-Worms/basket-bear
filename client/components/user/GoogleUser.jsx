import React from 'react';
import firebase from 'firebase';
import {logout, authenticate} from './authHelpers.js'

class GoogleUser extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  this.authenticate = authenticate.bind(this);
  this.logout = logout.bind(this);
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    console.log(user.uid);
    console.log(user.displayName);
    } else {
    // No user is signed in.
    console.log('Nobody is home: Need to login or sign up!');
    }
    });
  }

  render() {
    return (
      <div className="google-login button-wrapper">
        <button className = "google-button" onClick={this.authenticate.bind(this, 'google')}><img src="https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png"/> </button>
        {/* <button className="button" onClick={this.logout.bind()}> Logout</button> */}
      </div>

    );
  }
}
export default GoogleUser;
