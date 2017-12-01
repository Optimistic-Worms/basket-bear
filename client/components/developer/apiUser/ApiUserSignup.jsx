import React from 'react';
import axios from 'axios';

class ApiUserSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password:''
    };
    this.handleSignup = this.handleSignup.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleSignup(event) {
    event.preventDefault();
    axios.post('/api/signup', {
      email: this.state.email,
      password: this.state.password
    })
    .then((res) => {
      console.log(res.data)
    })
  }

  handleEmail(event) {
    this.setState({email: event.target.value});
  }

  handlePassword(event) {
    this.setState({password: event.target.value});
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
              onChange={this.handlePassword}
             />
          </div>
          <div className="password-form">
            <label htmlFor="password"><b>Confirm Password</b></label>
            <input className="login-input"
              type="password"
              autoComplete="new-password"
              required
              value={this.state.password}
              onChange={this.handlePassword}
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
