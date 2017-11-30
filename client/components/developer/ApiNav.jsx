import React from 'react';
import { Link } from 'react-router-dom';
const ApiNav = (props) => (
  <div>
  <nav>
      <Link to="/">
      <div className="brand desktop-show">Budget Basket - Developer</div>
      </Link>
    <div className="menu">
      <li>
          <Link to="/api/docs">
            <span className="desktop-show">Docs</span>
          </Link>
      </li>
      <li>
          <Link to="/api/account">
            <span className="desktop-show">My Account</span>
          </Link>
      </li>
      <li>
        <Link to="/api/login" >
          <span className="desktop-show">Login/Logout</span>
        </Link>
      </li>
    </div>
    <a className="exit-dev-btn" href="/">Back to Budget Basket</a>
  </nav>

</div>);

export default ApiNav;
