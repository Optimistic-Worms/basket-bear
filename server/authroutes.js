const firebase = require('firebase');
const bodyParser = require('body-parser');
//import * as firebase from "firebase";

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
  apiKey: "AIzaSyBdYk7C2_wXicy4w42ek-zR8f2KWLK2is4",
  authDomain: "budget-basket-58dd4.firebaseapp.com",
  databaseURL: "https://budget-basket-58dd4.firebaseio.com",
  projectId: "budget-basket-58dd4",
  storageBucket: "budget-basket-58dd4.appspot.com",
  messagingSenderId: "238930888910"
};
firebase.initializeApp(config);

const createUser = (email, password, callback) => {

  firebase.auth().createUserWithEmailAndPassword(email, password).then((value) => {
  	return callback('A verification email has been sent to: ' + email)
  }).catch( error => callback('Opps. We are sorry to say: ' + error.message));
};

module.exports.signup = (req, res, next) => {
 	createUser(req.headers.username, req.headers.password, (result) =>{
   	res.send(result);
 	});
} 

const signinManualUser = (email, password, callback)=>{
  
  firebase.auth().signInWithEmailAndPassword(email, password).then((value) => {
  	return callback(value)
  }).catch( error => callback('Opps. We are sorry to say: ' + error.message));
}

module.exports.manualSignIn = (req, res, next) => {
 	signinManualUser(req.headers.username, req.headers.password, (result) =>{
   	res.send(result);
 	});
} 

module.exports.manualLogout = (req, res) =>{
	firebase.auth().signOut().then(function() {
  res.send('Sign-out successful.')
	}, function(error) {
  res.send(error)
	});
}

module.exports.isAuthenticated = (req, res, next) => {
  let user = firebase.auth().currentUser;
  console.log(user)
      if (user !== null) {
      req.user = user;
      next();
      } else {
      res.send('not logged in');
      }
    }
  


