import React from 'react'

class JoinHomeTout extends React.Component {

  render(){
  return (
    <div className="hometout-wrapper">
      <div className="hometout-grid">
        <div className="hometout-join">
          <h1><i className="fa fa-shopping-basket" aria-hidden="true"></i></h1>
          <h2>Sign up for a Free Account!</h2>
          <a href="./login">
          <button className="button button--hometout">Sign Up</button></a>
        </div>
        <p>Join Budget Basket to add items to your watch list and monitor products for price drops</p>
      </div>
    </div>
  )
  }

}


export default JoinHomeTout
