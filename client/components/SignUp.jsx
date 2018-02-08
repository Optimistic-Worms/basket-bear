import React from 'react';
import {Link} from 'react-router-dom';

class JoinApiTout extends React.Component {

  render() {
    return (<div id="client-hometout" className="developer-hometout">

      <div className="join-developer">
        <div className="join-developer-column">
          <h1><i className="fa fa-shopping-basket" aria-hidden="true"></i></h1>
          <h2>Sign up for a Free Account!</h2>
          <Link to="/login">
          <button className="button button--hometout">Sign Up</button>
        </Link>
        </div>
        <div className="join-developer-column">
          <h1>Reference Guide</h1>
          <ul>
            <li>
              <Link to="/dev/docs/start">
                Tutorial:
              </Link>&nbsp;A step-by-step guide to getting started with accessing Basket Bear API</li>
              <li>
                <Link to="/dev/docs/authorization">
                  Authorization Guide:
                </Link>&nbsp;All you need to know to get authorization to access endpoints on the Basket Bear API</li>
            <li>
              <Link to="/dev/docs/endpoints">
                Endpoint Reference:
              </Link>&nbsp;Full documentation of all the endpoints and the data they return</li>
          </ul>
        </div>

      </div>

      <div className="join-developer-support">
        <h1>Discover what you can do with Basket Bear</h1>
        <p>Join Basket Bear to add items to your watch list and monitor products for price drops</p>
        <Link to="/login">
        <button className="button button--hometout">Get Started Now</button>
      </Link>
      </div>

    </div>)
  }

}

export default JoinApiTout
