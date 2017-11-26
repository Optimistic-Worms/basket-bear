import React from 'react';
import axios from 'axios';
import firebase from './firebase-auth'
//import firebase from 'firebase';
import ManualUser from './ManualUser.jsx';
import GoogleUser from './GoogleUser.jsx';
import { getToken} from './authHelpers.js'

class LoginCard extends React.Component {
  constructor() {
    super();
    this.state = {
    };
    this.getToken = getToken.bind(this);
  }

  render() {
    return (
      <div className="loginCard">
        <ManualUser />
        <GoogleUser />
        <button onClick={e => this.getToken(e)}>
        Get and send to token to server
        </button>
      </div>
    );
  }
}

export default LoginCard;
