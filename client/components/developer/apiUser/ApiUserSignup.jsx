import React from 'react';
import axios from 'axios';

class ApiUserSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleSignup(event) {
    console.log(this.state, 'state')
     event.preventDefault();
    // axios.post('/api/signup', {
    //   email: this.state.email,
    //   password: this.state.password
    // })
    // .then((res) => {
    //   console.log(res.data)
    // })
  }

  handleEmailInput(event) {
    //console.log(event.target.value)
    this.setState({email: event.target.value});
  }

  handlePasswordInput(event) {
    //console.log(event.target.value)
    this.setState({password: event.target.value});
  }

  render() {
    return (
      <div >
        <form>
          <input placeholder="email" onChange={this.handleEmailInput.bind(this)}/>
          <input type="password" placeholder="password"/>
          <button onClick={this.handleSignup}>Signup</button>
        </form>
      </div>
    );
  }
}

export default ApiUserSignup;
