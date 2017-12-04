import React from 'react'
import { Link } from 'react-router-dom';

class ApiDoc extends React.Component {

  render(){
  return (
  <div className="api-doc">
    <div className="api-doc-nav">
      <Link to="/api/docs">
      <h3>Documentation</h3>
      </Link>
      <Link to="/api/docs">
      <h5>Getting Started</h5>
      </Link>
      <Link to="/api/docs">
      <h5>Authentication</h5>
      </Link>
      <Link to="/api/docs">
      <h5>Endpoint Reference</h5>
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
        <li><p>You need a Budget Basket Developers Account to request an API key, and register your application.</p></li>
         <li><p>Create free Developer Account and enter the name of the application that will be communicating with the Budget Basket API.</p></li>
         <li><p>Once you have created your Developer Account, sign in to view your Client Id and Client Secret</p></li>
         <li><p>Visit the Authentication section of our Docs to get started using the API endpoints.</p></li>
      </ol>
    </div>
  </div>
  )
  }

}

export default ApiDoc
