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

  componentDidMount() {
    let that = this
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    //console.log(user.uid);
    //console.log(user.displayName);
    that.props.history.push('/');
    } else {
    // No user is signed in.
    that.props.history.push('/login');
    console.log('Nobody is home: Need to login or sign up!');
    }
    });
  }
  auth(provider){
//    this.props.history.push('/');
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
