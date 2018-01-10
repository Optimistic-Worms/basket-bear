import React from 'react';
import axios from 'axios'
import Promise from 'bluebird';
import ApiNav from './ApiNav.jsx';
import ApiDoc from './docs/ApiDoc.jsx';
import ApiIntro from './ApiIntro.jsx';
import JoinApiTout from './JoinApiTout.jsx';
import '../../css/api.css';
import DeveloperFooter from './DeveloperFooter.jsx';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import ApiUserAuthCard from './apiUser/ApiUserAuthCard.jsx';
import ApiAccount from './apiUser/ApiAccount.jsx';

class Developer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: '',
      token: '',
      secret: ''
    };
    this.toggleLoggedIn = this.toggleLoggedIn.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.setSecret = this.setSecret.bind(this);
  }

  componentDidMount() {
  }

  toggleLoggedIn(user = '', token = '') {
    console.log('logging in/out')

    this.setState({
      loggedIn: !this.state.loggedIn,
      user: user,
      token: token
    })
  }

  getUserData() {
    return new Promise((resolve, reject) => {
      axios.get('/api/user', {
        headers: {'Authorization': `Bearer ${this.state.token}`}
      })
      .then(data => {
        resolve(data.data)
      })
      .catch(err => reject(err));
    });
  }

  setSecret(secret) {
    this.setState({secret: secret});
  }

  render() {
    const LoginView = (props) => {
      return (
        <ApiUserAuthCard
          toggleLogin={this.toggleLoggedIn}
          history={props.history}
          setSecret={this.setSecret}
        />
      )
    }

    const accountView = (props) => {
      return (
        <ApiAccount
          toggleLogin={this.toggleLoggedIn}
          history={props.history}
          token={this.state.token}
          getUserData={this.getUserData}
          secret={this.state.secret}
          setSecret={this.setSecret}
        />
      )
    }

    const { path, url } = this.props.match;

    //console.log(this.state)
    return (
      <div>
          <div className="developer">
            <ApiNav loggedIn={this.state.loggedIn}/>
              <Route exact path={path} component={ApiIntro}/>
              <Route exact path={path} component={JoinApiTout}/>
              <Route path="/dev/login" render={LoginView} />
              <Route path="/dev/docs" component={ApiDoc}/>
              <Route path="/dev/account" render={accountView}/>
              <Route exact path="/dev" component={DeveloperFooter}/>
          </div>
    </div>
    );
  }
}
export default Developer;
