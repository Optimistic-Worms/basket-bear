import React from 'react'

class JoinApiTout extends React.Component {

  render(){
  return (
    <div className="hometout-wrapper hometout-wrapper-api">
      <div className="hometout-grid">
        <div className="hometout-join">
          <h1><i className="fa fa-shopping-basket" aria-hidden="true"></i></h1>
          <h2>Sign up for a Free Account!</h2>
          <a href="./api/login">
          <button className="button button--hometout">Sign Up</button></a>

        </div>
        <p>Join Budget Basket Developer and start making API calls today</p>
      </div>
    </div>
  )
  }

}


export default JoinApiTout
