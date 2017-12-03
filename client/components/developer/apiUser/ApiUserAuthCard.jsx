import React from 'react';
import ApiUserLogin from './ApiUserLogin.jsx'
import ApiUserSignup from './ApiUserSignup.jsx'

class ApiUserAuthCard extends React.Component {
  constructor() {
    super();

    this.state = {
      login: true,
      msg: ''
    };

    this.toggleLogin = this.toggleLogin.bind(this);
  }

  toggleLogin(msg = '') {
    this.setState({login: !this.state.login, msg: msg})
  }

  render() {
    const { userLoginRequest, history} = this.props;
    return (
        <div className="loginCard">
        <h2 className="login-header">
          {this.state.login ? 'Login' : 'Signup'}
        </h2>
        {this.state.login ?
          <ApiUserLogin
            toggle={this.toggleLogin}
            msg={this.state.msg}
          />
          : <ApiUserSignup
              toggle={this.toggleLogin}
            />}
      </div>
    );
  }
}

export default ApiUserAuthCard;
