import React from 'react';

const Footer = (props) => (
  <footer >
    <div className="footer-link" onClick={props.handleSwitch}>Developer Section</div>
  </footer>
)

export default Footer;