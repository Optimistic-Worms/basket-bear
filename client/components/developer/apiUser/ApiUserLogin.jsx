import React from 'react';
import axios from 'Axios';

class ApiUserLogin extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  handleLogin(event) {
    event.preventDefault();
    axios.post('/api/login', {'grant_type': 'client_credentials'},
      {
        withCredentials: true,
        auth: {
          username: 'test3@test.',
          password: 'secret3',
      }
    })
    .then((res) => {
      console.log(res.data)
    })
    .catch(err => console.log(err))
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
