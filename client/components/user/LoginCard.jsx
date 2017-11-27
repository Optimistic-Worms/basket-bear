<<<<<<< HEAD
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

firebase.initializeApp(firebaseConfig);
=======
import React from 'react';
import axios from 'axios';
import firebase from './firebase-auth'
//import firebase from 'firebase';
import ManualUser from './ManualUser.jsx';
import GoogleUser from './GoogleUser.jsx';
import { getToken} from './authHelpers.js'
>>>>>>> e3b682dfee9d0ff3affe399675c532bed39949c7

class LoginCard extends React.Component {
  constructor() {
    super();
    this.state = {
    };
<<<<<<< HEAD
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
=======
    this.getToken = getToken.bind(this);
  }

>>>>>>> e3b682dfee9d0ff3affe399675c532bed39949c7
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
<<<<<<< HEAD

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
=======
>>>>>>> e3b682dfee9d0ff3affe399675c532bed39949c7
