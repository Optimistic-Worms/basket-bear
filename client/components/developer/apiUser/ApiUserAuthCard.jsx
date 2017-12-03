import React from 'react';
import ApiUserLogin from './ApiUserLogin.jsx'
import ApiUserSignup from './ApiUserSignup.jsx'

class ApiUserAuthCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loginView: true,
      msg: ''
    };

    this.toggleLoginView = this.toggleLoginView.bind(this);
  }

  toggleLoginView(event, msg = '') {
    this.setState({loginView: !this.state.loginView, msg: msg})
  }

  render() {
    //console.log(this.props.toggleLogin)
    const { userLoginRequest, history} = this.props;
    return (
        <div className="loginCard">
        <h2 className="login-header">
          {this.state.loginView ? 'Login' : 'Signup'}
        </h2>
        {this.state.loginView ?
          <ApiUserLogin
            toggleView={this.toggleLoginView}
            toggleLogin={this.props.toggleLogin}
            msg={this.state.msg}
          />
          : <ApiUserSignup
              toggleView={this.toggleLoginView}
            />}
      </div>
    );
  }
}

export default ApiUserAuthCard;
