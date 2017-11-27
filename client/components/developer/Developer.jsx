import React from 'react';
import {Router, Routes} from "react-router";
import '../../css/styles.css';
import ApiUserSignup from './apiUser/ApiUserSignup.jsx';
import ApiUserLogin from './apiUser/ApiUserLogin.jsx';

class Developer extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {
  }
  render() {
    return (
      <div>
        <ApiUserSignup/>
        <ApiUserLogin/>
      </div>
    );
  }
}
export default Developer;
