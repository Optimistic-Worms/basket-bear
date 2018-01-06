import React from 'react';

const Footer = (props) => (
  <footer >
    <div className="footer-about">
    <div><a target="_blank" href="#"><i className="fa fa-envelope-o" aria-hidden="true"></i></a></div>
    <div><a target="_blank" href="https://github.com/Optimistic-Worms"><i className="fa fa-github" aria-hidden="true"></i></a></div>
        <div><a target="_blank" href="$"><i className="fa fa-info-circle" aria-hidden="true"></i></a></div>
  </div>
  <div className="copyright">
    <p>© 2018 Basket Bear&nbsp;-&nbsp;</p><a href="/terms">Terms of Use</a>
    </div>
    <div className="footer-developer">
      <p><i className="fa fa-shopping-basket" aria-hidden="true"></i> Budget Basket Developers</p>
    <div className="footer-link" onClick={() => props.history.push('/dev')}>Documentation</div>
    </div>
  </footer>
)

export default Footer;
