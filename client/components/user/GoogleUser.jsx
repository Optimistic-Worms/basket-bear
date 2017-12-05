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

  render() {
    return (
      <div className="google-login button-wrapper">
        <button className = "google-button" onClick={this.authenticate.bind(this, 'google')}> </button>
        {/* <button className="button" onClick={this.logout.bind()}> Logout</button> */}
      </div>

    );
  }
}
export default GoogleUser;
