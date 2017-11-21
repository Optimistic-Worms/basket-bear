import React from 'react';
import axios from 'axios';

class ApiUserSignup extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  handleSignup(event) {
    event.preventDefault();
    console.log('clicked')
    axios.get('/api/login', {withCredentials: true,
    auth: {
      email: 'test2@test.com',
      password: 'secret2'
    }})
    .then((res) => {
      console.log(res)
    })
  }

  render() {
    return (
      <div >
        <form>
          <input type="email"/>
          <input type="password"/>
          <button onClick={this.handleSignup}>Signup</button>
        </form>
      </div>
    );
  }
}

export default ApiUserSignup;
