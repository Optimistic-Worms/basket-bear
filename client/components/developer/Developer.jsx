import React from 'react';
import ApiUserSignup from './apiUser/ApiUserSignup.jsx';
import ApiUserLogin from './apiUser/ApiUserLogin.jsx';
import ApiNav from './ApiNav.jsx';
import { BrowserRouter, Route, Link } from 'react-router-dom';


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
      <BrowserRouter>
        <div className="developer">
          <ApiNav />
            <Route path="/api/login" component={ApiUserLogin}/>
            <Route path="/api/signup" component={ApiUserSignup}/>
        </div>
      </BrowserRouter>
    );
  }
}
export default Developer;
