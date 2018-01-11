import React from 'react';
import {Link} from 'react-router-dom';

class JoinApiTout extends React.Component {

  render() {
    return (<div>

      <div className="join-developer">
        <div className="join-developer-column">
          <h1>
            <i className="fa fa-shopping-basket" aria-hidden="true"></i>
          </h1>
          <h2>Sign up for a Free Account!</h2>
          <Link to="/dev/login">
            <button className="button button--hometout">Sign Up</button>
          </Link>
        </div>
        <div className="join-developer-column">
          <h1>Reference Guide</h1>
          <ul>
            <li>
              <Link to="/dev/docs">
                Tutorial:
              </Link>&nbsp;A step-by-step guide to getting started with accessing Basket Bear API</li>
            <li>
              <Link to="/dev/docs/endpoints">
                Endpoint Reference:
              </Link>&nbsp;Full documentation of all the endpoints and the data they return.</li>
            <li>
              <Link to="/dev/docs/authorization">
                Authorization Guide:
              </Link>&nbsp;All you need to know about using OAuth 2.0 with the Web API.</li>
          </ul>
        </div>

      </div>

      <div className="narrow">
        <h1>Discover what you can do with Basket Bear's API</h1>
        <h4>Create end-to-end selling applications to help sellers with their selling activity on eBay and Amazon. Discover the most likely prices under which customers are most for items to purchase. Our API helps you create applications that enable sellers to grow their business.</h4>
        <button className="button">read this</button>
      </div>

    </div>)
  }

}

export default JoinApiTout
