import React from 'react'
import ReactDOM from 'react-dom'
import '../css/styles.css'
import axios from 'axios';
import Search from './Search.jsx'

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
        <h1>Hello World Deploy!</h1>
        <Search/>
      </div>
    )
  }
}
export default App