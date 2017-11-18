const firebase = require('firebase');
const admin = require("firebase-admin");


// Initialize Firebase
if (process.env.NODE_ENV !== 'test') {
  const firebaseConfig = JSON.parse(process.env.FIREBASE_AUTH);
  firebase.initializeApp(firebaseConfig);
};


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



