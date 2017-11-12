const firebase = require('firebase');
const bodyParser = require('body-parser');
const firebaseConfig = JSON.parse(process.env.FIREBASE_AUTH);

// Initialize Firebase
// TODO: Replace with your project's customized code snippet

firebase.initializeApp(firebaseConfig);

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



