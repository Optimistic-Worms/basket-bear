import React from 'react';
import {Link} from 'react-router-dom';
import '../css/about.css'

class About extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (<div className="about">
      <div className="about intro-card">
        <h1>OPTIMISTIC WORMS</h1>
        <button className="button button-about">
          <a href="#about">About us</a>
        </button>
      </div>

      {/* <div id="about" className="about-profile-section">
        <div className="about-worms">
          <h1>WHO WE ARE</h1>
          <hr/>
          <div className="about-attributes">
            <i className="fa fa-cogs" aria-hidden="true"></i>
            <i className="fa fa-desktop" aria-hidden="true"></i>
            <i className="fa fa-rocket" aria-hidden="true"></i>

          </div>
        </div> */}
        <div id="about" className="about-profile">
          <img src="http://i.imgur.com/Q4vpATV.png" className="profile-image"></img>

          <div className="about-paragraph">
            <h3>Candice Lai</h3>
            <p>Candice is a full-stack developer based in Los Angeles.</p>
          </div>

        </div>

        <div className="about-profile">
          <img src="http://2.bp.blogspot.com/-y4DzPzNhnj0/TrCf866cUtI/AAAAAAAAAe8/ciSB0PV5xU4/s1600/swing.jpg" className="profile-image"></img>

          <div className="about-paragraph">
            <h3>Nick Havens</h3>
            <p>Nick is a full-stack developer based in Chicago.</p>
          </div>

        </div>

        <div className="about-profile">
          <img src="http://i.imgur.com/187Y4u3.png" className="profile-image"></img>

          <div className="about-paragraph">
            <h3>Diana Sentoso</h3>
            <p>Diana is a Web and User Interface Developer based in Columbus, Ohio.</p>
          </div>

        </div>

        <div className="about-profile">
          <img src="https://pbs.twimg.com/profile_images/502241833938739200/KsUxYfAR_400x400.png" className="profile-image"></img>

          <div className="about-paragraph">
            <h3>Jason Allshorn</h3>
            <p>Jason is a full-stack developer based in South Korea.</p>
          </div>

        </div>

      </div>)

  }
}

export default About;
