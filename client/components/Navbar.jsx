import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search.jsx';

const NavBar = (props) => (
	<div>
  <nav>
		<div className="brand">
  		<Link to="/">
	  	{/*<span className="desktop-show">Budget Basket</span>*/}
	  	<i className="fa fa-shopping-basket"></i>
	  	</Link>
		</div>
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
	        <Link to="/watchList">
		        <span className="desktop-show">WATCH LIST</span>
		        <span className="mobile-show col">
				    	<i className="fa fa-bookmark" aria-hidden="true"></i>WATCH LIST
		        </span>
	        </Link>
	    </li>
	        { (props.logged === 'LOGOUT') && 
			<li>			
			<Link to="/settings">			   
			    <span className="desktop-show">Settings</span>
				<span className="mobile-show col">
			<i className="fa fa-cog" aria-hidden="true"></i>Settings
				</span>
			</Link>
			</li>
			}
	    <li>
	      <Link to={{pathname: props.logout}} onClick={props.logging}>
	        <span className="desktop-show">{props.logged}</span>
	        <span className="mobile-show col">
	        <i className="fa fa-sign-out" aria-hidden="true"></i>{props.logged}</span>
	      </Link>
	    </li>
	  </div>
	</nav>
</div>);

export default NavBar;
