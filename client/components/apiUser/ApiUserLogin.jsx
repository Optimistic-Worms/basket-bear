import React from 'react';

class ApiUserLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
  }

  componentDidMount() {
  }

  handleUsername(event) {
    this.setState({ username: event.target.value });
  }

  handlePassword(event) {
    this.setState({password: event.target.value});
  }

  handleLogin() {

  }

  handleSignup() {

  }

  render() {
    return (
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
              onChange={this.handlePassword}
              required
             />
             <button onClick={ this.handleLogin }  >Login</button>
             <button onClick={ this.handleSignup } >Sign Up</button>
            </div>
          </form>
      </div>
    );
  }
}
export default ApiUserLogin;
