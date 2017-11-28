import React from 'react';
import axios from 'axios';

class ApiUserSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password:''
    };
    this.handleSignup = this.handleSignup.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
  }

  handleSignup(event) {
    event.preventDefault();
    axios.post('/api/signup', {
      email: this.state.email,
      password: this.state.password
    })
    .then((res) => {
      console.log(res.data)
    })
  }

  handleEmailInput(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordInput(event) {
    this.setState({password: event.target.value});
  }

  render() {
    return (
      <div >
        <form>
          <input
            type="text"
            placeholder="email"
            onChange={this.handleEmailInput}
          />
          <input
            type="password"
            placeholder="password"
            onChange={this.handlePasswordInput}
          />
          <input
            type="password"
            placeholder=" confirm password"
            onChange={this.handlePasswordInput}
          />
          <button onClick={this.handleSignup}>Signup</button>
        </form>
      </div>
    );
  }
}

export default ApiUserSignup;
