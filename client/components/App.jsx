import React from 'react';
import {Router, Routes} from "react-router";
import '../css/styles.css';
import Search from './Search.jsx';
import Navbar from './Navbar.jsx';
import LoginCard from './user/LoginCard.jsx';
import Developer from './developer/Developer.jsx'


class App extends React.Component {
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
      <Navbar/>
      <Search/>
      <LoginCard/>
      <Developer/>
      </div>
    );
  }
}
export default App;
