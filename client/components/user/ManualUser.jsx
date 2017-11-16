import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase';


module.exports.getToken = (req, res) => {
  
  
}

class ManualUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      messages: 'No messages yet'
    };

    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleUsername(event) {
    this.setState({username: event.target.value});
  }

  handlePassword(event) {
    this.setState({password: event.target.value});
  }

  handleLogin(event) {
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password).then((value) => {
      console.log(value.uid)
    })
    .catch((error) => console.log('Opps. We are sorry to say: ' + error.message));
    
  }
  handleSignup(event) {
    event.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.username, this.state.password).then((value) => {
       this.setState({messages: 'A verification email has been sent to: ' + email})
      })
      .catch((error) => { 
        this.setState({messages:'Opps. We are sorry to say: ' + error.message});
      });
    
  }

  render() {
    return (
      <div>    
        <form >
          <div className="container">
            <label><b>Email</b></label>
            <input type="email" value={this.state.username} onChange={this.handleUsername} required/>
            <label><b>Password</b></label>
            <input type="password" autoComplete="new-password" value={this.state.password} onChange={this.handlePassword} required/>
            <button value="login" onClick={this.handleLogin}>Login</button>
            <button value="sign-up" onClick={this.handleSignup}>Sign-up</button>
          </div>
        </form>
        <div>{this.state.messages}</div>
      </div>
    )
  }
}
export default ManualUser