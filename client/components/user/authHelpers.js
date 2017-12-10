const firebase = require('firebase');
const axios = require('axios');

exports.getToken = () => {
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

exports.logout = () => {
    firebase.auth().signOut().then(() => {
      console.log('just logged out');
    }, function(error) {
      console.log('couldn\'log out:' + error);
    })
}

exports.authenticate = (authProvider) => {
    let provider;
    if (authProvider ==='google'){
      provider = new firebase.auth.GoogleAuthProvider();
    } 
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithRedirect(provider).then((result) =>{
    // var token = result.credential.accessToken;
    var user = result.user.uid;
    console.log(user);
    }).catch((error) =>{
    var errorMessage = error.message;
    // var credential = error.credential;
    console.log(errorMessage);
    });
  }

 