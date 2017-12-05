import React from 'react';
import axios from 'axios'
import Promise from 'bluebird';
import ApiNav from './ApiNav.jsx';
import ApiDoc from './docs/ApiDoc.jsx';
import ApiIntro from './ApiIntro.jsx';
import JoinApiTout from './JoinApiTout.jsx';
import DeveloperFooter from './DeveloperFooter.jsx';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import ApiUserAuthCard from './apiUser/ApiUserAuthCard.jsx';
import ApiAccount from './apiUser/ApiAccount.jsx';

class Developer extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      user: '',
       token: ''
    };
    this.toggleLoggedIn = this.toggleLoggedIn.bind(this);
    this.getUserData = this.getUserData.bind(this);
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

  render() {
    const LoginView = (props) => {
      return (
        <ApiUserAuthCard
          toggleLogin={this.toggleLoggedIn}
          history={props.history}
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
        />
      )
    }

    //console.log(this.state)
    return (
      <div>
        <BrowserRouter>
          <div className="developer">
            <ApiNav loggedIn={this.state.loggedIn}/>
              <Route exact path="/" component={ApiIntro}/>
              <Route exact path="/" component={JoinApiTout}/>
              <Route path="/api/login" render={LoginView} />
              <Route path="/api/docs" component={ApiDoc}/>
              <Route path="/api/account" render={accountView}/>
          </div>
        </BrowserRouter>
      <DeveloperFooter/>
    </div>
    );
  }
}
export default Developer;
