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
    axios.post('http://localhost:3000/oauth/toekn', {withCredentials: true,
    auth: {
      username: 'test3@test.com',
      password: 'secret3'
    }})
    .then((res) => {
      console.log(res.data)
    })
  //   axios.post('/api/token', {
  //     clientId: 'K7RJlOMT8XCnyoPJJyWp',
  //     clientSecret: 'secret3',
  //     grant_type: "client_credentials"
  //   })
  //   .then((res) => {
  //     console.log(res.data)
  //   })
  // }
  //axios.get('/api/login', {withCredentials: true,
    // auth: {
    //   username: 'test3@test.com',
    //   password: 'secret3'
    // }})
    // .then((res) => {
    //   console.log(res.data)
    // })
}
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
