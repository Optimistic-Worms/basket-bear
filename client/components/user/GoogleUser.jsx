<<<<<<< HEAD
import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'


=======
import React from 'react';
import firebase from 'firebase';
import {logout, authenticate} from './authHelpers.js'
>>>>>>> e3b682dfee9d0ff3affe399675c532bed39949c7

class GoogleUser extends React.Component {
  constructor() {
    super();
    this.state = {

    };
<<<<<<< HEAD
  this.authenticate = this.authenticate.bind(this)  
  this.logout = this.logout.bind(this)  
  }

  authenticate(provider) {
    console.log(provider)
    provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider).then(function(result){
    // var token = result.credential.accessToken;
    var user = result.user.uid;
    console.log(user)
    }).catch(function(error){
    var errorMessage = error.message;
    // var credential = error.credential;
    console.log(errorMessage)
    })
  }

  logout(){
    firebase.auth().signOut().then(function() {
    console.log('just logged out');
   }, function(error) {
    console.log('couldn\'log out:' + error);
  });
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    // User is signed in.
    console.log(user.uid)
    console.log(user.displayName)
    } else {
    // No user is signed in.
    console.log('Nobody is home: Need to login or sign up!')
=======
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
>>>>>>> e3b682dfee9d0ff3affe399675c532bed39949c7
    }
    });
  }
  
  render() {
    return (
      <div>
        <button onClick={this.authenticate.bind(this, 'google')}> Google Login</button>       
        <button onClick={this.logout.bind()}> Logout</button>       
      </div>
<<<<<<< HEAD
    )
  }
}
export default GoogleUser
=======

    );
  }
}
export default GoogleUser;
>>>>>>> e3b682dfee9d0ff3affe399675c532bed39949c7
