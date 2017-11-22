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
    // axios.get('/api/login', {withCredentials: true,
    // auth: {
    //   username: 'test3@test.com',
    //   password: 'secret3'
    // }})
    // .then((res) => {
    //   console.log(res.data)
    // })
    axios.post('/api/token', {
      clientId: 'test3@test.com',
      clientSecret: 'secret3'
    })
    .then((res) => {
      console.log(res.data)
    })
  }
  //axios.get('/api/login', {withCredentials: true,
    // auth: {
    //   username: 'test3@test.com',
    //   password: 'secret3'
    // }})
    // .then((res) => {
    //   console.log(res.data)
    // })

  render() {
    return (
      <div >
        <form>
          <input type="email"/>
          <input type="password"/>
          <button onClick={this.handleLogin}>Login</button>
        </form>
      </div>
    );
  }
}

export default ApiUserLogin;
