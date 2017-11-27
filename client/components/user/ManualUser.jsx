<<<<<<< HEAD
<<<<<<< HEAD
import React from 'react';
import firebase from 'firebase';

=======
import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase';


module.exports.getToken = (req, res) => {
  
  
}

>>>>>>> ee65690... add google auth and manual auth to UI
=======
import React from 'react';
import firebase from 'firebase';

>>>>>>> e3b682dfee9d0ff3affe399675c532bed39949c7
class ManualUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
<<<<<<< HEAD
<<<<<<< HEAD
      messages: 'No messages yet',
=======
      messages: 'No messages yet'
>>>>>>> ee65690... add google auth and manual auth to UI
=======
      messages: 'No messages yet',
>>>>>>> e3b682dfee9d0ff3affe399675c532bed39949c7
    };

    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleUsername(event) {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> e3b682dfee9d0ff3affe399675c532bed39949c7
    this.setState({ username: event.target.value });
  }

  handlePassword(event) {
<<<<<<< HEAD
    this.setState({ password: event.target.value });
=======
    this.setState({username: event.target.value});
  }

  handlePassword(event) {
    this.setState({password: event.target.value});
>>>>>>> ee65690... add google auth and manual auth to UI
=======
    this.setState({password: event.target.value});
>>>>>>> e3b682dfee9d0ff3affe399675c532bed39949c7
  }

  handleLogin(event) {
    event.preventDefault();
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> e3b682dfee9d0ff3affe399675c532bed39949c7
    firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
      .then((value) => {
        console.log(value.uid);
      })
      .catch(error => console.log(`Opps. We are sorry to say: ${error.message}`));
  }
<<<<<<< HEAD
=======

>>>>>>> e3b682dfee9d0ff3affe399675c532bed39949c7
  handleSignup(event) {
    event.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.username, this.state.password)
      .then((value) => {
        console.log(value);
        this.setState({ messages: `A verification email has been sent to: ${event.target.value.email}` });
      })
      .catch((error) => {
        this.setState({ messages: `Opps. We are sorry to say: ${error.message}` });
      });
<<<<<<< HEAD
=======
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
    
>>>>>>> ee65690... add google auth and manual auth to UI
  }

  render() {
    return (
<<<<<<< HEAD
=======
  }
  render() {
    return (
>>>>>>> e3b682dfee9d0ff3affe399675c532bed39949c7
      <div>
        <form >
          <div className="container">
            <label><b>Email</b></label>
            <input
              name="email"
              type="email"
              value={this.state.username}
              onChange={this.handleUsername}
              required />
            <label htmlFor="password"><b>Password</b></label>
            <input
              type="password"
              autoComplete="new-password"
              value={this.state.password}
<<<<<<< HEAD
<<<<<<< HEAD
              onChange={this.handlePassword}
              required
            />
=======
      <div>    
        <form >
          <div className="container">
            <label><b>Email</b></label>
            <input type="email" value={this.state.username} onChange={this.handleUsername} required/>
            <label><b>Password</b></label>
            <input type="password" autoComplete="new-password" value={this.state.password} onChange={this.handlePassword} required/>
>>>>>>> ee65690... add google auth and manual auth to UI
            <button value="login" onClick={this.handleLogin}>Login</button>
            <button value="sign-up" onClick={this.handleSignup}>Sign-up</button>
          </div>
        </form>
        <div>{this.state.messages}</div>
      </div>
<<<<<<< HEAD
=======
=======
>>>>>>> e3b682dfee9d0ff3affe399675c532bed39949c7
              onChange={this.handlePassword} 
              required 
             />
             <button onClick={ this.handleLogin }  >Login</button>
             <button onClick={ this.handleSignup } >Sign Up</button>
            </div>
          </form> 
        </div>
<<<<<<< HEAD
>>>>>>> 4908070... add branch fixes
=======
>>>>>>> e3b682dfee9d0ff3affe399675c532bed39949c7
    );
  }
}
export default ManualUser;
<<<<<<< HEAD
=======
    )
  }
}
export default ManualUser
>>>>>>> ee65690... add google auth and manual auth to UI
=======
>>>>>>> e3b682dfee9d0ff3affe399675c532bed39949c7
