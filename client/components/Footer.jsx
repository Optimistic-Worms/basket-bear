import React from 'react';

const Footer = (props) => (
  <footer >
    <div className="footer-about"></div>
    <div>filler</div>
    <div>
      <p><i className="fa fa-shopping-basket" aria-hidden="true"></i> Budget Basket Developers</p>
    <div className="footer-link" onClick={props.handleSwitch}>Documentation</div>
  </div>
  </footer>
)

export default Footer;
