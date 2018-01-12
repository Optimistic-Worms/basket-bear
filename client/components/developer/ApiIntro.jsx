import React from 'react';
import '../../css/developer-hometout.css';

class ApiIntro extends React.Component {
  render(){
  return (
  <div className="intro-card intro-card--api">
    <h1>Basket Bear Developer</h1>
    <h4>Our API lets your applications fetch "desired price” data from Basket Bear for thousands of products from Amazon & Ebay</h4>
    <button className="button button-about"><a href="#developer-hometout">Learn more</a></button>
  </div>
  )
  }

}

export default ApiIntro
