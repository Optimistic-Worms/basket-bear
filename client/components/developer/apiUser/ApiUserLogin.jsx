import React from 'react';
import axios from 'axios';

class ApiUserLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMsg: ''
    };
    this.handleLogin= this.handleLogin.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleEmail(event) {
    this.setState({email: event.target.value});
  }

  handlePassword(event) {
    this.setState({password: event.target.value});
  }

  handleLogin(event) {
    this.setState({errorMsg: ''});
    if (this.state.email.length  && this.state.password.length) {
      event.preventDefault();
      axios.post('/api/login', {'grant_type': 'client_credentials'},
        {
          withCredentials: true,
          auth: {
            username: this.state.email,
            password: this.state.password,
        }
      })
      .then((res) => {
        if (res.data)
        console.log(res.data)
      })
      .catch(err => {
        this.setState({errorMsg: err.response.data})
      });
    }
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
          <div className="button-wrapper">
            <button
              className="button"
              onClick={this.handleLogin}
            >Login
            </button>
          </div>
          <div className="toggle-login" onClick={this.props.toggle}>
            <a>Or Sign up for a Developer Account</a>
          </div>
        </form>
      </div>
    );
  }
}

export default ApiUserLogin;