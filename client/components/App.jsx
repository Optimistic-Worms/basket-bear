import React from 'react'
import ReactDOM from 'react-dom'
import '../css/styles.css'
import axios from 'axios';
import Search from './Search.jsx'
import Navbar from './Navbar.jsx'

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
      </div>
    )
  }
}
export default App
