import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import '../css/styles.css';
import Search from './Search.jsx';
import Navbar from './Navbar.jsx';
import LoginCard from './user/LoginCard.jsx';
import Developer from './developer/Developer.jsx'
import Home from './Home.jsx'
import About from './About.jsx'
import Profile from './Profile.jsx'

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
      <BrowserRouter>
        <div>
          <Navbar/>
            <Route exact path="/" component={Search}/>
            <Route path="/about" component={LoginCard}/>
            <Route path="/profile" component={Profile}/>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
