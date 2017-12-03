import React from 'react';
import axios from 'axios';

class ApiUserSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password1:'',
      password2:'',
      errorMsg: ''
    };
    this.handleSignup = this.handleSignup.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword1 = this.handlePassword1.bind(this);
    this.handlePassword2 = this.handlePassword2.bind(this);
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
          password: this.state.password1
        })
        .then((res) => {
           console.log(res.data)
           this.props.toggle('Thank you for signing up! Please log in to access your Developer Account');
        })
         .catch(err => this.setState({errorMsg: err.response.data}));
      }
    }
  }

  handleEmail(event) {
    this.setState({email: event.target.value});
  }

  handlePassword1(event) {
    this.setState({password1: event.target.value});
  }

  handlePassword2(event) {
    this.setState({password2: event.target.value});
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
              onChange={this.handleEmail}
            />
          </div>
          <div className="password-form">
            <label htmlFor="password"><b>Password</b></label>
            <input className="login-input"
              type="password"
              autoComplete="new-password"
              required
              value={this.state.password}
              onChange={this.handlePassword1}
             />
          </div>
          <div className="password-form">
            <label htmlFor="password"><b>Confirm Password</b></label>
            <input className="login-input"
              type="password"
              autoComplete="new-password"
              required
              value={this.state.password}
              onChange={this.handlePassword2}
             />
          </div>
          <div className="button-wrapper">
            <button
              className="button"
              onClick={this.handleSignup}
            >Signup
            </button>
          </div>
          <div className="toggle-login" onClick={this.props.toggle}>
            <a>Already have a Developer Account? Login instead</a>
          </div>
        </form>
      </div>
    );
  }
}

export default ApiUserSignup;
