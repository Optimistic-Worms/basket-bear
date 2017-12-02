import React from 'react';
import ApiUserLogin from './ApiUserLogin.jsx'
import ApiUserSignup from './ApiUserSignup.jsx'

class ApiUserAuthCard extends React.Component {
  constructor() {
    super();

    this.state = {
      login: true
    };

    this.toggleLogin = this.toggleLogin.bind(this);
  }

  toggleLogin() {
    this.setState({login: !this.state.login})
  }

  render() {
    return (
        <div className="loginCard">
        <h2 className="login-header">
          {this.state.login ? 'Login' : 'Signup'}
        </h2>
        {this.state.login ?
          <ApiUserLogin toggle={this.toggleLogin}/>
          : <ApiUserSignup toggle={this.toggleLogin}/>}
      </div>
    );
  }
}

export default ApiUserAuthCard;
