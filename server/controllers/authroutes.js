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
    isAuthenticated: function (req, res, next) {
      let idToken = req.query.access_token;
      let user = admin.auth().verifyIdToken(idToken).then(function(decodedToken) {
      var uid = decodedToken.uid;
       return uid;
      }).catch(function(error) {
       return error
      });
      if (user !== null) {
        req.user = user;
        next();
      } else {
        res.redirect('/login');
      }
    }
}



