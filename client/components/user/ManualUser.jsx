import React from 'react';
import firebase from 'firebase';

class ManualUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      messages: '',
    };

    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleForgottenPassword = this.handleForgottenPassword.bind(this);
  }

  handleUsername(event) {
    this.setState({ username: event.target.value });
  }

  handlePassword(event) {
    this.setState({password: event.target.value});
  }

  handleForgottenPassword(event){
    let that = this
    var auth = firebase.auth();
    console.log(auth)
    var emailAddress = this.state.username;
    var actionCodeSettings = {
    url: "https:\//basketbear.com/login"
    };
    auth.sendPasswordResetEmail(emailAddress, actionCodeSettings).then(function() {
  // Email sent.
    that.setState({ messages: `Email Sent` })
    }).catch(function(error) {
  // An error happened.
    console.log(error)
    that.setState({ messages: error.message })
    })
  }

  handleLogin(event) {
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
      .then((value) => {
      //  console.log(value.uid);
      //  console.log(this.props.history)
        this.props.history.push('/');
      })
      .catch(error => this.setState({ messages: `ERROR: ${error.message}` }));
  }

  handleSignup(event) {
    event.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.username, this.state.password)
      .then((value) => {
        console.log(value);
        this.setState({ messages: `A verification email has been sent to: ${event.target.value.email}` });
      })
      .catch((error) => {
        this.setState({ messages: `ERROR: ${error.message}` });
      });
  }
  render() {
    return (
      <div>
      {this.state.messages && <div className="api-user-error">{this.state.messages}</div>}
      <form >
      <div className="manual-login">

            <div className="email-form">
            <label><b>Email</b></label>
            <input
              className="login-input"
              name="email"
              type="email"
              value={this.state.username}
              onChange={this.handleUsername}
              required />
            </div>
            <div className="password-form">
            <label htmlFor="password"><b>Password</b></label>
            <input className="login-input"
              type="password"
              autoComplete="new-password"
              value={this.state.password}
              onChange={this.handlePassword}
              required
             />
           </div>
           <div className="button-wrapper">
             <button className="button button-login button--homeout"onClick={ this.handleLogin }  >Login</button>
             {/* <button className="button button-signup button--homeout"onClick={ this.handleSignup } >Sign Up</button> */}
            </div>
          </div>
          <div className="toggle-login" onClick={this.props.toggleView}>
            <a>New to Basket Bear? Sign up for an account</a>
          </div>
          <div className="toggle-login" onClick={ this.handleForgottenPassword}>
            <a>Forgot password?</a>
          </div>
          </form>          
          </div>
    );
  }
}
export default ManualUser;
