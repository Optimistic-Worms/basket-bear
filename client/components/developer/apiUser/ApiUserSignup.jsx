import React from 'react';
import axios from 'axios';

class ApiUserSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      appName: '',
      password1:'',
      password2:'',
      errorMsg: ''
    };
    this.handleSignup = this.handleSignup.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleSignup(event) {
    this.setState({errorMsg: ''})
    const {email, password1, password2} = this.state;

    if (email.length && password1.length && password2.length) {
      if (password1 !== password2) {
        event.preventDefault();
        this.setState({errorMsg: 'Passwords do not match'});
      } else {
        event.preventDefault();
        axios.post('/api/signup', {
          email: this.state.email,
          password: this.state.password1,
          appName: this.state.appName
        })
        .then((res) => {
           if (res.data.error) {
             this.setState({errorMsg: res.data.error})
           } else {
              this.props.setSecret(res.data.secret)
              this.props.toggleView(null, 'Thank you for signing up! Please log in to access your Developer Account');
           }
        })
         .catch(err => {
            console.log(err);
         });
      }
    }
  }

  handleInput(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    return (
       <div>
        {this.state.errorMsg && <div className="api-user-error">{this.state.errorMsg}</div>}
        <form>
          <div className="email-form">
            <label><b>Email</b></label>
            <input
              name="email"
              type="email"
              className="login-input"
              required
              value={this.state.email}
              onChange={this.handleInput}
            />
          </div>
          <div className="email-form">
            <label htmlFor="app-name"><b>Application Name</b></label>
            <input
              name="appName"
              type="text"
              className="login-input"
              required
              value={this.state.appName}
              onChange={this.handleInput}
            />
          </div>
          <div className="password-form">
            <label htmlFor="password"><b>Password</b></label>
            <input className="login-input"
              name="password1"
              type="password"
              autoComplete="new-password"
              required
              value={this.state.password}
              onChange={this.handleInput}
             />
          </div>
          <div className="password-form">
            <label htmlFor="password"><b>Confirm Password</b></label>
            <input className="login-input"
              name="password2"
              type="password"
              autoComplete="new-password"
              required
              value={this.state.password}
              onChange={this.handleInput}
             />
          </div>
          <div className="button-wrapper">
            <button
              className="button"
              onClick={this.handleSignup}
            >Signup
            </button>
          </div>
          <div className="toggle-login" onClick={this.props.toggleView}>
            <a>Already have a Developer Account? Login instead</a>
          </div>
        </form>
      </div>
    );
  }
}

export default ApiUserSignup;
