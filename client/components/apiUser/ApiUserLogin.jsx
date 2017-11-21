import React from 'react';
import axios from 'axios';

class ApiUserLogin extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  handleLogin(event) {
    event.preventDefault();
    console.log('clicked')
    axios.get('/api/login', {withCredentials: true,
    auth: {
      username: 'jack',
      password: 'secret'
    }})
    .then((res) => {
      console.log(res)
    })
  }

  render() {
    return (
      <div >
        <form>
          <input type="username"/>
          <input type="password"/>
          <button onClick={this.handleLogin}>Login</button>
        </form>
      </div>
    );
  }
}

export default ApiUserLogin;
