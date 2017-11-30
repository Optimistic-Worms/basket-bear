import React from 'react';

const Footer = (props) => (
  <div className="footer">
    <div className="footer-link" onClick={props.handleSwitch}>Developer Section</div>
  </div>
)

export default Footer;