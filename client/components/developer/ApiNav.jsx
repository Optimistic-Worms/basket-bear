import React from 'react';
import { Link } from 'react-router-dom';
const ApiNav = (props) => (
  <div className="api-nav">
  <nav>
    <div>
      <Link to="/dev">
      <div className="api-nav-title">Home</div>
      </Link>
    </div>
    <div className="menu">
      <li>
	    		<Link to="/dev">
	        <span className="mobile-show col">
		        <i className="fa fa-home" aria-hidden="true"></i>
		        Home
	        </span>
	        </Link>
	    </li>
      <li>
          <Link to="/dev/docs/start">
            <span className="desktop-show">Docs</span>
            <span className="mobile-show col">
				    	<i className="fa fa-book" aria-hidden="true"></i>Docs
		        </span>
          </Link>
      </li>
      {props.loggedIn ?
        <li>
          <Link to="/dev/account">
            <span className="desktop-show">Dashboard</span>
            <span className="mobile-show col">
              <i className="fa fa-user-circle" aria-hidden="true"></i>Dashboard
            </span>
          </Link>
        </li>
        :
          <li>
            <Link to="/dev/login" >
              <span className="desktop-show">Login</span>
              <span className="mobile-show col">
                <i className="fa fa-sign-in" aria-hidden="true"></i>Login
              </span>
            </Link>
          </li>
      }
    </div>
  </nav>

</div>);

export default ApiNav;
