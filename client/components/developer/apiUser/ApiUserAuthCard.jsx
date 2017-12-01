import React from 'react';
import ApiUserLogin from './ApiUserLogin.jsx'

class ApiUserAuthCard extends React.Component {
  constructor() {
    super();
    this.state = {
      signup: false
    };
  }

  render() {
    return (
      <div className="loginCard">
        <h2 className="login-header">Login</h2>
        <ApiUserLogin/>
      </div>
    );
  }
}

export default ApiUserAuthCard;
