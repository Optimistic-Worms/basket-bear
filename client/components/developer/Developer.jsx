import React from 'react';
import ApiNav from './ApiNav.jsx';
import ApiDoc from './ApiDoc.jsx';
import ApiIntro from './ApiIntro.jsx';
import DeveloperFooter from './DeveloperFooter.jsx';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import ApiUserAuthCard from './apiUser/ApiUserAuthCard.jsx';
import ApiAccount from './apiUser/ApiAccount.jsx';

class Developer extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
      <BrowserRouter>
        <div className="developer">
          <ApiNav />
            <Route exact path="/" component={ApiIntro}/>
            <Route path="/api/login" component={ApiUserAuthCard}/>
            <Route path="/api/docs" component={ApiDoc}/>
            <Route path="/api/account" component={ApiAccount}/>
        </div>
      </BrowserRouter>
      <DeveloperFooter/>
    </div>
    );
  }
}
export default Developer;
