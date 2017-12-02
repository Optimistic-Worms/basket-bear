import React from 'react';
import ApiNav from './ApiNav.jsx';
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
    document.body.style.backgroundImage = 'none';
    document.body.style.backgroundColor = '#C8C8C8';
  }

  render() {
    return (
      <BrowserRouter>
        <div className="developer">
          <ApiNav />
            <Route path="/api/login" component={ApiUserAuthCard}/>
        </div>
      </BrowserRouter>
    );
  }
}
export default Developer;
