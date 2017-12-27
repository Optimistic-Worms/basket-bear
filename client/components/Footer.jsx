import React from 'react';

const Footer = (props) => (
  <footer >
    <div className="footer-about">
    <div><a href="#"><i className="fa fa-envelope-o" aria-hidden="true"></i></a></div>
    <div><a href="https://github.com/Optimistic-Worms"><i className="fa fa-github" aria-hidden="true"></i></a></div>
  </div>
    <div className="footer-developer">
      <p><i className="fa fa-shopping-basket" aria-hidden="true"></i> Budget Basket Developers</p>
    <div className="footer-link" onClick={props.handleSwitch}>Documentation</div>
    </div>
  </footer>
)

export default Footer;
