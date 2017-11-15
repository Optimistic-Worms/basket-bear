import React from 'react'
import ReactDOM from 'react-dom'
import '../css/styles.css'
import axios from 'axios';
import Search from './Search.jsx'
<<<<<<< HEAD
import Navbar from './Navbar.jsx'
=======
import Login from './Login.jsx'
>>>>>>> add google signin

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
<<<<<<< HEAD
      <Navbar/>
      <Search/>
=======
        <Login/>
        <h1>Hello World Deploy!</h1>
        <Search/>
>>>>>>> add google signin
      </div>
    )
  }
}
export default App
