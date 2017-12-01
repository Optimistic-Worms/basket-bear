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
    const { userLoginRequest } = this.props;
    return (
      <div className="loginCard">
        <h2 className="login-header">Login</h2>
        <ManualUser userLoginRequest={userLoginRequest} history={this.props.history}/>
        <GoogleUser />
      </div>
    );
  }
}

export default LoginCard;
