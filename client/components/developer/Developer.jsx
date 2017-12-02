import React from 'react';
import ApiNav from './ApiNav.jsx';
import ApiDoc from './ApiDoc.jsx';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import ApiUserAuthCard from './apiUser/ApiUserAuthCard.jsx';

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
            <Route path="/api/login" component={ApiUserAuthCard}/>
            <Route path="/api/docs" component={ApiDoc}/>
        </div>
      </BrowserRouter>
    );
  }
}
export default Developer;
