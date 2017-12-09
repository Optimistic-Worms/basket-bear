const firebase = require('firebase');
const admin = require("firebase-admin");


// Initialize Firebase
var config = {
    apiKey: "AIzaSyAR2V9PUTzmZxj0u-0FvnQqlg06VRlnHSc",
    authDomain: "bbasket-9e24a.firebaseapp.com",
    databaseURL: "https://bbasket-9e24a.firebaseio.com",
    projectId: "bbasket-9e24a",
    storageBucket: "bbasket-9e24a.appspot.com",
    messagingSenderId: "872393919907"
  };
firebase.initializeApp(config);

module.exports = {
    isAuthenticated: (req, res, next) => {
      let idToken = req.query.access_token;
      admin.auth().verifyIdToken(idToken).then((decodedToken) => {
      req.username = decodedToken.uid;
       next();
      }).catch((error) => {
       console.log(error) 
       req.username = null;
      });
    }
}



