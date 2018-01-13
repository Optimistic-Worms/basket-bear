import React from 'react';
import axios from 'axios';
import firebase from './firebase-auth'
import ManualUser from './ManualUser.jsx';
import GoogleUser from './GoogleUser.jsx';
import '../../css/signup-login.css'
import { getToken} from './authHelpers.js';

class LoginCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: true
    };

    this.getToken = getToken.bind(this);
  }

    componentWillMount() {
    let that = this
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    //console.log('Checked if there is a google user')
    that.props.history.push('/');
    } else {
    that.props.history.push('/login');
    that.setState({loggedIn:false})
    //console.log('Nobody is home: Need to login or sign up!');
    }
    });
  }

  render() {
    const { userLoginRequest } = this.props;
    if(this.state.loggedIn){
      return(<div>Logged in</div>)
    } else {
    return (
      <div className="login-card">
        <h2 className="login-header">Login/Sign Up</h2>
        <ManualUser errorMessage={this.state.errorMsg} userLoginRequest={userLoginRequest} history={this.props.history}/>
        <GoogleUser userLoginRequest={userLoginRequest} history={this.props.history} />
      </div>
    );
  }
  }
}

export default LoginCard;
