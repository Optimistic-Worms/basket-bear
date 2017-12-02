import React from 'react'

class ApiDoc extends React.Component {

  render(){
  return (
  <div className="api-doc">
    <div className="api-doc-nav">
      <h3>api nav</h3>
    </div>
    <div className="api-doc-intro">
      <div className="api-doc-intro api-doc-intro--header">
      <h1>Budget Basket API Guide</h1>
    </div>
    <p>Based on simple REST principles, our API endpoints return metadata in JSON format about “requested price” information directly from the our product database. The API also provides access to user-related data such as wishlist items. </p>
    </div>
  </div>
  )
  }

}

export default ApiDoc
