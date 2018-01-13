import React from 'react';
import '../../css/developer-hometout.css';

class ApiIntro extends React.Component {
  render(){
  return (
  <div className="intro-card intro-card--api">
    <h1>Basket Bear Developer</h1>
    <h4>Our API lets your applications fetch "desired price” data from Basket Bear for thousands of products from Amazon & Ebay</h4>
    <a href="#developer-hometout"><button className="button button-about">Learn more</button></a>
  </div>
  )
  }

}

export default ApiIntro
