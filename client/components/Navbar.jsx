import React from 'react';
import { Link } from 'react-router-dom';
const NavBar = (props) => (
	<div>
  <nav>
  		<Link to="/">
	  	<div className="brand desktop-show">Budget Basket</div>
	  	</Link>
	  <div className="menu">
	    <li>
	    		<Link to="/">
	        <span className="mobile-show col">
		        <i className="fa fa-home" aria-hidden="true"></i>
		        Home
	        </span>
	        </Link>
	    </li>
	    <li>
	    		<Link to="/about">
		        <span className="desktop-show">About</span>
		        <span className="mobile-show col">
		     	<i className="fa fa-bookmark" aria-hidden="true"></i>About
		     		</span>
	        </Link>
	    </li>
	    <li>
	        <Link to="/profile">
		        <span className="desktop-show">Profile</span>
		        <span className="mobile-show col">
				    	<i className="fa fa-user-circle" aria-hidden="true"></i>Profile
		        </span>
	        </Link>
	    </li>
	    <li>
	      <Link to="/login" onClick={props.logging}>
	        <span className="desktop-show">{props.logged}</span>
	        <span className="mobile-show col">
	        <i className="fa fa-sign-out" aria-hidden="true"></i>{props.logged}</span>
	      </Link>
	    </li>
	    <li>
	        <Link to="/developer">
		        <span className="desktop-show">Developer</span>
		        <span className="mobile-show col">
				    	<i className="fa fa-user-circle" aria-hidden="true"></i>Developer
		        </span>
	        </Link>
	    </li>
	  </div>
	</nav>
</div>);

export default NavBar;
