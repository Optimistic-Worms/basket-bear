import React from 'react';
import ApiUserLogin from './ApiUserLogin.jsx'
import ApiUserSignup from './ApiUserSignup.jsx'
import '../../../css/signup-login.css'

class ApiUserAuthCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loginView: true,
      msg: ''
    };

    this.toggleLoginView = this.toggleLoginView.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0,0);
  }

  toggleLoginView(event, msg = '') {
    this.setState({loginView: !this.state.loginView, msg: msg})
  }

  render() {
    return (
        <div className="login-card">
        <h2 className="login-header">
          {this.state.loginView ? 'Login' : 'Signup'}
        </h2>
        {this.state.loginView ?
          <ApiUserLogin
            toggleView={this.toggleLoginView}
            toggleLogin={this.props.toggleLogin}
            msg={this.state.msg}
            history={this.props.history}
          />
          : <ApiUserSignup
              toggleView={this.toggleLoginView}
            />}
      </div>
    );
  }
}

export default ApiUserAuthCard;
