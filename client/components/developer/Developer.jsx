import React from 'react';
import '../../css/styles.css';
import ApiUserSignup from './apiUser/ApiUserSignup.jsx';
import ApiUserLogin from './apiUser/ApiUserLogin.jsx';
import ApiNav from './ApiNav.jsx';

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
      <div className="developer">
        <ApiNav/>
        <ApiUserSignup/>
        <ApiUserLogin/>
      </div>
    );
  }
}
export default Developer;
