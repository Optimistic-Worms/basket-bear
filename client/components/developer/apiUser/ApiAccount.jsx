import React from 'react';
import ClientSecret from './ClientSecret.jsx';

class ApiAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userObj: false,
      resetting: false
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.toggleResetting = this.toggleResetting.bind(this);
  }

  componentWillMount() {
    this.props.getUserData()
    .then(data => {
      this.setState({userObj: data})
    })
      window.scrollTo(0,0);
  }

  handleLogout() {
    this.props.toggleLogin();
    this.props.history.push('/dev');
    this.props.setSecret('');
  }

  toggleResetting() {
    this.setState({resetting: !this.state.resetting});
  }

  render() {

    return (

      <div className="settings-card">
          <div className="settings-header">
            <div>{this.state.userObj.email}</div>
            <div className="button button--remove" onClick={this.handleLogout}>Logout</div>
          </div>
          {this.state.userObj ?
            <div className="settings-layout">
              <h3>Application Name</h3>
              <div>{this.state.userObj.appName}</div>
              <h3>Client ID</h3>
              <div>{this.state.userObj.clientId}</div>
              <h3>Client Secret</h3>
              {this.state.resetting ? <div>Resetting Secret...</div> :
                <ClientSecret
                secret={this.props.secret}
                setSecret={this.props.setSecret}
                user={this.state.userObj}
                token={this.props.token}
                toggleView={this.toggleResetting}
              />
              }
            </div> :
            <div className="settings-layout">
              <h3>Retrieving Developer Account...</h3>
            </div>
          }
      </div>
    )
  }
};

export default ApiAccount;
