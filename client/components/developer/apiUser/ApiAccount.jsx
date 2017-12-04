import React from 'react';

class ApiAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userObj: false
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.props.getUserData()
    .then(data => {
      this.setState({userObj: data})
    })
  }

  handleLogout() {
    this.props.toggleLogin();
    this.props.history.push('/');
  }

  render() {
    return (
      this.state.userObj &&
      <div className="api-user-account" >
        <div></div>
        <div>
          <div className="dashboard-title">
            <div>{this.state.userObj.email}</div>
            <div className="api-user-logout" onClick={this.handleLogout}>Logout</div>
          </div>
          <hr/>
          <h3>Application Name</h3>
          <div>{this.state.userObj.appName}</div>
          <h3>Client ID</h3>
          <div>{this.state.userObj.clientId}</div>
          <h3>Client Secret</h3>
          <div>{this.state.userObj.clientSecret}</div>
        </div>
        <div></div>
      </div>
    )
  }
};

export default ApiAccount;