const firebase = require('firebase');
const admin = require("firebase-admin");
const CryptoJS = require("crypto-js");

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

let cronAuth;

if(process.env.NODE_ENV !== 'test'){
    cronAuth = process.env.CRON_AUTH
}





module.exports = {
    isAuthenticated: (req, res, next) => {
      let idToken = req.query.access_token;
      if(idToken){
      admin.auth().verifyIdToken(idToken).then((decodedToken) => {
        req.username = decodedToken.uid;
        next();
      }).catch((error) => {
        console.log(error)
        req.username = null;
        res.sendStatus(401)
      });
      } else {
        res.send('not authorized')
      }
    },

    isCronAuthenticated: (req, res, next) => {
      let token = req.query.authsecret;
      if(token){
        // Encrypt
        // create new token
        //var ciphertext = CryptoJS.AES.encrypt('password', 'salt');
        //console.log(ciphertext.toString())
        // Decrypt
        let bytes  = CryptoJS.AES.decrypt(token, cronAuth);
        let plaintext = bytes.toString(CryptoJS.enc.Utf8);
        if(plaintext){
          next();
        } else {
          res.send('not authorized')
        }
      } else {
        res.send('not authorized')
      }
    }
}