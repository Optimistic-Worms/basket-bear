import React from 'react';
import axios from 'axios';
import firebase from 'firebase';
import ManualUser from './ManualUser.jsx';
import GoogleUser from './GoogleUser.jsx';

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
let firebaseConfig = {
  apiKey: "AIzaSyAR2V9PUTzmZxj0u-0FvnQqlg06VRlnHSc",
  authDomain: "bbasket-9e24a.firebaseapp.com",
  databaseURL: "https:\//bbasket-9e24a.firebaseio.com",
  projectId: "bbasket-9e24a",
  storageBucket: "bbasket-9e24a.appspot.com",
  messagingSenderId: "872393919907"
};




firebase.initializeApp(firebaseConfig.firebaseConfig);

class LoginCard extends React.Component {
  constructor() {
    super();
    this.state = {
    };
    this.getToken = this.getToken.bind(this);
  }
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
