import React from 'react';
import { Link } from 'react-router-dom';

const DeveloperFooter = (props) => (
  <footer >
    <div className="footer-about">
    {/* <div><a target="_blank" href="#"><i className="fa fa-envelope-o" aria-hidden="true"></i></a></div> */}
    <div><a target="_blank" href="https://github.com/Optimistic-Worms"><i className="fa fa-github" aria-hidden="true"></i></a></div>
        <div><Link to="/about">
        <i className="fa fa-info-circle" aria-hidden="true"></i>
        </Link></div>
  </div>
  <div className="copyright">
    <p>© 2018 Basket Bear&nbsp;-&nbsp;</p>
    <Link to="/terms">
    Terms of Use
    </Link>
    </div>
      <Link to="/" className="footer-link">
      Back to Basket Bear
      </Link>
  </footer>
)

export default DeveloperFooter;
