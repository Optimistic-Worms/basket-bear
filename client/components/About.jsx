import React from 'react';
import { Link } from 'react-router-dom';
import '../css/about.css'

const About = (props) => (
  <div className="about">
    <div className="about intro-card">
      <h1>OPTIMISTIC WORMS</h1>
      <button className="button button-about"><a href="#about">About us</a></button>
    </div>

    <div id="about" className="about-profile-section">
      <div className="about-worms">
        <h1>WHO WE ARE</h1>
        <hr />
        <div className="about-attributes">
          <i className="fa fa-cogs" aria-hidden="true"></i>
          <i className="fa fa-desktop" aria-hidden="true"></i>
          <i className="fa fa-rocket" aria-hidden="true"></i>

        </div>
      </div>
      <div className="about-profile">
        <img></img>
        {/* <h3>name</h3> */}

        <div className="about-paragraph">
          {/* <h3>title</h3> */}
        <p></p>
      </div>

      </div>
    </div>

  </div>
)

export default About;
