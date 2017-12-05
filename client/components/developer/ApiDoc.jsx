import React from 'react'
import { Link } from 'react-router-dom';

class ApiDoc extends React.Component {

  render(){
  return (
  <div className="api-doc">
    <div className="api-doc-nav">
      <Link to="/api/docs">
      <h5>Getting Started</h5>
      </Link>
      <Link to="/api/docs">
      <h5>Authorization Guide</h5>
      </Link>
      <Link to="/api/docs">
      <h5>API Endoint Reference</h5>
      </Link>
    </div>
    <div className="api-doc-intro">
      <div className="api-doc-intro api-doc-intro--header">
        <h1>Budget Basket API Guide</h1>
      </div>
      <p>Based on simple REST principles, our API endpoints return metadata in JSON format about “requested price” information directly from the our product database. The API also provides access to user-related data such as wishlist items. </p>
      <div className="api-doc-intro api-doc-intro--header">
        <h2>Introduction</h2>
      </div>
      <p>This document is intended for developers who want to write applications that interact with Budget Basket. It explains basic concepts of Budget Basket and of the API itself. It also provides an overview of the different functions that the API supports.</p>
      <h3>Before you start</h3>
      <ol>
        <li><p>Sign up for a Budget Basket Developers Account and enter your application name.</p></li>
        <li><p>Log in to your Developer Account to retrieve your Client ID and Client Secret.</p></li>
        <li><p>Refer to the Authorization Guide to learn how to use your client credentials to obtain an access token.</p></li>
        <li><p>Refer to the API Endpoint Reference to start making authenticated requests to the Budget Basket API.</p></li>
      </ol>
    </div>
  </div>
  )
  }

}

export default ApiDoc
