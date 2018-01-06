import React from 'react';
import axios from 'axios';

class ApiUserLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMsg: '',
      successMsg: this.props.msg
    };
    this.handleLogin= this.handleLogin.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleLogin(event) {
    this.setState({errorMsg: ''});
    if (this.state.email.length && this.state.password.length) {
      event.preventDefault();
      axios.post('/api/usertoken', {'grant_type': 'client_credentials'},
        {
          withCredentials: true,
          auth: {
            username: this.state.email,
            password: this.state.password,
        }
      })
      .then((res) => {
        this.props.toggleLogin(this.state.email, res.data.access_token);
        this.props.history.push('/dev/account')
      })
      .catch(err => {
        this.setState({errorMsg: err.response.data});
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.errorMsg && <div className="api-user-error">{this.state.errorMsg}</div>}
        {this.state.successMsg && <div className="api-user-success">{this.state.successMsg}</div>}
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
          <div className="password-form">
            <label htmlFor="password"><b>Password</b></label>
            <input className="login-input"
              name="password"
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
              onClick={this.handleLogin}
            >Login
            </button>
          </div>
          <div className="toggle-login" onClick={this.props.toggleView}>
            <a>Or Sign up for a Developer Account</a>
          </div>
        </form>
      </div>
    );
  }
}

export default ApiUserLogin;
