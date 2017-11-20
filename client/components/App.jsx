import React from 'react';
import '../css/styles.css';
import Search from './Search.jsx';
import Navbar from './Navbar.jsx';
import LoginCard from './user/LoginCard.jsx';

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
      </div>
    );
  }
}
export default App;
