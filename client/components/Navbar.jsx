import React from 'react';

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
</div>);

export default NavBar;
