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
        <h3>full-stack software engineers</h3>
        <a href="#developers"><button className="button button-about">
          About us
        </button></a>
      </div>

        <div id="developers">
          <h1>Who We Are</h1>
          <div className="about-developers">
        <div className="about-profile">
          <img src={require ('../assets/cLai.jpg')} className="profile-image"></img>

          <div className="about-paragraph">
            <a target="_blank" href="https://www.linkedin.com/in/candice-t-lai/"><h3>Candice Lai</h3></a>
            <p>Candice is a full-stack developer based in Los Angeles. You can follow her work&nbsp;<a target="_blank" href="https://github.com/ctnswb">here</a>.</p>
          </div>

        </div>

        <div className="about-profile">
          <img src={require ('../assets/nHavens.png')} className="profile-image"></img>

          <div className="about-paragraph">
            <a target="_blank" href="https://www.linkedin.com/in/nick-havens/"><h3>Nick Havens</h3></a>
            <p>Nick is a full-stack developer based in Chicago, specializing in node.js, react.js, and continuous integration. You can follow his work&nbsp;<a target="_blank" href="https://github.com/npHavens">here</a>.</p>

          </div>

        </div>

        <div className="about-profile">
          <img src={require ('../assets/jAllshorn.png')} className="profile-image"></img>

          <div className="about-paragraph">
            <a target="_blank" href="https://www.linkedin.com/in/jason-allshorn/"><h3>Jason Allshorn</h3></a>
            <p>Jason is a Fullstack engineer, former teacher and globe trotter. You can follow his work&nbsp;<a target="_blank" href="https://github.com/supertopoz">here</a>.</p>
          </div>
        </div>

        <div className="about-profile">
          <img src={require ('../assets/dSentoso.jpg')} className="profile-image"></img>

          <div className="about-paragraph">
            <a target="_blank" href="https://www.linkedin.com/in/dianasentoso/"><h3>Diana Sentoso</h3></a>
            <p>Diana is a full-stack engineer specializing in web and user interface developement. You can follow her work&nbsp;<a target="_blank" href="https://github.com/ArtemisD">here</a>.</p>
          </div>

        </div>

        </div>
      </div>

      </div>)

  }
}

export default About;
