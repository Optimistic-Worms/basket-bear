<<<<<<< HEAD
import React from 'react';
import axios from 'axios';
import firebase from 'firebase';
import ManualUser from './ManualUser.jsx';
import GoogleUser from './GoogleUser.jsx';
import firebaseConfig from '../../../server/firebaseConfig.js';

=======
import React from 'react'
import ReactDOM from 'react-dom'
import ManualUser from './ManualUser.jsx'
import GoogleUser from './GoogleUser.jsx'
import firebase from 'firebase';
import firebaseConfig from '../../../server/firebaseConfig.js'
import axios from 'axios';
>>>>>>> ee65690... add google auth and manual auth to UI

// Initialize Firebase
// TODO: Replace with your project's customized code snippet

firebase.initializeApp(firebaseConfig.firebaseConfig);

class LoginCard extends React.Component {
  constructor() {
    super();
    this.state = {
    };
    this.getToken = this.getToken.bind(this);
  }
<<<<<<< HEAD
  getToken() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then((idToken) => {
        // Send token to your backend via HTTPS
          console.log(idToken);
          axios.get(`/thing?access_token= ${idToken}`).then((result) => {
            console.log(result);
          }).catch((error) => {
            console.log(error);
          });
        });
      } else {
        console.log('Nobody is home: Need to login or sign up!');
      }
    });
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

=======

  getToken(){
  	firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
     firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
    // Send token to your backend via HTTPS
    console.log(idToken);
    axios.get('/thing?access_token='+ idToken).then((result)=>{
    	console.log(result)
    }).catch((error)=>{
    	console.log(error)
    })
    }).catch(function(error) {console.log(error)});
    } else {
    console.log('Nobody is home: Need to login or sign up!')
    }
    });
  }

  render() {
    return (
      <div className="loginCard">        
        <ManualUser/ >
        <GoogleUser/ >
        <button onClick={this.getToken.bind()}> Get and send to token to server</button> 
      </div>
    )
  }
}
export default LoginCard
>>>>>>> ee65690... add google auth and manual auth to UI
