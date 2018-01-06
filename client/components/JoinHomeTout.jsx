import React from 'react';
import { Link } from 'react-router-dom';

class JoinHomeTout extends React.Component {

  render(){
  return (
    <div className="hometout-wrapper">
      <div className="hometout-grid">
        <div className="hometout-join">
          <h1><i className="fa fa-shopping-basket" aria-hidden="true"></i></h1>
          <h2>Sign up for a Free Account!</h2>
          <Link to="/login">
          <button className="button button--hometout">Sign Up</button>
        </Link>
        </div>
        <p>Join Basket Bear to add items to your watch list and monitor products for price drops</p>
      </div>
    </div>
  )
  }

}


export default JoinHomeTout
