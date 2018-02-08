import React from 'react';
import '../css/developer-hometout.css';

class ApiIntro extends React.Component {
  render(){
  return (
  <div className="intro-card intro-card--api">
    <h1>Basket Bear</h1>
    <h4>Seach and compare prices for thousands of products from Amazon & Ebay</h4>
    <a href="#client-hometout"><button className="button button-about">Learn more</button></a>
  </div>
  )
  }

}

export default ApiIntro
