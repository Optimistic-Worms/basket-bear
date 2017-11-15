import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'
import firebaseConfig from '../../server/firebaseConfig.js'


firebase.initializeApp(firebaseConfig.firebaseConfig)


class Login extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  this.authenticate = this.authenticate.bind(this)  
  this.logout = this.logout.bind(this)  
  }

  authenticate(provider) {
    console.log(provider)
    provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider).then(function(result){
    var token = result.credential.accessToken;
    var user = result.user;
    console.log('user')
    console.log(token)
    }).catch(function(error){
    var errorMessage = error.message;
    var credential = error.credential;
    console.log('error')
    console.log(error)
    })
  }

  logout(){
    firebase.auth().signOut().then(function() {
  // Sign-out successful.
   }, function(error) {
  // An error happened.
  });
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log(user.uid)
    console.log(user.displayName)
  } else {
    // No user is signed in.
    console.log('nobody here')
  }
});
  }
  
  render() {
    return (
      <div>
        <button onClick={this.authenticate.bind(this, 'google')}> Google Login</button>       
        <button onClick={this.logout.bind()}> Logout</button>       
        <h1>Login</h1>
      </div>
    )
  }
}
export default Login