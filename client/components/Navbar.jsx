import React from 'react';

const NavBar = (props) => (
<div>
  <nav>
 <span className="brand">
   <a href="">Budget Basket</a>
 </span>
 <ul className="menu">

   <li><a href="">About</a></li>

   <li><a href="">Saved</a></li>

   <li><a href="">Logout</a></li>
 </ul>
 <i className="fa fa-chevron-circle-down" aria-hidden="true"></i>

</nav>
</div>
);

export default NavBar
