import React from 'react';
<<<<<<< HEAD

const NavBar = (props) => (<div>
  <nav>
    <div className="brand desktop-show">
      <a href="">Budget Basket</a>
    </div>
    <div className="menu">
      <li>
        <a href="">
          <span className="mobile-show col">
            <i className="fa fa-home" aria-hidden="true"></i>Home</span>
        </a>
      </li>
      <li>
        <a href="">
          <span className="desktop-show">About</span>
          <span className="mobile-show col">
            <i className="fa fa-bookmark" aria-hidden="true"></i>About</span>
        </a>
      </li>
      <li>
        <a href="">
          <span className="desktop-show">Profile</span>
          <span className="mobile-show col">
            <i className="fa fa-user-circle" aria-hidden="true"></i>Profile</span>
        </a>
      </li>
      <li>
        <a href="">
          <span className="desktop-show">Logout</span>
          <span className="mobile-show col">
            <i className="fa fa-sign-out" aria-hidden="true"></i>Logout</span>
        </a>
      </li>
    </div>

  </nav>
=======
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
	  </div>
	</nav>
>>>>>>> e3b682dfee9d0ff3affe399675c532bed39949c7
</div>);

export default NavBar;
