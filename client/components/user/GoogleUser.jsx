import React from 'react';
import firebase from 'firebase';
import {logout, authenticate} from './authHelpers.js'



class GoogleUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  this.auth = this.auth.bind(this);
  this.logout = logout.bind(this);
  }


  auth(provider){
    this.props.history.push('/');
    authenticate(provider);
  } 
  render() {
    return (
      <div className="google-login button-wrapper">
        <button className="google-button button--homeout" onClick={this.auth.bind(this, 'google')}></button>
      </div>
    );
  }
}
export default GoogleUser;
